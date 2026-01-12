---
title: Deneb 1.9 Available for Beta Testing
description: Deneb 1.9 brings substantial performance improvements and a more maintainable codebase. We need your help to ensure this release is solid before submission to AppSource.
slug: 1-9-beta
authors:
  - daniel
tags: [releases, testing, beta]
image: /img/blog/testing-simple.png
hide_table_of_contents: false
---

Happy New Year! 🎉 Deneb 1.9 represents a significant step in preparing the codebase for future development, bringing substantial performance improvements and enhanced stability. Before we submit to AppSource, we need your help to validate this release with real-world use cases and ensure that it meets the high standards our community expects.

<!-- truncate -->

## Why Beta Testing Matters

As mentioned in [my last post](2025-summary), 1.9 is the result of intensive refactoring work and re-testing to get the existing codebase into better shape for ongoing maintenance and feature development. While the focus has been on internal improvements rather than flashy new features, the changes run deep throughout the entire application.

Deneb is used in a vast array of scenarios by a diverse community. No single developer can possibly cover all the edge cases, data shapes, and usage patterns that exist out there. I'm currently also solely responsible for planning, development, documentation, and support, which limits the amount of time I can dedicate to exhaustive testing.

:::danger This is where things get critical
**Once we submit to AppSource, we're locked into a 3-5 week certification cycle**. If a bug slips through that affects your reports, that's potentially 3-5 weeks before a fix reaches you and your readers. This is why your involvement in beta testing (if you can spare it) is not just helpful, it's essential for the entire Deneb community.
:::

### What Makes This Release Different

Unlike feature releases where we're testing new functionality, 1.9 is about ensuring nothing breaks while everything gets faster, more stable and extensible. The refactoring touches virtually every part of how Deneb works internally:

- Core application architecture has been restructured for better maintainability
- Power BI interactivity handling has been completely rewritten
- Initialization and data processing pipelines have been optimized
- Editor layout calculation and display logic has been improved
- Numerous third-party libraries have been updated to their latest versions, including major updates to React, which manages much of the visual's UI

Any one of these changes could potentially introduce issues that only surface with specific combinations of features, datasets, or use cases that I haven't been able to test. This is the reality of developing on your own with limited time and resources.

## The Performance Gains

While you shouldn't notice any functional differences (if everything's gone to plan), you should see some meaningful performance improvements:

- **15%-40% faster initialization** when loading visuals in reports (depending on visual and dataset complexity)
- **200-300% faster dataset processing** once Power BI has supplied the query result
- **5% smaller packaged visual** size (12% smaller than 1.7), improving download and initialization times
- More responsive editor experience with improved layout calculations

Unfortunately due to how custom visuals are sandboxed, we'll never hit performance parity with core visuals, but these improvements should make a noticeable difference in many scenarios, particularly where you're using larger datasets or multiple instances of Deneb on a report page.

Some of these improvements may have also fixed minor bugs and resulted in some minor UI changes, as well as being able to clean up some technical and operational debt. [Please refer to the Change Log](/docs/next/changelog#190) for full details.

## What We Need From You

Your participation in beta testing directly impacts the quality of the release that reaches AppSource. Here's what would be most valuable:

### 1. Validate Your Existing Specifications

This is the most critical testing you can do:

- Open reports containing Deneb visuals and update them to the beta version.
- Verify that everything works exactly as it did before: no visual differences, no broken functionality, no performance regressions.
- Test both as a viewer (consumption) and as a developer (editing).
- Pay particular attention to visuals using interactivity features (cross-filtering, cross-highlighting, tooltips, etc.).
- Confirm the workflow for creating a new visual from scratch also works as expected, and generation of a template (if this is part of your process).

Even if you just update one visual and confirm it works, that's valuable confirmation of stability across different use cases.

### 2. Test Edge Cases and Complex Scenarios

If you have specifications that:

- Use advanced interactivity features
- Have complex data transformations
- Include dynamic signals and parameters
- Rely on Power BI formatting functions
- Use the debug pane extensively

...these are exactly the scenarios we need tested, as they're most likely to surface issues from the refactoring work.

### 3. Provide Detailed Feedback if Something's Wrong

When something doesn't work as expected, detailed information is essential for rapid diagnosis and fixes. The following makes an enormous difference:

- **Version/build number** ([instructions here](/community/early-access#providing-feedback-on-early-access-builds))
- **Steps to reproduce** the issue
- **Expected vs. actual behavior** and ideally how this differs from previous versions (which will help to further triage problems)
- **Screenshots or short videos** showing the problem
- **Specification and/or sample workbook** (with public/anonymized data)

The more detail you can provide, the faster we can identify and resolve issues. As I'm doing everything, development-wise, as much detail as possible will help me reproduce and find the problem means much more time available for fixing and turning around updates. Please don't assume someone else has already reported it. If you see it, please [create an issue](https://github.com/deneb-viz/deneb/issues) or add to an existing one.

## How to Access the Beta

The latest beta build is available now from the [Beta Channel page](https://deneb.link/beta-build) on GitHub, e.g.:

![The GitHub repository contains a Beta Release page, where you can download the Power BI visual file (.pbiviz) for the latest beta version.](/img/blog/beta-download-page-github.png "The GitHub repository contains a Beta Release page, where you can download the Power BI visual file (.pbiviz) for the latest beta version.")

- Download the .pbiviz file from the Assets section
- [Manually import it into your report](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals?WT.mc_id=DP-MVP-5003712#custom-visual-files)
- The beta version installs alongside the AppSource version with a distinct icon

:::warning YOLO..? NO!
Test with copies of production reports, not the originals. This way you can easily revert if needed without losing any work.
:::

For complete details on the beta process, feedback mechanisms, and version identification, see the [Early Access page](/community/early-access).

## Timeline and Next Steps

As mentioned in the [recent update](2025-summary), we've had some very successful alpha testing cycles for 1.9 with some of our [community experts](/support#community-experts). The feedback from those tests has been invaluable in identifying and fixing issues early. Now it's time to open up testing to the broader community to ensure we catch any remaining issues before submission:

- **Beta testing period:** Starting now, aiming for 2-3 weeks of community validation
- **Submission to AppSource:** End of January 2026 (assuming no blocking issues)
- **General availability:** Depending on Microsoft's certification timeline, likely late February to early March

If critical issues are discovered, we'll release updated beta builds and continue testing until we're confident the release is solid.

## Your Impact on the Community

I say this a lot, but I want to be clear about how valuable your contribution is here. Every visual you test, every edge case you verify, every issue you report: these directly benefit thousands of other Deneb users who may not have the time or opportunity to participate in beta testing.

You're not just helping me fix bugs; you're ensuring that:

- Developers can continue to rely on Deneb for their visualization needs
- End users don't experience disruptions in their reports
- The community maintains confidence in Deneb's stability and quality
- We can continue to build on this platform with new features in future releases

The reality of being a free, community-supported project means we don't have the resources of a commercial product team. We rely on people like you to help ensure quality. This is what makes our community special, and why I'm continually grateful for the support and engagement from everyone involved 🫶.

## Did I Say, "Thanks"?

Once 1.9 is stable and submitted, the next phase continues the refactoring work to prepare for some final (albeit much more minor) refinements and we can start to bring in new features. But first, we need to ensure this foundation is rock solid.

If you can spare some time to help test, it would be enormously appreciated. Your involvement now will help the entire community benefit from a stable, performant release.

Thank you, as always, for your continued support of Deneb.

Until next time,

DM-P
