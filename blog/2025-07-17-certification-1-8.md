---
title: Deneb 1.8 Released
description: Deneb 1.8 has passed AppSource certification checks and is pending deployment to your reports
slug: 1-8-release
authors:
  - daniel
tags: [releases, certification, production]
image: /img/blog/blog-header-release-1-8.png
hide_table_of_contents: false
---

Version 1.8 is a maintenance update to Deneb, which brings Deneb up to the latest Microsoft APIs and certification standards and updates the current Vega and Vega-Lite runtimes. It also prepares the v1 codebase for the end of feature development and long-term continuity of service, while fixing several minor but long-standing bugs.

<!-- truncate -->

You can view all changes and their associated details starting with the change log [Change Log](/docs/changelog). And as always, this has also been made available for users of the standalone (non-AppSource) version, so you can [download it from GitHub](https://github.com/deneb-viz/deneb/releases/latest).

As always, I'm extremely grateful to our community, especially those who volunteer to help test the builds before we submit them to AppSource for everyone else to use. Deneb has become a little more than one person can completely handle in their free time, so any and all assistance from these folks is essential to keep our quality and stability as high as possible as we evolve. I hope that you appreciate and value their contributions as much as I do!

### Readiness for v2 and the Future of v1

I've mentioned this in a previous post, but to provide a more recent update, I'm spending a lot of my time and effort working on Deneb v2. This is a significant shift in terms of architecture, will form the basis of all future features and as such replace v1 as the dominant version of Deneb in the future. It is a complete rewrite following the lessons learned from the development of v1, as well as learning from the feedback and suggestions of our community.

This includes a huge look at the template definition format and underlying visual property structure that we use for configuration and persistence inside Power BI workbooks: as we now have tooling like PBIR, which better structures the report layer and also exposes the internal configuration for a visual instance. As such, there is too much complexity and ambiguity with the current v1 implementation if you are approaching this from a programmatic perspective.

This structure is being redesigned and streamlined, which will make it easier to work with if you have ideas for the potential automation of visual configuration, or if you want to potentially build your own tools to work with Deneb. It is also designed to be more modular, extensible and maintainable, which will allow us to add new features and improvements more rapidly in the future.

**As such, the v2 visual will be a brand new product, and AppSource listing. It will remain free and open-source.**

Because Power BI reports are intended to be stable for users once delivered, it's important to me that we take a similar approach for Deneb where v1 is concerned and I don't want to either introduce a potentially breaking change to existing reports if we attempt to update the visual in-place through the standard AppSource update process, or just remove the v1 visual from AppSource and leave existing reports with no visual at all.

Therefore, the plan for v1 is to continue to provide critical bug fixes, Vega language updates (providing they remain compatible with the v1 architecture) and Power BI visual API compatibility, to comply with certification requirements. However, no new features will be added to the v1 codebase unless there is a significant justification to do so.

Because Deneb development is done in my free time, I'm always "a couple of months away" from having something tangible to show you, and it may feel like the wheels are spinning a bit, but a lot is happening: in the last 8 months, more commits have gone into the v2 codebase than have gone into the entirety of v1 since its inception nearly five years ago. There will be more news soon, but I wanted to provide this update to reassure you that Deneb is not going away, and that we are committed to providing a stable and reliable visual for the foreseeable future.

---

Thanks as always,

DM-P
