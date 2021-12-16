---
id: early-access
title: Early Access Builds
description: For early adopters or developers.
---

# Early Access Builds

The publish and release cycle for custom visuals in Power BI can be quite long and protracted, as there are many visuals going through this process simultaneously.

With Deneb, we'd like to try and catch things as early as possible, so we're not worrying about discovering simple issues after they've gone live in AppSource, as this can take a long time to get fixes back through. Anyone who wants to help with this is extremely welcome to do so, and we greatly appreciate feedback 😊

There are two early access channels (**Alpha** and **Beta**), which allow you to test features early in the development process, and before new versions get submitted to AppSource for publication and certification.

:::caution Is This for Me?
This process might sound cool, but have a read of the following to determine if you're keen to try them out.

- Early access builds are provided on the basis for giving feedback to maintainers.
- They are not supported for production use.
- Formal documentation is not complete until we're ready to publish, so there may be some degree of discovery required from your end to ascertain changes between builds.
- We will do our best to keep up with documenting major things, which is [made available through the 'next' version](/next) on this site. This version of the [Change Log](/next/changelog) will be the best place to start for a simplified digest of what's going on.
- Early access builds are de-coupled from AppSource, are not certified and do not self-update.
- Please provide feedback! The privilege of getting access to early builds is a two-way street - and you can really help other users get a better experience when we publish to AppSource by letting us know about things.

:::

The above is a quick checklist of what you might need to consider - this blog post covers more detail if you'd like to know more before choosing, and hopefully everything you need to know if you do!

## General Information

- If you don’t mind the emails, you can opt to subscribe to release notifications by watching the Deneb repository - [here’s the appropriate GitHub help link for setting this up](https://docs.github.com/en/account-and-profile/managing-subscriptions-and-notifications-on-github/setting-up-notifications/about-notifications).

- Once installed, an early access build visual will overwrite any versions of the Alpha Channel Build that you will have loaded in the report.

- Each channel's published visual will have its own unique ID and icon - meaning that it can be side-loaded into your reports so it doesn’t replace any existing instances of the AppSource visual, or another channel's visual (similar to how the [Standalone Version](../getting-started#standalone-version) works).

- Note that visuals do not fully re-initialise until they are “created” on a report page, so you can either navigate away from the current page and back if you need to refresh an instance of an Alpha Channel Build visual, or add a new one to the current page.

## Providing Feedback on Early Access Builds

From a testing and verification perspective, we're really keen to know if you spot any bugs or have feedback on how well a particular feature works. You can really help us avoid lengthy (re)submission cycles to AppSource if you spot anything before we publish 🙂

If you need to let us know about anything, [please create an issue with your feedback](https://github.com/deneb-viz/deneb/issues). It is also worth having a quick look through the list of open issues to see if someone else has raised what you’ve noticed. Where possible, please include the version/build of the visual you’re using. You can do this by:

1.  Right-clicking the visual in the pane and choose **About**. Power BI will open a dialog with the visual details, e.g.:

    ![The 'About' dialog for a custom visual, showing details such as name and version.](/img/early-access/deneb-early-access-about-dialog.png "The 'About' dialog for a custom visual, showing details such as name and version.")

2.  Selecting the text in the **Version** field and copying to the clipboard with **[ Ctrl + C ]**.

3.  Pasting the version into the issue you’re creating.

We'll be working on some issue templates soon, which should help streamline this process, but for now the best thing you can do is to help me help you by including as much information as you can.

New issues will be triaged and scheduled. Depending on their priority and/or severity, they might not get fixed immediately and could be scheduled for later on. Please do not be discouraged by this if it happens - it’s important for us to know how people are using Deneb and provide them with better ways of using it but we only have a finite amount of free time to work on it.

## Alpha Channel

With the Alpha Channel, the .pbiviz file is automatically built and deployed whenever a pull request is merged into the main development branch.

As such, the Alpha Channel Build is right on the bleeding edge of development. Features _may_ be incomplete, or unstable (but hopefully not).

### Accessing the Build

The Alpha Channel Build is [published to the `alpha` release tag in Deneb's GitHub repository](https://github.com/deneb-viz/deneb/tree/alpha). It will always be the latest version for the current development effort.

The shortened URL for this location is https://cutt.ly/deneb-alpha

The Alpha Channel Build Release page will look something like this, and the latest .pbiviz file is available from the list of assets at the bottom, e.g.:

![Example of the Deneb Alpha Channel Build Release page in Github. The lastest .pbiviz can be downloaded from the list of Assets at the bottom.](/img/early-access/alpha-release-page-example.png "Example of the Deneb Alpha Channel Build Release page in Github. The lastest .pbiviz can be downloaded from the list of Assets at the bottom.")

### Installation and Identification

The Alpha Channel build is installed manually, by [importing the downloaded .pbiviz into your report](https://docs.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals?WT.mc_id=DP-MVP-5003712#custom-visual-files). The installed Alpha Channel build will show the following icon in the **Visualizations** pane:

![The Alpha Channel Build is installed as a separate visual in your report, and distinct from the other channel versions, including AppSource.](/img/early-access/deneb-alpha-channel-icon.png "The Alpha Channel Build is installed as a separate visual in your report, and distinct from the other channel versions, including AppSource.")

The landing page will also show slightly different information to the other channels, e.g.:

![Example of 'Deneb (Alpha Channel Build)' landing page, after adding the visual to the report canvas - the name, description and version will be different.](/img/early-access/deneb-alpha-channel-landing.png "Example of 'Deneb (Alpha Channel Build)' landing page, after adding the visual to the report canvas - the name, description and version will be different.")

:::tip The Version Number is Extremely Important
Please remember to include this when [providing feedback or reporting issues](#providing-feedback-on-early-access-builds).
:::

## Beta Channel

With the Beta Channel, the .pbiviz is built whenever we're ready with a candidate build for potential release to AppSource. These builds are typically the culmination of a planned development cycle, or an incremental release as the result of any issues found with an earlier beta release.

### Accessing the Build

The Beta Channel Build is [published to the `beta` release tag in Deneb's GitHub repository](https://github.com/deneb-viz/deneb/releases/tag/beta). It will always be the latest version for the current development effort.

The shortened URL for this location is https://cutt.ly/deneb-beta

The means to download the .pbiviz is the same as for the Alpha Channel Build, i.e. the visual is available in the list of assets at the bottom.

### Installation and Identification

The Beta Channel build is installed manually, by [importing the downloaded .pbiviz into your report](https://docs.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals?WT.mc_id=DP-MVP-5003712#custom-visual-files). The installed Beta Channel build will show the following icon in the **Visualizations** pane:

![The Beta Channel Build is installed as a separate visual in your report, and distinct from the other channel versions, including AppSource.](/img/early-access/deneb-beta-channel-icon.png "The Beta Channel Build is installed as a separate visual in your report, and distinct from the other channel versions, including AppSource.")

Similar to the Alpha Channel, the Beta Channel Build will have its own unique version on its landing page.

:::tip The Version Number is Extremely Important
Please remember to include this when [providing feedback or reporting issues](#providing-feedback-on-early-access-builds).
:::
