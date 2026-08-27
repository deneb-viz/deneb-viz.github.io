# deneb-viz.github.io (deneb.guide)

Source for [deneb-viz.github.io](https://deneb-viz.github.io) - the documentation site for [Deneb](https://github.com/deneb-viz/deneb), a certified Power BI custom visual that lets you build visuals with the declarative JSON syntax of [Vega](https://vega.github.io/vega/) and [Vega-Lite](https://vega.github.io/vega-lite/).

The site is built with [Docusaurus 3](https://docusaurus.io/) and contains:

- **Docs** - getting started, deeper concepts, interactivity features and the change log, versioned per Deneb release.
- **Blog** - release announcements, how-tos and project updates.
- **Community & Resources** - community links, early access builds and contributors.

The visual's source code, issues and feature requests live in the [main Deneb repo](https://github.com/deneb-viz/deneb). This repo is for the website only.

## Running Locally

Requires Node 20+.

```bash
corepack enable
yarn
yarn start
```

`yarn build` produces the static site in `build/` and is what CI runs on every PR.

## Contributing

Content fixes and additions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for how the repo is laid out, how to add a page, and the writing conventions (style, terminology, images, change log and blog formats). It applies to AI agents working in this repo too.

## Deployment

Pushes to `source` are built and published to the `master` branch (GitHub Pages) by the [Docusaurus Publish](.github/workflows/docusaurus_publish.yml) workflow. No manual deploy step is needed.
