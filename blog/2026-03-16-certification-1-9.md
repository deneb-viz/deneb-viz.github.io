---
title: Deneb 1.9 Released
description: Deneb 1.9 has passed AppSource certification checks and is pending deployment to your reports
slug: 1-9-release
authors:
  - daniel
tags: [releases, certification, production]
image: /img/blog/launch-simple.jpg
hide_table_of_contents: false
---

Deneb 1.9 has passed AppSource certification and is on its way to your reports! This release is the result of extensive refactoring and optimization work, delivering meaningful performance improvements while keeping everything you rely on working exactly as it should.

**ETA is (approximately) 26th March 2026** for the new version to be fully deployed to your reports, but this may vary based on location, so it will be helpful to read further and determine if any additional preparation is needed on your end to ensure a smooth transition.

<!-- truncate -->

As usual, you can view all changes and their associated details starting with the [Change Log](/docs/changelog). And you can always [download the packaged visual (+ standalone version) from GitHub](https://github.com/deneb-viz/deneb/releases/latest).

### What's in This Release

As covered in the [beta testing post](1-9-beta) and the [2025 summary](2025-summary), 1.9 has been focused on restructuring and optimizing the codebase to set us up for future development. This will result in very little in the way of visible change to your experience, but you should notice some tangible performance gains:

- **15%-40% faster initialization** when loading visuals in reports, depending on visual and dataset complexity
- **200-300% faster dataset processing** once Power BI has supplied the query result, thanks to a complete rewrite of how selection IDs are generated and managed
- **5% smaller packaged visual** (12% smaller than 1.7), improving download and initialization times

Beyond the performance work, there are some opportunities for minor enhancements and bug fixes that came out of the refactoring. The [Change Log](/docs/changelog) has the full details on everything.

:::tip Improving Experience with PBIR
A key goal of the refactoring was to also make Deneb's front end a bit more forgiving with how folks may be looking to use [Power BI Enhanced Report Format (PBIR)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?WT.mc_id=DP-MVP-5003712&tabs=v2%2Cdesktop#pbir-format).

One notable addition to the documentation is to help with those who are looking to use PBIR more readily in their workflow and may also be interested in how they can potentially automate Deneb, either through their own efforts, or in conjunction with an LLM. The [PBIR Implementation Guide](/docs/pbir-guide) has been published to advise on how to consider working with Deneb using PBIR, and includes a comprehensive list of how Deneb's internal property system works (and how properties affect the rendered output).
:::

### Looking Ahead

With 1.9 out the door, the next phase continues the work to get the codebase ready for new features. The goal is to complete the remaining refactoring and architecture changes needed so that we can start bringing in tangible improvements that you've been asking for. I'll share more on this as things take shape.

### Thank You

For a visual like Deneb and for how much it has evolved over the last 5 years, it really does take a village to get it to where it is today, and to keep it moving forward. As always, we can't keep going without the vital support of the community, once again, thank-you, everyone who has been involved in testing, providing feedback, sharing ideas, and just being part of the journey. Your contributions are what make Deneb what it is, and I'm excited for what's ahead as we continue to build together :)

---

All the best,

DM-P
