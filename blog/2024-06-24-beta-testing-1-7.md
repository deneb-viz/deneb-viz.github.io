---
title: Deneb 1.7 Available for Beta Testing
description: Deneb 1.7 is a significant update, and we're excited to submit it to AppSource very soon! Before we do that, we're opening beta testing for the community so that we can ensure that the quality of the submitted version is as good as possible for all users.
slug: 1-7-beta
authors:
  - daniel
tags: [releases, testing, beta]
image: /img/blog/blog-header-beta-1-7.png
hide_table_of_contents: false
---

Deneb 1.7 is a significant update, and we're excited to submit it to AppSource very soon! Before we do that, we're opening beta testing for the community so that we can ensure that the quality of the submitted version is as good as possible for all users.

<!-- truncate -->

## Why Beta Testing?

For Deneb, this is a critical phase of development that we can't do without broader assistance. Here are a few important reasons why:

- Deneb's user base has grown significantly since its launch, and in the last three months alone, we have had nearly **13,000** downloads by more than **6,500** developers. And there will be many more people than this experiencing the visuals these folks develop in their deployed Power BI reports.

- Because Deneb is a certified visual, we can't monitor visual usage via telemetry for trust and privacy reasons. We only know about the kinds of use cases Deneb fulfills based on examples that people generously choose to share on social media channels or by a small portion who choose to make their templates available for others to use, or by those who help improve Deneb by reporting issues and making feature requests 🙏

- So, while we take great care to ensure that all functionality works as well as possible, we can only explore a limited number of use cases ourselves. We want to make sure that those out there who will be using Deneb in unique and innovative ways get a chance to make sure that their solutions will continue to work.

- Once we submit a new version of Deneb to AppSource, **we're committed to the publication process**: if someone finds a bug, we may be able to fix it very quickly, but it can take anywhere between **3 and 5 weeks** for a visual update to go through the certification process and fully deploy to all reports. This can be a long time for people to wait.

#### This is where your help is invaluable.

If you have some time to dedicate to validating your existing specifications and checking the functionality of the new features, you're going to be (a) getting to play with new features and validating that they're going to help elevate your reports and your productivity processes when using Deneb, and (b) ensuring that not just you and your stakeholders are going to have continuity of service when the update deploys, but we can be confident that our wider community will, too 😀

## What Changes Can I Expect?

We said that 1.7 is a big release, and we mean it! Here are the big-ticket items that may pique your interest further:

- **Dark mode**—you can now toggle between the traditional light theme and a darker one to reduce eye strain.

  ![You can now set the theme to [Dark], to convert the editor into dark mode. This will display all components (except for the preview area) with darker colors.](/img/changelog/1.7.0/dark-theme-standard.png "You can now set the theme to [Dark], to convert the editor into dark mode. This will display all components (except for the preview area) with darker colors.")

* **Commenting**—you can now add comments to your JSON for documentation and debugging purposes.

  ![JavaScript-style block (/* */) and line (//) comments are now valid in the JSON editor.](/img/changelog/1.7.0/json-comments.png "JavaScript-style block (/* */) and line (//) comments are now valid in the JSON editor.")

* **Auto-completion improvements**—suggestions will now be recommended based on the details in the Vega and Vega-Lite schemas.

  ![Valid matching entries for language keywords are now available via auto-completion.](/img/changelog/1.7.0/auto-completion.png "Valid matching entries for language keywords are now available via auto-completion.")

* **Inline language documentation** (for Vega-Lite)—the documentation the Vega team makes available for Vega-Lite in its language schema is now available when you hover your mouse over an appropriate location in your JSON. This will help you discover more language features within Deneb itself, and any hyperlinks will navigate you to the correct location on the Vega-Lite documentation site for further reading.

  ![Hovering your mouse over language keywords (in Vega-Lite) will display any relevant documentation.](/img/changelog/1.7.0/doc-on-hover.png "Hovering your mouse over language keywords (in Vega-Lite) will display any relevant documentation.")

* **Clearer JSON error and warning indications**—any parsing issues are better highlighted closer to their location in the JSON editor.

  ![The position of errors and warnings is now better highlighted, so that you can track down JSON parsing issues more quickly.](/img/changelog/1.7.0/json-editor-highlighting.png "The position of errors and warnings is now better highlighted, so that you can track down JSON parsing issues more quickly.")

* **Improved JSON editor state preservation**—Deneb will track the state of anything you've done in the JSON editor to make your specification easier to navigate, such as code folding, for the current editing session. This will include when you exit and re-enter the advanced editor (provided you don't leave the current report page).

* **Auto unit formatting**—a new format type that applies the same logic as Power BI format numbers in K, M, Bn, etc., with less effort than the existing Power BI value formatter.

* **Advanced cross-filtering** (for Vega)—new expression functions to help generate cross-filtering of report items based on a filter against the original dataset sent to Deneb before any transformations may have been applied.

* Improved tracking of dataset field allocation within JSON for dataset changes and templating purposes.

* New signals that track the visual container scroll position.

* Many performance enhancements and bug fixes.

Check the [Change Log](/next/changelog) for a more complete list and links to more detailed documentation.

## How Can I Help?

As mentioned above, there are two key things we need to ensure:

#### 1. Everything you've already made continues to work.

This is perhaps the most straightforward thing you can do, but it's the most important. Even if you do the following bare-minimum tests and everything looks good, this is incredibly helpful in validating things:

- Update a Deneb visual to the latest version and ensure it continues working as expected for your users.

- Update a Deneb visual to the latest version and ensure it continues working as you expect as a developer.

#### 2. The new features work as you expect them to.

Again, we try to cover as much as possible ahead of time, but beta testing helps us confirm that the features and fixes we're implementing cover your use cases. You might even find use cases we didn't think of that can make Deneb even better in the long run or might possibly cause some unintended side effects in the shorter term.

With anything that comes up here, we can decide if a feature needs additional tweaks before submission (if it's simple), or we might learn that a feature isn't ready for all users. This is, again, all valuable feedback that is best to know before we begin the submission and certification process.

## How Can I Download And Use the Beta Release?

:::warning Use a copy of any production reports!
If you are testing a production report, it is strongly suggested that you save a copy of your workbook and work with that for testing purposes before converting a visual over to a beta build instance. This means that you don’t have to worry about reverting your existing production visual back to 1.6 and losing any functionality that may be present in 1.7.
:::

The latest version is always published and available for download on our GitHub [repository's beta channel page](https://deneb.link/beta-build):

- The visual (.pbiviz) file is available from the list of assets at the bottom, e.g.:

  ![The GitHub repository contains a Beta Release page, where you can download the Power BI visual file (.pbiviz) for the latest beta version.](/img/blog/beta-download-page-github.png "The GitHub repository contains a Beta Release page, where you can download the Power BI visual file (.pbiviz) for the latest beta version.")

* With the file downloaded, you can then [manually import it into your report](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals?WT.mc_id=DP-MVP-5003712#custom-visual-files).

* To begin testing, create a visual using the new beta version or change an existing one from the current AppSource version to the installed beta version.

**Note that you should always exercise care when downloading and installing Power BI visual files from unknown/untrusted sources**. Any visuals published and made available from Deneb's GitHub repository will conform to Deneb's [privacy policy](/privacy-policy).

## I Checked, and Something's Not Right. What Now?

The best thing you can do is let us know. Don't assume someone else has already found it and told us! We can manage duplicate issues if they occur, but it's always good to check to see if the [list of open issues](https://github.com/deneb-viz/deneb/issues) has what you're planning to tell us about.

If you find a bug 🐛or have an enhancement 🌟 you'd like, you can [create an issue in our GitHub repository](https://github.com/deneb-viz/deneb/issues) if it does not exist or add your voice to an existing issue if it's there.

Because everyone's setup is always unique to them, a lot of the time we spend on bugs is spent understanding things that may be specific to the situation. Anything we can do to cut this time down means we can find and fix things faster. As such, the following information is always going to be helpful if you can provide it:

- The version build (please [refer here](/community/early-access#providing-feedback-on-early-access-builds) to find out how to obtain this).

- Prescribed steps to reproduce the issue.

- Expected outcome.

- Actual outcome.

- Supporting screenshots or a short video.

- Specification and/or sample workbook that can reproduce the issue.

Unfortunately, .pbix files aren’t a valid file type for attaching a workbook to your GitHub issue, but you can change the extension (e.g., to .zip), and this will work. In reproducing issues and sharing the above, **please use public or anonymized data**, as we cannot be held responsible for the data you share with us.

If you have a suggestion for improvement, it would be great if you could be as descriptive as possible about how you think this should work. Again, the following should help provide you with some ideas for helping me get on your wavelength:

- User stories or short narratives.

- Mockups (taking existing screenshots and annotating them is totally fine).

Note that enhancements will likely not be candidates for implementation during the beta testing phase but will help us understand what you need from Deneb and help us improve things in future releases.

## When Will Beta Testing Be Finished and Deneb Submitted to AppSource?

We want to get to AppSource as quickly as possible, but we want to be sure not to rush if things are not fully ready.

The timeline will depend on what is found. We are planning an initial two-week phase of validation, identifying key issues and triaging them, which is due to be completed on **Monday, July 8th**.

If no significant or blocking issues occur, we'll submit it as soon as possible after this date. If we have things to fix, we will issue a new beta release with a tighter time loop for feedback and continue this until we're ready to go. This should ideally be done and ready before the end of July. Assuming the normal AppSource submission and certification timelines apply, Deneb should be live in reports by the end of August.

## Thank You

We say this a lot, but we rely incredibly on the Power BI and Deneb community to help promote, test, and support Deneb so everyone can benefit. We're also so fortunate that the Vega development team continues to support and update Vega and Vega-Lite, which provide a fantastic set of tools for bespoke data visualization. Without these people and their commitment to the community, we would not be where we are today. 🙏

We look forward to bringing 1.7 to a Power BI near you soon!
