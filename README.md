**`Toggl-to-TMetric`** is a library to export time entries from [Toggl](https://toggl.com/) to [TMetric](https://tmetric.com/). It's built with [Node.js](https://nodejs.org/) & [TypeScript](https://www.typescriptlang.org/).

## Usage example

```bash
npm run start -- --from=2023-10-06 --to=2023-10-08
```

## Prerequisites

Before you can use **`Toggl-to-TMetric`**, you need to have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 18 or higher)

You also need to have a [Toggl](https://toggl.com/) account and a [TMetric](https://tmetric.com/) account.

## Usage

Install dependencies:

```bash
npm install
```

Create `.env` file in the root directory:

```bash
touch .env
```

Add [Toggl](https://toggl.com/) and [TMetric](https://tmetric.com/) API keys to the `.env` file:

```markdown
// .env

TOGGL_API_TOKEN=<YOUR_TOGGL_API_TOKEN>
TMETRIC_API_TOKEN=<YOUR_TMETRIC_API_TOKEN>
```

Run `index.ts` script:

```bash
npm run start -- --from=<export-from-date> --to=<export-to-date>
```
