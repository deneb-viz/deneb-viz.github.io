---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

## 2.0.0 (Under Development)

:::info Under development 🚧
Changes are currently only available in [alpha builds](/community/early-access), but we'll release and submit soon once testing is complete.
:::

<!-- :::info In Beta Testing
Deneb 2.0.0 is currently in a beta testing phase. If you would like to help test this release prior to general availability, please visit the [early access community page](/community/early-access) to download the beta build and provide feedback.
::: -->

<!-- :::info Submitted for certification
Deneb 2.0.0 has been submitted to AppSource for certification and may take some time to reach your reports. If you need to leverage any features or fixes from this release, you can download and use the [standalone version](getting-started#standalone-version).
::: -->

<!-- :::info Pending deployment to AppSource
Deneb 2.0.0 has passed certification and is currently undergoing deployment to your reports. This can take a couple of weeks from the publish date.
::: -->

### Better Context Menu Control

Deneb now provides two-level control over the Power BI context menu (right-click). Both settings default to enabled, matching the previous default behavior:

- **Show context menu on right-click**: controls whether the Power BI context menu appears on right-click.
  - When disabled, right-click events are silently consumed, and no menu is displayed.
  - This allows authors to use right-click for their own Vega/Vega-Lite event handlers without the Power BI context menu appearing.

- **Attempt to resolve data point-specific actions**: When the context menu is enabled, this controls whether Deneb attempts to resolve the clicked data point for drill-through and other data-specific menu options.
  - This option is only available when the context menu is enabled.

Both settings are portable via templates ([see below](#pbir-and-templating-changes)).

Disabling the context menu will still allow context events from the Vega view to be used, so if you wanted to, for example, create a custom context menu in Vega, this will work as expected.

:::tip Migration path for existing projects
If your current project was created in an earlier version (or you import a template created in an earlier version), Deneb will automatically migrate context menu settings to the new structure. Projects that had data point resolution disabled will be migrated to: context menu shown + data point resolution off, preserving the author's original intent.
:::

### PBIR and Templating Changes

Many of the above changes introduce considerations for building visuals using [Power BI Enhanced Report Format (PBIR)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?WT.mc_id=DP-MVP-5003712&tabs=v2%2Cdesktop#pbir-format), as well as template construction. Rather than detail this information in each feature, each documentation page has been updated accordingly, but a condensed summary of areas to check and update if you have tooling around this are as follows:

| Feature                                              | Visual property changes                                                                                                                                                           | Template changes                                                                                                                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Context menu control](#better-context-menu-control) | New property for context menu control: `objects.interactivity.enableContextMenuSelector`; existing `enableContextMenu` property is re-purposed to toggle context menu visibility. | A new `interactivity.contextMenuSelector` property is available to track whether to use selectors in the context menu. The existing `interactivity.enableContextMenu` property is re-purposed to toggle context menu visibility. |
