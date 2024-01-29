(async function main(retries = 4) {
  if (retries < 0) {
    throw new Error('Failed to fetch media types');
  }

  try {
    const response = await fetch(
      'https://www.iana.org/assignments/media-types/media-types.xml',
      {
        redirect: 'follow',
      },
    );
    const { ok, status, statusText } = response;
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

    const output = mediaTypes;
    console.log(JSON.stringify(output, undefined, 2));
  } catch (error) {
    console.error(error);
    console.warn(`There are ${retries} retries left...\n`);
    main(--retries);
  }
})();
