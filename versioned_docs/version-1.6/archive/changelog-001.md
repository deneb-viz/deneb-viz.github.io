---
id: changelog-001
description: Deneb Change Log - All changes prior to version 1.0
title: Previous Releases (< 1.0)
---

# Previous Release Change Log (< 1.0)

:::caution Archived Page
This page is an archive of the change log from initial public preview (0.1) to the final preview version before AppSource publication (0.6).
:::

## 0.6.0 (2021-10-11) <a href="#060-2021-10-11" id="060-2021-10-11"></a>

#### **IMPORTANT NOTES**

- In preparation for AppSource submission (hopefully soon) and to leverage modern tooltips, the Power BI visual APIs have been updated to the latest versions. As such, if you're using Power BI Report Server, you will need to be running [September 2021](https://powerbi.microsoft.com/en-us/blog/power-bi-report-server-september-2021-feature-summary/)) or later.
- If you are currently using external URLs in your specifications, these will not be permitted upon submission to AppSource due to certification requirements.
  - This feature is still enabled in 0.6 but may be switched off in future.
  - If and when this happens, we will make a separate version available with the feature enabled.

#### **New Features and Enhancements**

- [Context Menu](../interactivity-context-menu) (#5) and [Cross-Filtering](../interactivity-selection) support (#6) have been added.
  - Due to the flexible nature of Vega/Vega-Lite, and how data point reconciliation works across visuals and to the data model within Power BI, there are some things to take into consideration.
  - Please refer to the appropriate Interactivity Features pages for more specific information.
- [Modern tooltip support](https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-visual-tooltips) has been added. These will display instead of conventional tooltips, if you have them enabled in your report. (#121)
- Loader feature is now correctly disabled, which is intended to ensure that external URLs cannot be accessed for certification purposes. Please refer to **important notes** section above regarding this feature. (#114)
- Tooltip ['redaction' of interactivity reserved words](../interactivity-tooltips#debugging-with-tooltips) (introduced in 0.5/#80) are now recursively applied to deeper-nested objects. (#118)

#### **Bugs Fixed**

- If the dataset contained a date/time column with a `null`/`(blank)` value, this would cause data mapping to fail and result in an empty dataset (#126)
- If the height of the settings pane exceeded the visible window, it would not scroll properly (#122)
- If using the canvas renderer, quickly mousing-out of the visual would leave tooltips visible if they were in the process of being displayed (#16)
- When a template is selected in the _Create New Specification_ dialog, and provider is changed, the selected template is reset but the highlight in the list is incorrect (#3)

#### **Performance and Stability**

- Vega builds have been updated:
  - Vega **5.21.0**
  - Vega-Lite **5.1.1**
- Import issue w/lodash and initial CI for contributed code - many thanks to [@sgratzl](https://github.com/sgratzl)! (#132 & #133)

## 0.5.0 (2021-08-30) <a href="#050-2021-08-30" id="050-2021-08-30"></a>

#### **New Features and Enhancements**

- Common pre-defined pattern fills for SVG renderer. **This is Deneb-specific** and not native to Vega or Vega-Lite specifications, so please read the [Pattern Fills](../pattern-fills) page for further details on how to get started. (#30).
- Visual viewport preservation and "detail work" enhancements (#15). This is covered in more detail in the [Visual Editor](../visual-editor) page, but a short run-down is as follows:

  - Deneb will now record the dimensions of your visual in the report canvas when the advanced editor is opened, and use these dimensions when presenting your visual preview, rather than stretching it to fit available space, e.g.:

    ![0.5-previous-editor-viewport.png](/img/changelog/0.5-previous-editor-viewport.png)

  - The intention of this is to keep the visual scaled as it will be viewed at its current dimensions.
  - Note that **Power BI does not allow visuals to resize themselves dynamically**, so if you wish to change the physical width and/or height of your visual in the report view, you will need to exit the advanced editor, resize and re-open the advanced editor.
  - Additionally, a toolbar is available at the bottom of the preview area, which will allow you to adjust the zoom level of the preview:

    ![0.5-zoom-controls.png](/img/changelog/0.5-zoom-controls.png)

- The top-level `height` and `width` properties can now be applied if necessary, rather than Deneb attempting to resolve them to the visual container (#48).
  - This means that it is now possible to size single view or layered Vega-Lite specifications [by discrete step](https://vega.github.io/vega-lite/docs/size.html#specifying-width-and-height-per-discrete-step).
  - For Vega specifications, two additional signals - `pbiContainerHeight` and `pbiContainerWidth` - are available to use the desired container dimension. These are automatically patched into a Vega spec if the `height` and/or `width` properties are omitted.
- New Specification and Export JSON Template dialogs now use more real-estate (#85).
- Rather than creating a new line for and occurrence of each collection/object, list/array or property, the Repair and Format JSON command will now try to pretty-print JSON more effectively, i.e. only creating line breaks where sensible to do so. (#110)
- Objects in tooltips are now more readable (#80).
  - For example, if using techniques to expose the full tooltip datum, e.g. using `{ "tooltip" { "content": "data" } }` for Vega-Lite, the tooltip handler would expose any nested objects as `[object Object]`.
  - These objects are now converted to a text representation of the object structure: ![0.5-previous-tooltip-object.png](/img/changelog/0.5-previous-tooltip-object.png)
  - Note that the presence of an `__identity__` and/or `__key__` and `identityIndex` properties means that the underlying data point can be reconciled back to Power BI and may help with confirming that a mark will resolve for [interactivity purposes](../interactivity-overview#signaling-back-to-power-bi).
- The **en-GB** locale has been added to the standard Vega (D3) formatter (#111).

#### **Bugs Fixed**

- Keyboard shortcut bindings were being "stacked" each time editor was closed and re-opened (#105).
- Editor font size was not always immediately re-bound after minimizing and restoring the editor pane (#107).

**Performance and Stability**

- Second-stage of service layer re-write (continuing from 0.4). Again, this should result in no visible changes other than those detailed above.
- Dependencies have been audited and replaced with latest/secure versions where possible.

## 0.4.0 (2021-07-26) <a href="#040-2021-07-26" id="040-2021-07-26"></a>

#### **New Features & Enhancements**

- Tooltip resolution has been improved:

  - Default tooltip formatting resolves better against data model (#8).

  ![0.4-default-tooltip-formatting.png](/img/changelog/0.4-default-tooltip-formatting.png)

  - Report page tooltip resolution is more thorough for `transform`s that preserve row context (#37).

  Here's an example of behavior for a series of transforms that produces a _Top N + Others_ dataset. The _Top N_ results ultimately have the same grain as the source data so we can work out the correct selector for the data model. For _Others_, we cannot resolve this, but can display a default tooltip (with better formatting resolution from above):

  ![0.4-context-resolution-tooltip.gif](/img/changelog/0.4-context-resolution-tooltip.gif)

- SVG is now the default render mode for visuals rather than canvas (#68). Please refer to the [Performance Considerations](../performance#selection-of-renderer) page for further details on potential risks and mitigation approaches when it comes to selecting a renderer.
- Editor font size is now available in the properties pane. Refer to the [Visual Editor](../visual-editor#json-editor-font-size) page for further details.
- Editors now track whether they are 'dirty', i.e. you've made changes but not yet applied them (#10).
  - The _Apply_ button will be greyed-out if no changes have been made, or changes revert to the spec currently visible.
  - If exiting back to report view with unapplied changes, you will now get a 'last chance' prompt to apply any pending changes. Please refer to the [Visual Editor](../visual-editor#unapplied-changes) page for more details if required.
  - If changes are discarded after choosing this option, they cannot be recovered.
- Landing and status pages have better contrast and no redundant elements or styling (#40).
- If you're in the JSON editor and wish to navigate out of this with the keyboard (and presuming the operation shortcut keys are not useful), you can now press _\[ Esc ]_ to have Deneb set focus to the tabs above the editor (#25).

#### **Bugs Fixed**

- If you had selected a template file to import and tried to import it again (for instance, after editing it externally and wanting to re-import), this did not work. This has now been resolved (#36).

#### **Performance & Stability**

- Application icons have been optimized and initialization is now much more performant on first run (#77).
- Deneb service layer has been completely re-written as part of ongoing review and optimizations. All being well, this should result in no visible changes for you 🙂
- The packaged visual (.pbiviz) is \~10% smaller (1.35MB > 1.22MB).

## 0.3.0 (2021-05-31) <a href="#030-2021-05-31" id="030-2021-05-31"></a>

#### **New Features & Enhancements**

- Template import and generation added. This is covered more in the [Templates](../templates) page, but high-level features are as follows:
  - When editing a specification, there is now a _Generate JSON Template_ button in the editor.
  - Selecting this presents a dialog that an author can use to customize aspects of the specification, prior to export to (a) provide descriptive detail for anyone wanting to import the template, and (b) make column and measure metadata more suitable for general consumption (particularly if sensitive names are used).
  - The template JSON is made available for you to review and then copy to the clipboard. This can then be saved as a `.json` file for import by yourself or others.
  - Additionally, the _Create New Specification_ dialog has an additional _Import from Template_ tab. Here you can import a valid Deneb template (generated using the above functionality) and allocate columns and measures from your _Values_ data role, in the same way as the built-in examples.
- \[INTERNAL] the data view mapping has been swapped from `table` to `categorical`.
  - This currently results in no net change for end-users, but will potentially allow us more functionality with selectors than the `table` data view mapping offers.
  - One such benefit is that to date, a report page tooltip could only be created and referenced using a column from the dataset; we can now use a single measure if we so want.

#### **Bugs Fixed**

- If overriding the visual `data` within the specification (e.g. when pasting in an example with static data), or adding custom datasets for a particular layer, then Deneb would refuse to render. This has been fixed. (#33)
- Columns or measures added from the data model containing characters that require special handling, now have these characters replaced in the dataset. Refer to the [documentation regarding this](../dataset#special-characters-in-column-and-measure-names) for further details (#38)

## 0.2.0 (2021-03-19) <a href="#020-2021-03-19" id="020-2021-03-19"></a>

#### **New Features & Enhancements**

- Custom formatter added, which if specified, allows creators to use Power BI format strings instead of D3 ones. Refer to [Formatting Values](../formatting) page for details (#13)
- Keyboard shortcuts now available for all portions of the advanced UI; not just when a user is inside the specification or config editor (#23)
- Editor pane toggle has keyboard shortcut - `Ctrl + Alt + Space` (#24)
- Editor tabs now have shortcuts (#2):
  - Specification - `Ctrl + Alt + 1`
  - Config - `Ctrl + Alt + 2`
  - Settings - `Ctrl + Alt + 3`
- Added switchable locale in dev tools, which will assist with debugging formatting and other i18n stuff (#19)

#### **Bugs Fixed**

- Toggling the editor pane lost any changes in-progress. This has been amended to apply changes prior to unmounting the 'expanded' view.
- Vega templates had incorrect reference to `values` named dataset, rather than `dataset`. These have been re-pointed to be correct.

#### **Housekeeping**

- Fixed linting issues with chevron icon in header (#17)
- Renamed anything to do with editor pane sizing to be more appropriate for the current interface logic (#14)

## 0.1.0 (2021-03-15) <a href="#010-2021-03-15" id="010-2021-03-15"></a>

Initial beta release for early access.
