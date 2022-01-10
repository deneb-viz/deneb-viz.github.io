---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

:::caution Potential Upcoming "Breaking" Changes
We are intending to implement cross-highlight support in an upcoming release (likely 1.2 or 1.3). Deneb will currently always apply the **filter** interaction by default (unless you have specified differently in your report configuration).

Much like [Cross-Filtering](interactivity-selection), Cross-Highlight will be opt-in from a specification perspective. However, if you don't have your [interactions set to cross-filter](https://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions#change-the-interaction-behavior), Power BI will try to apply the **highlight** interaction and this will make your visual appear to do nothing when filtered by other visuals.

When this functionality is delivered, it is recommended that you ensure any Deneb visuals are explicitly set to **filter** or **no impact** accordingly.
:::

## 1.0.0 (2021-11-13)

### IMPORTANT NOTES

- This is the promotion of the preview codebase into [the official AppSource release](https://appsource.microsoft.com/en-us/product/power-bi-visuals/coacervolimited1596856650797.deneb) 🎉🎉🎉🎉
- Fetching via remote URLs (e.g. for image marks) has been disabled to comply with Power BI certification requirements. This can be mitigated by [downloading the standalone build](getting-started#standalone-version).
- There a no major changes in this release; just those that help with QA.

### Bugs Fixed

- Swapping editor position causes editor UI to crash (#137)

### Performance and Stability

- Improved target area of whitespace for clearing an active selection (#140)
- Visual rendering events synced-up with Vega View API (#141)

## Older Versions

To keep the change log (reasonably) tidy, the details of older versions get archived from time to time. Each archive can be found as a sub-page of this section (and you can follow the navigation below to continue reading).
