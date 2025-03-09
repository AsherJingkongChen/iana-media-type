import fs from 'node:fs';
import { createHash } from 'node:crypto';

let previous = null;
try {
  previous = await import('./index.js');
} catch (e) {
  if (e.code !== 'ERR_MODULE_NOT_FOUND') {
    console.error(e);
    process.exit(1);
  }
}

(async function main(retries = 4) {
  if (retries < 0) {
    throw new Error('Failed to fetch media types');
  }

  try {
    const init = {
      redirect: 'follow',
    };
    if (previous?.lastModified) {
      init.headers = new Headers({
        'if-modified-since': previous.lastModified,
      });
    }
    const response = await fetch(
      'https://www.iana.org/assignments/media-types/media-types.xml',
      init,
    );
    const { ok, status, statusText } = response;
    if (status === 304) {
      console.error(statusText);
      process.exit(2);
    }
    if (!ok) {
      throw new Error(`HTTP ${status} ${statusText}`);
    }

    const textData = await response.text();
    const dom =
      typeof DOMParser === 'undefined'
        ? new (await import('jsdom')).JSDOM(textData).window.document
        : new DOMParser().parseFromString(textData, 'application/xml');

    const mediaTypes = Array.from(
      new Set(
        (function* () {
          for (const registry of dom.querySelectorAll(
            '#media-types registry',
          )) {
            const title = registry.querySelector('title')?.textContent;
            if (!title) {
              continue;
            }
            for (const record of registry.getElementsByTagName('record')) {
              yield record.querySelector('file[type=template]')?.textContent ??
                `${title}/${record.querySelector('name').textContent}`;
            }
          }
        })(),
      ),
    ).sort();

    let output = JSON.stringify(mediaTypes, undefined, 2);
    const hash = createHash('sha256');
    hash.update(output);
    hash.update('\n');
    const hex = hash.digest('hex');

    if (hex === previous?.hash) {
      // There was a change to authors, etc. that we don't care about.
      console.error('Inconsequential change to inputs');
      process.exit(3);
    }
    fs.writeFileSync('index.json', output + '\n');

    // Make output match what prettier expects
    output = output.replaceAll('"', "'");
    output = output.replace("'\n\]", "',\n]");
    fs.writeFileSync(
      'index.js',
      `\
// @generated by build.js
export const updated = new Date('${new Date().toISOString()}');
export const lastModified = '${response.headers.get('last-modified')}';
export const hash =
  '${hex}';

export default ${output};
`,
    );
  } catch (error) {
    console.error(error);
    console.warn(`There are ${retries} retries left...\n`);
    main(--retries);
  }
})();
