---
title: Deneb 2.0 Released
description: Deneb 2.0 has passed AppSource certification checks and is pending deployment to your reports
slug: 2-0-release
authors:
  - daniel
tags: [releases, certification, production]
image: /img/blog/launch-2.0.png
hide_table_of_contents: false
---

Deneb 2.0 has passed AppSource certification and is on its way to your reports! This is the biggest release since Deneb first landed in AppSource nearly five years ago: a rewritten parsing and rendering pipeline, and a set of long-requested features that it finally makes possible.

**ETA is (approximately) 24th September 2026** for the new version to be fully deployed to your reports, but this may vary based on location and **could be sooner or later than this**. As 2.0 migrates existing visuals in-place when it arrives, it's worth reading on to see if anything needs your attention.

<!-- truncate -->

### What's in This Release

2.0 is a significant milestone, and here are a few of the big-ticket items:

- **Field parameter support** - consolidation into array-valued columns, with companion fields and template awareness.
- **Supporting fields configuration** - per-field control over which supporting fields Deneb adds to your dataset.
- **Continuous view** - eligible datasets are patched in-place on filter/slicer changes, preserving view, input, and selection state.
- **A rewritten parsing and rendering pipeline** - the architectural overhaul that makes much of the above possible.
- **View and convert compiled Vega** - see the Vega generated from your Vega-Lite spec, and adopt it as a starting point.
- **Canvas renderer: scale to report zoom** - much crisper canvas rendering at higher zoom levels.
- **Better context menu control** - suppress the Power BI context menu and/or data point resolution.
- **Debug pane improvements** - separate Source vs. (Vega) Data tabs, and click-to-inspect for any cell value.

As usual, you can view all changes and their associated details starting with the [Change Log](/docs/changelog). You can also [download the packaged visual (+ standalone version) from GitHub](https://github.com/deneb-viz/deneb/releases/latest).

### What to Check in Your Existing Visuals

:::warning Probably the most important bit
We've done our best to make the upgrade process as seamless as possible. Still, check this list to avoid surprises and see what potential mitigations might look like.
:::

Existing visuals migrate automatically and should look and behave exactly as before. A few changes are worth knowing about:

- **`pbi`-prefixed signals are deprecated.** `pbiContainer`, `pbiContainerHeight` and `pbiContainerWidth` are re-mapped to `denebContainer` (and `.height` / `.width`) on parse, with a warning in the logs. Update your specs when convenient.
- **Row limit override is now report-viewing only.** Microsoft no longer guarantees additional data fetches for PDF/PowerPoint export. The initial row limit is now **30,000**.
- **Locales trimmed to the Microsoft-supported list.** If `pbiFormat` previously worked for a locale that's now missing, [let us know](https://github.com/deneb-viz/deneb/issues/new) and we'll add it back.
- **Template schema is now v2.** Old templates import cleanly and auto-migrate any changes. If you're generating templates programmatically, it's worth getting familiar with the v2 structure.

:::tip Working With PBIR or Templating Tooling?
The [Change Log](/docs/changelog#what-affects-pbir-and-templating) has a condensed table of every visual property and template structure change, and the [PBIR Implementation Guide](/docs/pbir-guide) has been updated to match.
:::

### Beta Testing Recap

[Beta testing](2-0-beta) has been so incredibly valuable, particularly given the size of some of the changes and their potential impacts. We got ~100 beta downloads, and again, I couldn't be more grateful to the community for stepping up to help out! Thanks to them, we found seven additional issues before we submitted for certification. Fortunately, none of these were major, but thanks to people reporting and helping to re-test, everyone receives a much higher-quality release.

Many thanks, particularly to **Greg Philps**, **Valeria Breveglieri**, **Christian Salcedo Beltran**, **Davide Bacci**, and u/SheriffYouLikeThis, for all their work providing such detailed issue reports and swift re-testing when candidate fixes were ready.

If you notice anything post-rollout, first, I can only apologize, but we did try our best! Second, I'd encourage you to submit an issue with details as soon as possible so I can look into fixing it. Finally, I'd recommend getting involved with beta testing if you're reliant on Deneb. We can never have enough folks to help with this. Deneb runs on a budget of (almost) $0, and our community's passion for the tooling drives its development and support.

### Looking Ahead

2.0 took a _lot_ of time and effort to realize, and I was foreseeing a break after 2.0, mainly because I've been actively working on Deneb for the last 6 years. However, as soon as beta testing began and I got some cognitive bandwidth back to take stock, I started thinking about what else we can do... so I'm back at it 😅

Work has already started on 2.1, and I've already checked in our first feature (better JSON formatting) and one bug fix that has existed since 1.2. Beta testing surfaced it, but the fix needs more explanation than a last-minute pre-submission change allowed.

I'm also hoping to deliver more for folks working with agentic development or leaning more on PBIR. And now that field parameters are (finally!) delivered, I can look at some features that are much easier to add (like drilldown and sorting), but their initial course changed based on how we had to implement field parameters. I will share what's coming up as soon as I have something tangible.

### Thank You

Really, really, thank you. 2.0 has been a long time coming: about 2 years of R&D (including starting over twice when things got too difficult). And adoption continues to grow - over the last 4 months, we've had **~94K** developers from **~42K** organizations download Deneb, which is an increase of 150% from the same period 2 years ago, when we started keeping these stats. It's mind-blowing.

As mentioned above, working on Deneb has been a large part of my life for a long time. I've been able to work with and meet some amazing folks who are using it to do great things in Power BI. I'm very fortunate that so many are giving back by helping others learn, offering support, helping us realize new features, or providing feedback. To all of you, thanks very much, and I'm looking forward to continuing the journey 🫶

Stay safe and well,

DM-P
