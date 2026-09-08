---
date: 2026-09-02
topic: release-status-component
---

# Release Status Component for Changelog

## Summary

Replace the comment-toggled release-stage admonitions at the top of the changelog with a single embeddable `ReleaseStatus` component that renders the correct message for a given lifecycle stage, so stage transitions become a one-word edit and the changelog no longer relies on HTML comments that Docusaurus v5 will fail on.

## Problem Frame

The top of `docs/changelog.md` (lines 10–26) holds four release-stage admonitions — Under development, In Beta Testing, Submitted for certification, Pending deployment — of which one is live and three are wrapped in HTML comments. The maintainer comments/uncomments these blocks as a release moves through its lifecycle. The site builds today only because `mdx1Compat.comments: true` is set in `docusaurus.config.js`, and the config's own note records that Docusaurus v5 removes these compat options — at which point the build fails. The same pattern exists (fully commented out, dead) in `versioned_docs/version-1.9/changelog.md`, which builds too. Beyond the looming break, the workflow itself is error-prone: seventeen lines of comment noise, and nothing prevents two stages being live at once.

## Requirements

- R1. A `ReleaseStatus` component renders the appropriate admonition for a lifecycle stage, taking the version string as input so message text stays accurate across releases.
- R2. Supported stages match the current messages: development, beta, submitted (certification), deploying (AppSource rollout), plus a GA/none state that renders nothing.
- R3. `docs/changelog.md` embeds the component in place of the four commented blocks; it remains a `.md` file (the site already compiles `.md` as MDX, so an import works without renaming — verified against `docusaurus.config.js` defaults).
- R4. The dead commented blocks in `versioned_docs/version-1.9/changelog.md` are removed (they would break the v5 build equally).
- R5. Message content preserves the current wording and links (early access, standalone version, getting started).

## Acceptance Examples

- AE1. **Covers R1, R2.** Given the changelog embeds the component with stage `beta` and version `2.0.0`, the page renders the "In Beta Testing" info admonition naming 2.0.0, and no other stage message.
- AE2. **Covers R2.** Given stage is GA (or the stage prop is absent), the component renders nothing and the changelog top is clean.
- AE3. **Covers R3, R4.** Given `mdx1Compat.comments` is disabled locally, `docs/changelog.md` and the version-1.9 changelog both build without error.

## Success Criteria

- A stage transition (e.g., beta → submitted) is a one-word edit to the changelog, with no comment shuffling.
- Rendered output for the current stage is visually identical to today's admonition.
- The two changelog files no longer contain HTML comments, so they survive the removal of `mdx1Compat.comments`.

## Scope Boundaries

- Removing the `mdx1Compat` shims from `docusaurus.config.js` — other content (e.g., blog `<!-- truncate -->` markers, heading IDs) still depends on them; that's a separate sweep.
- Config-driven stage (stage stored in site config or a data file) — rejected as overkill for one active page.
- Auditing/migrating HTML comments elsewhere on the site.
- Wiring up the currently unused `src/components/EarlyAccessWarning.mdx` partial.

## Key Decisions

- Embeddable component over JSX-comment swap: barely more work, and it eliminates the manual toggle workflow rather than preserving it in new syntax.
- Version passed as a prop, keeping the component stateless and reusable across future versioned snapshots; a frozen snapshot carries its stage at time of cut, and GA renders nothing, so snapshots stay clean.
- Keep `.md` extension: MDX compilation of `.md` is the site default, so no rename churn.
