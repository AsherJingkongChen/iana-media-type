import { JSDOM } from 'jsdom';

fetch('https://www.iana.org/assignments/media-types/media-types.xml')
  .then((response) => response.arrayBuffer())
  .then((data) => {
    const { document } =
      typeof process === 'undefined' ? window : new JSDOM(data).window;

    const body = document.getElementById('media-types');
    const mediaTypes = Array.from(
      new Set(
        (function* () {
          for (const registry of body.getElementsByTagName('registry')) {
            const title = registry.querySelector('title')?.textContent;
            if (title) {
              for (const record of registry.getElementsByTagName('record')) {
                yield record.querySelector('file[type=template]')
                  ?.textContent ??
                  `${title}/${record.querySelector('name').textContent}`;
              }
            }
          }
        })(),
      ),
    ).sort();

    return mediaTypes;
  })
  .then((output) => {
    console.log(JSON.stringify(output, undefined, 2));
  });
