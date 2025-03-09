# `iana-media-type`

[![NPM Version](https://img.shields.io/npm/v/iana-media-type?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/package/iana-media-type)

## What is it for?

With `iana-media-type`, you can use IANA media types as JSON in your projects. It works in modern JavaScript runtimes.

We've provided a simple API for you. You can obtain `iana-media-type` from NPM. Please see the section ["How to Obtain"](#how-to-obtain).

## How to Obtain

- `iana-media-type` provides an NPM package. You can install it with your favorite package managers, and then bundle it into your project.

| Package Manager               | Command                        | Shorthand                  |
| ----------------------------- | ------------------------------ | -------------------------- |
| [bun](https://bun.sh/)        | `bun install iana-media-type`  | `bun i iana-media-type`    |
| [npm](https://www.npmjs.com/) | `npm install iana-media-type`  | `npm i iana-media-type`    |
| [pnpm](https://pnpm.io/)      | `pnpm install iana-media-type` | `pnpm i iana-media-type`   |
| [yarn](https://yarnpkg.com/)  | `yarn add iana-media-type`     | `yarn add iana-media-type` |

- `iana-media-type` provides [a JSON file on the GitHub](https://raw.githubusercontent.com/AsherJingkongChen/iana-media-type/main/index.json). You can download it and use it in your project.

```bash
curl -fsSL -o iana-media-type.json https://raw.githubusercontent.com/AsherJingkongChen/iana-media-type/main/index.json
```

## Let's Learn How to Use It

1. Import the .js file:

```javascript
import mediaTypes from 'iana-media-type/index.js';
console.log({ mediaTypes, length: mediaTypes.length });
```

2. Import the json file `(Obtained from NPM)` on node v19:

```javascript
import mediaTypes from 'iana-media-type' assert { type: 'json' };
console.log({ mediaTypes, length: mediaTypes.length });
```

2. Import the json file `(Obtained from GitHub)` in the browser or deno:

```javascript
import mediaTypes from 'https://raw.githubusercontent.com/AsherJingkongChen/iana-media-type/main/index.json' with { type: 'json' };
console.log({ mediaTypes, length: mediaTypes.length });
```

4. Import the json file `(Obtained from NPM)` on node 18 or 20+:

```javascript
import mediaTypes from 'iana-media-type' with { type: 'json' };
console.log({ mediaTypes, length: mediaTypes.length });
```

## Resources

- [IANA Media Types](https://www.iana.org/assignments/media-types/media-types.xhtml)

## Let's Setup the Project

> **Note:** THIS section is for contributors and developers only

### Recommended IDE Setup for You

- IDEs:
  - [VSCode](https://code.visualstudio.com/)
- Extensions:
  - [Prettier for VSCode](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

### See What Dependencies We Are Using

- Environments
  - [Node.js v20](https://nodejs.org/)
- Linters
  - [Prettier](https://prettier.io/)

### See What Commands We Are Using

| Package Manager        | Command   | Script   | Description                 |
| ---------------------- | --------- | -------- | --------------------------- |
| `bun` / `npm` / `pnpm` | `install` |          | Install dependencies        |
| `bun` / `npm` / `pnpm` | `run`     | `build`  | Build the JSON manifest     |
| `bun` / `npm` / `pnpm` | `run`     | `format` | Format files using Prettier |

### Be Aware of These Details

You may encounter some problems during development and deployment.

Please read the following notes carefully.

1. We only provide a JSON file, so you won't evaluate this module.
2. We are NOT IANA or IETF official. We are just a group of open-source developers.
