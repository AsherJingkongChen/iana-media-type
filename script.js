#! /usr/bin/env node

const typeAndLinkList = [
  'application',
  'audio',
  'font',
  'image',
  'message',
  'model',
  'multipart',
  'text',
  'video',
].map((type) => [
  type,
  `https://www.iana.org/assignments/media-types/${type}.csv`,
]);

const data = {
  assignments: [],
  mediaTypes: [],
  mediaTypesLength: 0,
};

for (const [type, link] of typeAndLinkList) {
  const text = await fetch(link).then((r) => r.text());
  const lines = text.split('\r\n').slice(1, -1);
  const assignments = lines.map((line) => {
    const [name, template, reference] = line.split(',');
    return {
      mediaType: template || `${type}/${name}`,
      name,
      reference,
      template,
    };
  });

  data.assignments = data.assignments.concat(assignments);
  data.mediaTypes = data.mediaTypes.concat(
    assignments.map(({ mediaType }) => mediaType),
  );
}

data.mediaTypes = Array.from(new Set(data.mediaTypes)).sort();
data.mediaTypesLength = data.mediaTypes.length;

console.log(JSON.stringify(data, undefined, 2));
