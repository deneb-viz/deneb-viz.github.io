---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

:::caution Potential Upcoming "Breaking" Changes
We are intending to implement cross-highlight support in an upcoming release (likely 1.2 or 1.3). Deneb will currently always apply the **filter** interaction by default (unless you have specified differently in your report configuration).

Much like [Cross-Filtering](interactivity-selection), Cross-Highlight will be opt-in from a specification perspective. However, if you don't have your [interactions set to cross-filter](https://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions#change-the-interaction-behavior), Power BI will try to apply the **highlight** interaction and this will make your visual appear to do nothing when filtered by other visuals.

When this functionality is delivered, it is recommended that you ensure any Deneb visuals are explicitly set to **filter** or **no impact** accordingly.
:::

## 1.1.0 (Alpha & Beta Channels)

### Report Theme Integration (#124)

Provided via [Vega Color Schemes](https://vega.github.io/vega/docs/schemes/).

- When encoding a `scale`, there are 4 schemes available for inclusion that will bind to the current report theme at run time.
- If you change any colors in your report theme matching these schemes, then the specification will update to match.
- This is documented in more detail on the [Color Schemes](schemes) page.

![If using the new schemes when encoding a color scale, these will live-bind to the currently selected report theme.](/img/changelog/1.1.0/theme-changes.gif "If using the new schemes when encoding a color scale, these will live-bind to the currently selected report theme.")

### Specification Field Mapping (#160)

- This provides means to re-map any columns or measures that have been bound to encodings or expressions.
- If a field is removed from the **Values** data role, the dialog will also be displayed, in order to provide a more convenient way to add and re-assign a field without having to hunt it down manually.
- This is documented in more detail on the [Dataset](dataset#edit-specification-field-mapping) page.

  ![Example of the Edit Specification Field Mapping dialog, which allows you to change the allocation of any fields from the dataset that are used in encodings or expressions within your specification.](/img/changelog/1.1.0/edit-mapping.png "Example of the Edit Specification Field Mapping dialog, which allows you to change the allocation of any fields from the dataset that are used in encodings or expressions within your specification.")

### Template Changes

- Placeholders have been changed to a more compact layout, making better use of available space (#156)
- If a template's `usermeta.information.previewImageBase64PNG` property is populated with a valid base64 representation, this will now be rendered in the **Create New Specification** dialog (#159)
- Packaged templates now include preview images (#159)
- Column/measure restrictions have been removed from placeholders (#157)

  ![Example of template changes in 1.1.0.](/img/changelog/1.1.0/template-changes.png "Example of template changes in 1.1.0.")

### Editor Properties

Available in the Power BI Format pane.

- Visual Editor [**Word Wrap** property](visual-editor#word-wrap) added (#154)
- Visual Editor [**Line Gutter** and **Line Numbers** properties](visual-editor#line-gutter--line-numbers) added (#155)

### Other Minor Enhancements

- The keyboard shortcut for the Generate JSON Template was failing on some Windows environments, so this has been re-mapped to **Ctrl + Alt + T** (#153)
- Visual scrollbars have been updated to be less intrusive (#164)
- The font named as **DIN** in core visuals can be accessed by specifying `wf_standard-font` wherever you're able to specify the font family (#151)
- To help with understanding when new versions have gone live in your reports, Deneb will display a notification in the Visual Editor pane if you edit an existing visual created with a prior version (#179), e.g.:

  ![Example of template changes in 1.1.0.](/img/changelog/1.1.0/update-notification.png "Example of template changes in 1.1.0.")

  Manually dismissing the notification or applying changes to the current specification will prevent this appearing until the next update.

### Performance and Stability

- Vega-Lite has been upgraded to **5.2.0** (#158)

  - You can read about the changes in the [Vega-Lite release notes](https://github.com/vega/vega-lite/releases/tag/v5.2.0).
  - A Vega-Lite **Grouped Bar Chart** template has also been added to Deneb to help illustrate usage of the `xOffset` / `yOffset` encoding changes.

- Dataset field references in expressions are re-coded for template generation (#139)

  - When generating a JSON template, or re-mapping fields, any expression using a `datum.Field` reference will be Automatically re-coded to use `datum['Field']` syntax.
  - This is to ensure that replacing (or tokenizing) fields can support changes for fields that contain whitespace.

- The Vega-Lite **Simple Bar Chart** template `opacity` encoding has been improved (#152)

  - This includes an explicit value for the `opacity` encoding if a datum's `__selected__` value is not `"off"`.
  - This is to preserve logic if a creator changes the view composition to something more complex than a single mark.

- The mechanism for handling interactivity events outside the main plot required unorthodox (and potentially expensive) manipulation of the Vega DOM each time the visual updates. This has been revised to work with the standard DOM (#181)

- The Redux store has been replaced with [Zustand](https://github.com/pmndrs/zustand), and refactored (#147)

## 1.0.0 (2021-11-13)

### IMPORTANT NOTES

- This is the promotion of the preview codebase into [the official AppSource release](https://appsource.microsoft.com/en-us/product/power-bi-visuals/coacervolimited1596856650797.deneb) 🎉🎉🎉🎉
- Fetching via remote URLs (e.g. for image marks) has been disabled to comply with Power BI certification requirements. This can be mitigated by [downloading the standalone build](getting-started#standalone-version).
- There a no major changes in this release; just those that help with QA.

### Bugs Fixed

- Swapping editor position causes editor UI to crash (#137)

### Performance and Stability

- Improved target area of whitespace for clearing an active selection (#140)
- Visual rendering events synced-up with Vega View API (#141)

## Older Versions

To keep the change log (reasonably) tidy, the details of older versions get archived from time to time. Each archive can be found as a sub-page of this section (and you can follow the navigation below to continue reading).
