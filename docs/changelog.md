---
id: changelog
description: Deneb Change Log - high-level details of new features and fixes for each version
---

# Change Log

## 1.2.0 (Alpha Channel)

[Refer here for information on how to work with early access builds](/community/early-access).

### Cross-Highlighting Support (#134)

To date, Deneb has only had two supported [interactions](https://docs.microsoft.com/en-us/power-bi/create-reports/service-reports-visual-interactions#change-the-interaction-behavior) from other visuals: **Filter** (default) and **None**.

In this version, we have enabled support for the **Highlight** interaction. Much like [Cross-Filtering](interactivity-selection), it is opt-in - as you will need to ensure that marks have the necessary encodings for orginal vs. highlight values for any active interactions, e.g.:

![Cross-Highlight functionality can now be leveraged, so you can bind encodings for original and highlight values.](/img/changelog/1.2.0/cross-highlight-example.gif "Cross-Highlight functionality can now be leveraged, so you can bind encodings for original and highlight values.")

To see more about how you can get started, please check out the [Cross-Highlighting](interactivity-highlight) page for details. TODO: ~~The **Simple Bar Chart** template for both Vega and Vega-Lite has been updated with a sample binding and encoding (as well as the [Simple Worked Example](simple-example))~~.

:::caution Check Default Interactions
Because this change affects the dataset that the main window sends to a visual, this may make your visuals appear differently that prior to the update if your default interaction is set to **Highlight** (as this is now an option on a Deneb visual when setting interactions). We do try our best to manage this in Deneb if not, but it is recommended that you do this the "Power BI way" and explicitly set interactions to **Filter**.
:::

### Improved Visibility of Vega Versions (#185)

Because Deneb embeds the Vega and Vega-Lite libraries, any new releases are not automatically available to you; these need to be packaged, tested and published via AppSource. As such, there can be a lag between what Deneb supports and any language features in the Vega or Vega-Lite documentation. A good example of this was Vega-Lite 5.2.0 releasing very shortly after Deneb 1.0.0 went live.

To assist with checking compatability of the embedded runtimes vs. their documentation, we previously included the embedded Vega and or Vega-Lite versions on the landing page. However once you began editing your visual, this became hard to (re) discover. To assist with this, the version of the selected language provider is now displayed in the Preview Area toolbar, e.g.:

![The current runtime version is now shown in the Visual Editor toolbar.](/img/changelog/1.2.0/preview-toolbar-vega-version.png "The current runtime version is now shown in the Visual Editor toolbar.")

### Recalculate During Resize (#180)

Due to the dynamic nature of Power BI visual containers, any change to the sizing can trigger an update to a visual's logic and this can cause your visual specification to get re-calculated during the process. This may not be noticeable for visuals that use a small amount of marks, but for those that are more complex, this might create more overhead than you need for something you don't do frequently.

To assist with this, a **Performance Tuning** property menu has been made available, with the option to toggle **Recalculate during resize**. When version 1.2.0 becomes active, the default for this property is **OFF**, which means that Deneb will delay any further calculations until you have finished resizing your visual, e.g.:

![recalculate-during-resize.gif.](/img/changelog/1.2.0/recalculate-during-resize.gif "Our raincloud plot example contains many data points and calculations, which can be computationally expensive if resizing the visual container. By turning off the 'Recalculate during resize' property, you can delay any calculations until you have finished resizing your visual.")

The documentation for this feature has also been added to the [Performance Considerations](performance#recalculate-during-resize) page.

### Other Minor Enhancements

- Deneb will now persist the visual container size, as viewed in the report as of the last change. This means that if Deneb is re-initialized while the Visual Editor is open (e.g. by changing to another visual and back again), then it won't "forget" the size of the visual as viewed normally (#178).

### Bugs Fixed

- Exported templates cannot be re-imported without manual corrections (#198)
- Specification Field Mapping will replace property keys if they match a dataset field name (#190)
- If using `"tooltip": false` against a Vega-Lite mark (instead of omitting the `tooltip` property), an empty tooltip would be displayed (#191)

## 1.1.0 (2022-01-22)

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

  ![Example of version change notification in the Visual Editor pane.](/img/changelog/1.1.0/update-notification.png "Example of version change notification in the Visual Editor pane.")

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

### Known Issues

All current known issues are scheduled to be fixed in version 1.2. Workarounds for each are detailed on its linked GitHub issue.

- Exported templates cannot be re-imported without manual corrections ([#198](https://github.com/deneb-viz/deneb/issues/198))
- Specification Field Mapping will replace property keys if they match a dataset field name ([#190](https://github.com/deneb-viz/deneb/issues/190))

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
