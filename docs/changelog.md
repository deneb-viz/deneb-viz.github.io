---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

## 2.0.0

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

### A New Parsing and Rendering Pipeline

From the beginning, Deneb's spec parsing and embed process was always a case of "however it could be gotten to work in Power BI," and has been somewhat of an architectural weak point. In this update, the whole process - from submission of your spec through to its embedding has been rewritten and optimized.

In conjunction with the architectural improvements made in 1.9, this now opens the way for many features that were too hard to deliver without complicating things further. And, we're getting some of these features into this release, too! Read on for details on what else you have to enjoy.

### Continuous View

To date, any changes external to Deneb on the canvas that affect the generated dataset - slicing, cross-filtering from other visuals, filter pane changes - would trigger a full re-render, effectively resetting the view back to its initial state each time. The changes to the parse and render pipeline described above have enabled a long-requested capability: a **continuous view** that stays durable across dataset updates, provided the dataset is eligible.

When enabled, Deneb patches the updated data into the existing Vega view rather than recompiling the specification. This preserves:

- **Current view state** - zoom, pan, facet page, and anything else driven by Vega signals.
- **User input values** - signals bound to form widgets (dropdowns, sliders, etc.) retain whatever the user has selected.
- **Selection state** - marks selected before the update remain selected after it, as long as their datum is still present in the new data.

Eligibility is driven by two things:

- **Row count**. Patching is intended for datasets that are not too large. By default it applies up to **500 rows**, configurable up to a hard ceiling of **5,000 rows** - beyond this point the main thread cannot safely support patching and you would notice severe performance degradation. Beyond either value, Deneb falls back to the standard recompile-and-re-init path.
- **Spec compatibility**. Some spec shapes - for example, force transforms involving aggregates - cannot be patched reliably. In those cases Deneb also falls back to a full recompile and writes a warning to the [Logs pane](visual-editor#logs-pane) so you know why.

The feature is **off by default** while it goes through real-world testing, and can be enabled via the **Enable patching for hosted datasets** option in the _Continuous view_ section of the [Project setup pane](visual-editor#settings-pane). That section will also tell you whether patching is currently _active_ or _inactive_ for your present dataset, so you can see at a glance whether updates are being patched or recompiled.

Refer to [Dataset](dataset#continuous-view-data-patching) for further guidance.

### Canvas Renderer: Scale to Report Zoom

The Vega canvas renderer offers many performance benefits over SVG for rendering large datasets, but it has downsides, such as not scaling with the report's zoom level due to its raster-based nature. This can make the visual appear blurry when the report is zoomed in.

In this release, there is now a **Scale to report zoom level** option when the **Canvas** renderer is selected. This is set to **off** by default:

![canvas-scale-setting.png](../static/img/changelog/2.0.0/canvas-scale-setting.png "When the `Canvas` renderer is selected, a new option appears to allow scaling to the report zoom level. This is turned off by default.")

When enabled, this will use the current report zoom level (or preview zoom level) to calculate the appropriate scaling when rendering your visual. While this will not provide 100% parity with SVG in terms of crispness, it provides significantly improved fidelity of a rendered visual at different zoom levels.

:::warning Why make this switchable at all?
This is currently implemented as a switchable setting, so we can identify any use cases where this may cause issues before we consider making it the default behavior in a future release. If this works well, we will likely enable it by default before general availability, but we want to give authors the option to test it in their reports and provide feedback.
:::

### View and Convert Compiled Vega

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

### $schema: Warning and Quick Fix

If you generate or find a specification elsewhere, it may (for good reasons) have the `$schema` property, which is important for validation of a Vega or Vega-Lite specification.

However, this is an overload in the context of Deneb, because if you try to use a spec with this property in the editor, it will try to resolve the schema from that URL, which will fail, because external requests are not permitted in a certified Power BI Visual. This prevents features such as auto-completion, inline documentation, and validation from working.

For consistency with the language specification, Deneb will manually add the appropriate `$schema` URL when generating an exportable template and ensure that it is stripped out when you import a template through the _Create new specification_ dialog, but doesn't make any decisions around the content you add to the JSON editor. All of this hasn't been documented, so the documentation has been updated to provide better guidance on this behavior.

In this release, there's also a more prominent warning for this occurrence, which can be inspected further on hover, e.g.:

![schema_warning_message.png](../docs/getting-started/img/schema-warning-message.png "A warning message shown inline in the Specification editor for a root-level $schema property, with the Quick Fix action available to remove it.")

If you so wish, clicking the _Quick Fix..._ button will remove the affected `$schema` property from the editor for you.

### Scrollbar Configuration and Placement

Scrollbars on the report canvas and in the editor's preview area have been rebuilt. The visible improvements:

- **No more background bleed on fitted visuals.** The previous scroll container reserved a few pixels of gutter space even when the content fit exactly, causing a strip of the report background to leak along the edge of the visual. The new scrollbars overlay the content and reserve no gutter.
- There is also a new **Scrollbar width** setting in the _Scrollbars_ formatting card (default `10px`, minimum `8px`, maximum `16px`)
- The **Scrollbar radius** maximum has been widened to `8px` (previously `3px`) to complement it.

Refer to the [Scrolling and Overflow](scrolling-overflow#configuring-scrollbar-appearance) page for more details on these settings.

### Report Canvas Keyboard Focus Integration

Power BI custom visuals don't support keyboard focus when tabbing around visuals on the canvas without some additional work. In this release, you'll be able to press [Enter] when the visual has tab focus from the canvas to set focus to the internal portion of the Deneb visual. This will then allow you to tab through any focusable elements in the editor or viewer, and interact with them using the keyboard as expected.

This will also work when using the Editor interface, but you may need to remember that if focus is set to the JSON editor, you'll need to press **[Ctrl + M]** on Windows or **[Ctrl + Shift + M]** on Mac to toggle Tab trapping and allow you to tab around Deneb's UI.

- When viewing a visual, pressing **[Esc]** will return focus to the canvas, allowing you to continue tabbing to the next visual.
- In the editor interface (if focus is outside the Monaco editor), the **[Esc]** key will set focus to Power BI's _Back to report_ action so that you can return to the canvas.

:::warning Vega views are not keyboard-tabbable
Vega and Vega-Lite don't currently surface their rendered marks, axes, or legends as focusable elements, so in view mode, the only things that can receive Tab focus inside the visual are **parameter inputs bound to HTML elements**. Everything else in your specification is reachable only via the mouse pointer and screen reader (if the marks have been set up accordingly).
:::

### Cell Inspection in Debug Pane

The **Data** and **Signals** viewers in the debug pane have been rebuilt around a click-to-inspect model. Previously, long or complex values were truncated with an ellipsis (`...`) and only partially available via a hover tooltip.

Now every cell is inspectable:

- Clicking (or pressing **Enter** / **Space** when focused) opens a read-only Monaco editor with the full value.
- Scalar values open in a compact popover using plain text; objects and arrays open in a larger popover with JSON formatting, syntax highlighting, and code folding.
- For large or complex objects, a shallow copy of the value is displayed, which should be enough to give you an idea of the structure and content without overwhelming the editor or causing performance issues.

  ![A complex value in a table cell, truncated inline and opened in the value inspector.](../docs/getting-started/img/editor-interface-data-pane-object-inspector.png "A complex value in a table cell, truncated inline and opened in the value inspector.")

The viewer tables are also now keyboard-navigable as a grid: **arrow keys** / **Home** / **End** to move, **Enter** / **Space** to inspect, **Escape** to close, **Tab** to leave the grid.

### PBIR and Templating Changes

Many of the above changes introduce considerations for building visuals using [Power BI Enhanced Report Format (PBIR)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?WT.mc_id=DP-MVP-5003712&tabs=v2%2Cdesktop#pbir-format), as well as template construction. Rather than detail this information in each feature, each documentation page has been updated accordingly, but a condensed summary of areas to check and update if you have tooling around this are as follows:

| Feature                                                      | Visual property changes                                                                                                                                                           | Template changes                                                                                                                                                                                                                 |
| ------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Context menu control](#better-context-menu-control)         | New property for context menu control: `objects.interactivity.enableContextMenuSelector`; existing `enableContextMenu` property is re-purposed to toggle context menu visibility. | A new `interactivity.contextMenuSelector` property is available to track whether to use selectors in the context menu. The existing `interactivity.enableContextMenu` property is re-purposed to toggle context menu visibility. |
| [Canvas scaling](#canvas-renderer-report-zoom-level-scaling) | New property for canvas scaling: `objects.stateManagement.scaleToZoom`                                                                                                            | No changes to template structure.                                                                                                                                                                                                |

### Performance and Stability

- The separation of editor-specific assets and functionality, such as Monaco editor initialization and warming up of Vega JSON schemas, has been more tightly gated. This includes less 'locking' of the UI when moving between the viewer and editor states [(#581)](https://github.com/deneb-viz/deneb/issues/581).

- Only the locales [supported by MS](https://learn.microsoft.com/en-us/power-bi/developer/visuals/localization?tabs=English#supported-languages) are now included, which improves the packaged visual size [(#593)](https://github.com/deneb-viz/deneb/issues/593).

  :::warning If your locale is missing, please let us know!
  Whilst your locale may be on the unsupported list, if it previously worked for you with `pbiFormat`, please [create an issue](https://github.com/deneb-viz/deneb/issues/new), and we'll add it back in for you.
  :::

- Internal JSON schema validation dependencies have been normalized, removing duplicated code ([#595](https://github.com/deneb-viz/deneb/issues/595)).

The resulting changes have reduced the package size to **1.75 MB**: a reduction of **4%** vs. 1.9.0 and **19%** vs. 1.7.0.

### Bug Fixes

- The background for the debug pane toolbar and log viewer was incorrectly set to transparent, making them difficult to read in dark mode ([#604](https://github.com/deneb-viz/deneb/issues/604))
- Creating custom `height` and/or `width` signals will break compilation [(#417)](https://github.com/deneb-viz/deneb/issues/417).
- "View mode" viewport not being correctly used when opening visual editor from within a report page group ([#620](https://github.com/deneb-viz/deneb/issues/620)).
