# Contributing to the Deneb Documentation

This repo is the source for [deneb-viz.github.io](https://deneb-viz.github.io) - the documentation, blog and community pages for [Deneb](https://github.com/deneb-viz/deneb). Thanks for helping to make it better.

This guide is for anyone (human or AI agent) writing or editing content. It covers how the site is laid out, how to run it locally, and the conventions that keep the writing consistent. Issues with the visual itself belong in the [main Deneb repo](https://github.com/deneb-viz/deneb/issues).

## Quick Start

```bash
corepack enable   # Yarn 4 is pinned via packageManager in package.json
yarn              # install
yarn start        # dev server with live reload at http://localhost:3000
yarn build        # full production build - run this before opening a PR
```

Requirements: Node 20+. The CI workflow runs `yarn build` on every PR to `source`, and the build **fails on broken links** (`onBrokenLinks: "throw"`), so a green local build is the fastest way to know your change will pass.

Branches: `source` is the default branch and holds the content. `master` is the generated site and is written by CI - never edit it directly.

## Where Things Live

| Path                                  | What it is                                                                                                |
| ------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `docs/`                               | Docs for the **next** release. This is where most content changes go.                                     |
| `docs/<section>/img/`                 | Images for the pages in that section.                                                                     |
| `docs/changelog.md`                   | The change log for the current/next release. Older releases are archived under `docs/archive/`.           |
| `versioned_docs/version-X.Y/`         | Frozen snapshots of the docs for each released version. Only touch these to correct a _released_ version. |
| `sidebars.js`                         | Explicit sidebar for `docs/`. **New pages must be added here** or they won't appear in navigation.        |
| `community/` + `sidebarsCommunity.js` | The "Community & Resources" section (a separate docs plugin, routed at `/community`).                     |
| `blog/`                               | Blog posts. Authors are defined in `blog/authors.yml`.                                                    |
| `static/img/`                         | Images that aren't tied to a single doc page: `changelog/<version>/`, `blog/`, `early-access/`, etc.      |
| `src/`                                | React components, custom CSS and the home page. Usually not needed for content work.                      |
| `docusaurus.config.js`                | Site config. Note `mdx1Compat` is enabled so `<!-- -->` comments and `{#custom-id}` heading IDs work.     |

### Versioning

- Work on the upcoming release in `docs/`. Don't mark content as "new in 2.0" inside a page - the version selector and change log already carry that context.
- If you find a mistake in docs for a version that's already shipped, fix it in `versioned_docs/version-X.Y/` **and** in `docs/` if it still applies.
- Cutting a new version (`yarn docusaurus docs:version X.Y`) is a maintainer task done at release time.

## Adding or Editing a Page

1. Create `docs/<section>/<name>.md` (use `.mdx` only if you need a React component, e.g. `ReactPlayer` for video).
2. Add frontmatter:

   ```yaml
   ---
   id: keyboard
   title: Keyboard Shortcuts
   description: A reference of keyboard shortcuts within Deneb's interface.
   slug: /keyboard
   ---
   ```

   - `id` is what `sidebars.js` references (as `<section>/<id>`).
   - `title` becomes the page `<h1>`; don't also add a `# Heading` in the body. (Older pages use a body `# Heading` instead - either works, but not both. Don't rewrite existing pages just to switch.)
   - `description` is used for SEO and link previews - one plain sentence.
   - `slug` is the public URL (flat, under `/docs/`). `sidebar_label` is optional, for when the title is too long for the sidebar.

3. Add the page to `sidebars.js` in the right category, in the order it should read.
4. Open with a short paragraph that says what the page covers and why a Power BI author would care. No "Overview" heading for this - just start.
5. Run `yarn build` and click through the page in `yarn start`.

## Writing Style

The docs are written for Power BI report authors who are learning Vega/Vega-Lite, not for Vega experts. Assume familiarity with Power BI; explain the Vega side.

- **Address the reader as "you"; the project is "we".** "You can bind the scheme…" / "We recommend…".
- **Be direct and practical.** Lead with what to do, then why. Skip preamble and marketing language.
- **Explain the Power BI reason.** Deneb does many things because of how custom visuals work (row limits, certification restrictions, interactivity). When a behavior is surprising, say why it exists and link to the Microsoft doc if there is one.
- **Keep it friendly, not chatty.** A light touch ("Here's one we made earlier") is welcome; jokes in every paragraph aren't.
- **Sentence-level:** short sentences, one idea each. Prefer lists over long paragraphs when describing options or steps. Numbered lists for sequences, bullets for everything else.
- **US English spelling** (color, behavior, organization).

### Terminology

Use these forms consistently:

| Use                                                               | Not                                            |
| ----------------------------------------------------------------- | ---------------------------------------------- |
| Deneb                                                             | deneb, DENEB                                   |
| Power BI                                                          | PowerBI, PBI (except in code/paths)            |
| Vega, Vega-Lite                                                   | Vega Lite, VegaLite                            |
| dataset                                                           | data set                                       |
| specification (or "spec" after first use), config                 | JSON, script                                   |
| Visual Editor, Command Bar, Editor Pane, Preview Area, Debug Pane | editor window, sidebar                         |
| data role (e.g. the **Values** data role)                         | field well, bucket                             |
| column, measure, field                                            | attribute, metric (unless quoting Power BI UI) |
| report canvas, report page, focus mode                            | dashboard (that's a different Power BI thing)  |
| AppSource version, standalone version                             | certified/uncertified, store version           |

Product feature names get Title Case on first use where they're a named thing (Continuous View, Supporting Fields); describe them in lowercase afterward if it reads naturally.

### Formatting

- **Headings:** Title Case (`## Expression-Based Access Using pbiColor`, with `pbiColor` in backticks). Start at `##` - the `title` frontmatter is the `h1`. Don't skip levels.
- **UI elements and keys:** bold - **Values**, **Consolidate field parameters**, **Ctrl + Alt + N**, **Enter**. Key combos use `+` with spaces.
- **Code, identifiers, paths, field names:** backticks - `pbiColor`, `__names`, `"expr"`.
- **Emphasis:** _italics_ sparingly, for a term being introduced or a Power BI action label (_Back to report_). Avoid ALL CAPS.
- **Tables** for reference material (shortcuts, properties, comparisons). Prettier will align the columns.
- **Code blocks:** always set a language. Most are `json`; use the title attribute when showing a Vega vs. Vega-Lite pair, and line numbers for longer snippets:

  ````md
  ```json title=Vega-Lite showLineNumbers
  { "scale": { "scheme": "pbiColorNominal" } }
  ```
  ````

  Use `...` inside JSON to elide unrelated parts of a spec.

### Admonitions

Use admonitions for things the reader might otherwise miss - not for ordinary paragraphs. Always give them a short Title Case title:

```md
:::tip Tabbing Out of the JSON Editor
When focus is on a JSON editor, Monaco captures **Tab** for indentation…
:::
```

| Type      | Use for                                                              |
| --------- | -------------------------------------------------------------------- |
| `info`    | Context, defaults, "how this migrates" notes, release status banners |
| `tip`     | A shortcut or recommended approach                                   |
| `note`    | An aside that's useful but not essential                             |
| `caution` | Something that may behave unexpectedly, or content that's archived   |
| `warning` | Something that can break your visual or isn't supported              |
| `danger`  | Backwards-incompatible behavior or data-loss scenarios               |

One admonition per point. If a page is mostly admonitions, restructure it.

### Images

- Put page images in `docs/<section>/img/` and reference them relatively: `./img/name.png`. Images shared across areas (change log, blog) go under `static/img/...` and are referenced as `/img/...`.
- Filenames: `kebab-case`, describing the content (`editor-interface-debug-pane.png`), not the version or date.
- **Always write real alt text** - a sentence describing what the reader should see - and repeat it as the title so it shows on hover:

  ```md
  ![Opening the Visual Editor from the visual header.](./img/opening-editor.png "Opening the Visual Editor from the visual header.")
  ```

  Don't use the filename as the alt text.

- Use PNG for screenshots, MP4 (no GIFs) only when motion is the point, SVG for diagrams. Crop to the relevant area, and keep file sizes down (a few hundred KB at most - we've had to bulk-optimize images before).
- Take screenshots with the default Power BI light theme unless the point is dark mode.
- The text should stand on its own; an image supports it rather than carrying information that isn't in the prose.

### Links

- **Within the docs:** link by slug, relative to the docs root - `[Keyboard Shortcuts](keyboard#canvas-and-visual-focus)`, `[Supporting Fields](dataset#column-or-measure-level-fields)`. Docusaurus resolves these within the current version.
- **Across plugins:** use the absolute route - `/community/early-access`, `/docs/getting-started`.
- **External:** full URL. Link to Vega/Vega-Lite docs generously - that's where the language details live. Microsoft Learn links may carry the `?WT.mc_id=DP-MVP-5003712` tracking parameter; keep it if copying an existing link.
- Anchors are generated from headings; if a heading contains code, check the generated ID in the browser before linking to it.
- The build fails on broken links, so `yarn build` is the check.

## Change Log

`docs/changelog.md` is the user-facing record of what changed and why it matters. It's read by people deciding whether to upgrade and by people whose visuals just changed behavior - write for both.

Structure for a release:

```md
## 2.0.0 (YYYY-MM-DD)

:::info In Beta Testing
…status banner (the alternatives are kept as HTML comments to swap in as the release progresses)…
:::

### Feature Name

Short narrative: what it does, why we did it, what to watch for.

- Bullet detail where useful.

### Vega Updates

- Vega-Lite has been updated to **5.x.y**, from 5.a.b. …link to release notes…

### Bug Fixes

- Description of the problem in the past tense ([#604](https://github.com/deneb-viz/deneb/issues/604)).
```

- Heading is `## <version> (<YYYY-MM-DD>)`; use just `## 2.0.0` until a date exists.
- One `###` per feature, in rough order of significance. Link to the full doc page from the feature summary rather than duplicating it.
- Every bug fix and most features cite the GitHub issue as `([#NNN](https://github.com/deneb-viz/deneb/issues/NNN))` at the end of the line.
- Call out anything backwards-incompatible in a `:::danger` or `:::caution` admonition, including how existing visuals/templates migrate.
- When a major version ships, the previous change log is moved to `docs/archive/changelog-00N.md` with the `:::caution Archived Page` banner, and added to the Change Log category in `sidebars.js`.

## Blog Posts

- File: `blog/YYYY-MM-DD-slug.md` (or `.mdx`).
- Frontmatter: `title`, `description`, `slug`, `authors` (keys from `blog/authors.yml`), `tags`, `image` (header image under `static/img/blog/`), `hide_table_of_contents: false`.
- Put `<!-- truncate -->` after the intro paragraph so the listing shows a summary.
- Release posts follow the pattern in the existing `beta-testing-*`, `submission-*` and `certification-*` posts. How-to posts should link to the relevant docs pages rather than re-explaining them.
- New authors: add yourself to `blog/authors.yml` first.

## Pull Requests and Commits

- Branch from `source`; open PRs against `source`.
- Commit messages use a type prefix, imperative mood, lowercase: `docs: add field parameters guide`, `chore: optimize images`, `build: …`, `styles: …`. Almost all content commits are `docs:`.
- Keep PRs focused - one page/feature/fix per PR is ideal. Don't mix content changes with dependency upgrades.
- Prettier runs on save in VS Code (`.vscode/settings.json`) with default settings; let it format Markdown and MDX. Don't hand-align tables.
- Before opening: `yarn build` passes, new pages are in the sidebar, images have alt text, and you've read the rendered page once.
- Don't commit `build/` or `.docusaurus/` (they're gitignored).

## Notes for AI Agents

If you're an agent working in this repo, everything above applies, plus:

- **Don't invent product behavior.** Only document features that exist in Deneb (check the [main repo](https://github.com/deneb-viz/deneb), its issues, or `docs/changelog.md`). If you're unsure whether something works the way a prompt implies, say so rather than writing it up as fact.
- **Match the existing page** you're editing before matching this guide - if they disagree, keep the page consistent and mention the discrepancy.
- Edit `docs/`, not `versioned_docs/`, unless explicitly asked to fix a released version.
- Adding a page means also editing `sidebars.js`.
- Keep diffs scoped to the request. Don't reformat unrelated content, rename images, or "tidy" pages you weren't asked to touch.
- Run `yarn build` and report the result honestly. A broken link is a failed build.
- Don't commit or push unless asked.

## Getting Help

- Questions about the docs: open an issue or discussion in this repo.
- Questions about Deneb itself: [deneb-viz/deneb](https://github.com/deneb-viz/deneb).
- Please follow the [Code of Conduct](https://github.com/deneb-viz/.github?tab=coc-ov-file).
