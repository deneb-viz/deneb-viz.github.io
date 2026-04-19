---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

## 2.0.0 (Under Development)

:::info Under development 🚧

<!-- Changes are currently only available in [alpha builds](/community/early-access), but we'll release and submit soon once testing is complete. -->

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

### View Compiled Vega + Conversion (for Vega-Lite)

One of the most useful features of Vega Editor was that, if working with Vega-Lite, you could see the generated Vega specification directly in the UI. This was great for understanding how to 'think in Vega' and for taking the generated output and immediately using it as the basis for a Vega spec, without needing to start from scratch. This has been requested for Deneb for a long time, and thanks to the new parsing pipeline, it's exciting to finally make it available.

Much like the Vega Editor implementation, **this action is irreversible**, and will replace your current specification with the generated Vega output. It is recommended that you save a copy of your Vega-Lite specification before using this action, in case you want to revert to it.

You can read more about the feature and how to use it in the [Visual Editor documentation](visual-editor#compiled-vega-pane).

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

### Internal Signal Changes

The parsing and rendering pipeline changes have given us a chance to reflect upon the naming convention of internally-generated signals that we use to support Deneb and integration with Power BI features. These are now intended to be prefixed with their intended purpose.

The legacy `pbi`-prefixed signals are now deprecated. To ensure continuity, Deneb will re-map these signals internally when your spec is parsed. However, you will see a warning in the logs to switch to the new `deneb`-prefixed signal names, e.g.:

![denebContainer-migration-log-warning.png](/img/changelog/2.0.0/denebContainer-migration-log-warning.png "A warning message in the logs indicating that legacy signal names have been detected and re-mapped.")

It is recommended that you adjust your specifications to match the new names at the earliest possible opportunity, and the suggested migration strategy for each signal is as follows:

| Signal Name          | Migration Strategy      |
| -------------------- | ----------------------- |
| `pbiContainer`       | `denebContainer`        |
| `pbiContainerHeight` | `denebContainer.height` |
| `pbiContainerWidth`  | `denebContainer.width`  |

### `$schema` Usage Warning (and Quick Fix Action)

If you generate or find a specification elsewhere, it may (for good reasons) have the `$schema` property, which is important for validation of a Vega or Vega-Lite specification.

However, this is an overload in the context of Deneb, because if you try to use a spec with this property in the editor, it will try to resolve the schema from that URL, which will fail, because external requests are not permitted in a certified Power BI Visual. This prevents features such as auto-completion, inline documentation, and validation from working.

For consistency with the language specification, Deneb will manually add the appropriate `$schema` URL when generating an exportable template and ensure that it is stripped out when you import a template through the _Create new specification_ dialog, but doesn't make any decisions around the content you add to the JSON editor. All of this hasn't been documented, so the documentation has been updated to provide better guidance on this behavior.

In this release, there's also a more prominent warning for this occurrence, which can be inspected further on hover, e.g.:

![schema_warning_message.png](../docs/getting-started/img/schema-warning-message.png "A warning message shown inline in the Specification editor for a root-level $schema property, with the Quick Fix action available to remove it.")

If you so wish, clicking the _Quick Fix..._ button will remove the affected `$schema` property from the editor for you.

### PBIR and Templating Changes

Many of the above changes introduce considerations for building visuals using [Power BI Enhanced Report Format (PBIR)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?WT.mc_id=DP-MVP-5003712&tabs=v2%2Cdesktop#pbir-format), as well as template construction. Rather than detail this information in each feature, each documentation page has been updated accordingly, but a condensed summary of areas to check and update if you have tooling around this are as follows:

| Feature                                              | Visual property changes                                                                                                                                                           | Template changes                                                                                                                                                                                                                 |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Context menu control](#better-context-menu-control) | New property for context menu control: `objects.interactivity.enableContextMenuSelector`; existing `enableContextMenu` property is re-purposed to toggle context menu visibility. | A new `interactivity.contextMenuSelector` property is available to track whether to use selectors in the context menu. The existing `interactivity.enableContextMenu` property is re-purposed to toggle context menu visibility. |

### Bug Fixes

- The background for the debug pane toolbar and log viewer was incorrectly set to transparent, making them difficult to read in dark mode ([#604](https://github.com/deneb-viz/deneb/issues/604))
- Creating custom `height` and/or `width` signals will break compilation [(#417)](https://github.com/deneb-viz/deneb/issues/417).
- "View mode" viewport not being correctly used when opening visual editor from within a report page group ([#620](https://github.com/deneb-viz/deneb/issues/620)).
