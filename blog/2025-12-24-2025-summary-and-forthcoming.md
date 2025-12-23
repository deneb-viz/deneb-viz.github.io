---
title: Finishing up 2025 and Looking Ahead
description: An overview of development progress through 2025, and what to expect next
slug: 2025-summary
authors:
  - daniel
tags: [news, roadmap]
hide_table_of_contents: false
---

It's been a quiet year so far in terms of what's been coming out, but I wanted to provide an update on progress, as well as what's happening next.

<!-- truncate -->

### Best Laid Plans...

Deneb started out as a very organic idea and continued to grow in a similar fashion, mostly because it was uncertain how much interest there would be in a visual that brought the Vega and Vega-Lite languages to Power BI. I was also really starting out learning how to build Power BI visuals and cross-skilling into front-end web development from my background in data analysis and visualization.

We've just reached the milestone of Deneb being in AppSource for 4 years(!), as it was [published and approved for certification in late 2021](https://coacervo.co/deneb_nov_2021). And, its adoption and usage has continued to grow steadily since then, which is really encouraging. It's probably more of an indictment of how great the Vega languages are for building such customizable visuals than anything else, but it's amazing that it's solving real world problems for people and I continue to see such tremendous work by our community, particularly those who choose to help people be aware of Deneb and the Vega language capabilities.

There's a lot I still want to do in terms of where I want things to be, but the codebase had become difficult to manage and it seemed like a good point to make a clean break on a brand new version, so as not to repeat the mistakes of the past and give us a better platform to build on.

I've spent the last 18 months trying to focus on sorting this out and have mentioned this plan in a couple of previous posts. One key thing about this effort is that it would involve us having a new Power BI visual listed in AppSource, amongst other breaking changes. I've been working on this basis and lot of time this year has been spent on realizing that, including a lot of code being written.

The reality to deliver on this has been... humbling. It's hard to keep momentum when you're developing on your own (and are incredibly critical of your own skills), and while I have had some tremendous support from some key folks in our community to keep this going, the "last 20%" was getting to the point where it just became incrementally harder to make progress on. This has caused me some challenges in terms of motivation.

So basically, we've had [one release this year](1-8-release) with a view to getting something bigger done later in 2025, but that hasn't materialized as I would have liked.

### What I'm Doing About It

Long story short, I made the difficult decision at the start of November to do two things:

1. Get off the current v2 treadmill/funk.
2. Rather than continue to re-invent the wheel, figure out how to move this forward with the current codebase and get back to improving Deneb in a more visible way.

### The Last 6 Weeks

Since that decision point, I've been about the same level of busy, but the kind focused on getting some visible changes done. This has involved:

- Taking stock of how the v1 codebase looks, vs. what I was planning for v2.
- How we could move forward in place with minimal disruption to, well... everyone.
- Spending a _lot_ of time refactoring and re-architecting the v1 codebase to make it more maintainable and extensible going forward.

Which leads us to...

### Next Up

**Deneb 1.9** represents the first stage of optimizing the codebase for future-state maintenance and feature development. This is the result of the last six weeks of crunch and if you want an idea of what this has entailed, [here's the PR](https://github.com/deneb-viz/deneb/pull/565) 😅

In terms of what to expect, if I've done the job properly, you shouldn't really notice anything substantial in terms of features or workflow. But, I have been able to make some significant improvements to performance and stability as part of this tidy up that were too good to pass up:

- Much improved initialization time (between **15%-40% faster** depending on visual and dataset complexity).
- Streamlining of Power BI interactivity handling, making the base dataset lighter and much faster to process (typically **200-300% faster** in benchmarking, once Power BI has finished supplying the query result to Deneb for processing).
- The packaged visual (.pbiviz) is **5% smaller** than 1.8 (and 12% smaller than 1.7).

Due to some of the work to unravel a lot of the Power BI-specific stuff from the base application, there are some minor improvements and bug fixes. These, plus more detail on the above is being documented in the [upcoming Change Log](/docs/next/changelog#190) if you want to read more about them.

This release is undergoing internal and limited alpha testing by some community members as I write this. Results are, so far, good 🤞. Anyone else who wants to is, of course, welcome to download the latest alpha build and take things for a spin - we need as much validation as possible! If you find anything, please add details (+ reproduction information) to [the issue I'm using to track any remediation](https://github.com/deneb-viz/deneb/issues/566).

Once we're confident enough (probably early new year), I'll be doing a short beta testing phase, so if other folks are able to help out with that, then this will help a lot in confirming stability before we submit to AppSource for certification. Submission will happen as soon as we can after that, but I'm aiming fro the end of January 2026 at this time (pending testing outcomes).

### After That

The next stage is to complete everything we need to do to get Deneb ready for 2.0, which is the point where we can add tangible new features.

This will involve finishing off the refactoring and architecture work needed to get the codebase ready. It should be possible to achieve this in one fell swoop. However, if we need to make any further submissions to AppSource between now and then for support purposes, these features may gradually migrate through these releases just by virtue of the work being done.

Because of this change of approach, **I will be intending to keep the current AppSource visual listing as the definitive/certified edition of Deneb**.

There will be some things that may have to change in their intended approach, given that we no longer have a clean slate to work with, but the core vision and feature set will remain the same. These will all be managed in a way the ensures existing reports and implementations are not broken by any changes.

---

I guess by the nature of Deneb being free and community supported, I guess we don't really have the same pressures as a commercial product, but I do regard transparency as important and want to make sure that we keep things moving forward and continue to provide value to our community. I hope this new approach will help us achieve that.

I hope that however you're choosing to celebrate the end of 2025 and the start of 2026, you have a great time doing so, and stay safe and well. And thank you as always for your support of Deneb and for your continued support and encouragement. It's been amazing to see so many new shares and ideas from people who have just discovered Deneb this year, as well as those who continue to push the boundaries of what's possible and share their work. I look forward to seeing what new things 2026 brings for all of us!

Until next time,

DM-P
