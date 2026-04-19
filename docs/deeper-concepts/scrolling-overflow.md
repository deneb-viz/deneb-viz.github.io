---
id: scrolling-overflow
description: Understanding how Deneb handles visual overflow and scrollbar configuration
slug: /scrolling-overflow
title: Scrolling and Overflow
---

# Scrolling and Overflow

By default, Deneb will do its best to fit simple specifications to the visual container. However, many scenarios can and will cause the displayed visual to overflow this container. Such scenarios can include setting the explicit height and/or width of your viewport, working with facets or repeating views, or using an explicit step size for a scale.

## On the Report Canvas

Let's use the step size as an example to demonstrate how this looks. Here, we have too many values on our y-axis, causing our visual to overflow vertically:

![scrolling-simple-overflow](img/scrolling-simple-overflow.png "With a prescribed step size and enough data our visual overflows the Power BI viewport, causing it to display a vertical scroll bar.")

## Configuring Scrollbar Appearance

The **Scrollbars** formatting card in the **Rendered visual** menu in Power BI's formatting pane provides some customization options for the scrollbars:

![scrolling-scrollbar-properties](img/scrolling-scrollbar-properties.png "The Scrollbars formatting card in the Rendered visual menu in Power BI's formatting pane provides some customization options for the scrollbars")

- **Scrollbar color** allows you to tailor the displayed color of the scrollbar.

- **Scrollbar opacity (%)** allows you to tailor the opacity of the scrollbar.

- **Scrollbar radius (px)** allows you to tailor the border radius of the scrollbar handle.

## In the Visual Editor

When viewing your specification in the Visual Editor's preview area, this is shown relative to the viewport marker (dotted area), so that you can quickly determine the degree of overflow and make any corrections if necessary:

![scrolling-editor-overflow-default](img/scrolling-editor-overflow-default.png "The preview area in the Visual Editor will show the full extent of the rendered output")

The preview area will have its own scrollbars as needed, and they also take effect when you zoom the output to a larger footprint than the available space in the editor.

### Confirming and Configuring Scrollbar Report Canvas Appearance in the Editor

If you want to see how the visual will appear on the canvas in terms of its scrolling behavior, you can enable the **Show scrollbars on overflow** property in the **Preview area** formatting card in the **Advanced area** property menu:

![scrolling-editor-overflow-property](img/scrolling-editor-overflow-property.png "The Advanced editor > Preview area > Show scrollbars on overflow property allows you to apply the scrollbars (as viewed on the report canvas) to the viewport the marker rather than the preview area.")

With this property enabled, Deneb will apply the scrollbars to the viewport marker rather than the preview area:

![scrolling-editor-scrollbars-enabled](img/scrolling-editor-scrollbars-enabled.png "The viewport marker with scrollbars applied to it.")

The displayed scrollbars will also use the [appearance configuration](#configuring-scrollbar-appearance) from the **Scrollbars** formatting card, so you can use this option to test this within the editor if so desired.

## Using `denebContainer` to Track Scrolling Events

Deneb adds a signal named `denebContainer` to the Vega view, which provides access to information about the visual container in expressions:

![denebContainer-signal.png](img/denebContainer-signal.png "The `denebContainer` signal provides information about the visual container that can be used in expressions.")

- This is an object with 6 properties:
  - `height` - the height of the visual container.
  - `width` - the width of the visual container.
  - `scrollHeight` - the scrollable height of the container.
  - `scrollWidth` - the scrollable width of the container.
  - `scrollTop` - the current vertical scroll position.
  - `scrollLeft` - the current horizontal scroll position.

- If the generated visual overflows the preview area and enables scrolling, Deneb will update the `scrollTop` and `scrollLeft` values as the user scrolls the visible area and re-run the view, meaning that you can assign these values to marks or expressions and they will update.
- Scroll event monitoring has a default throttle time of **5ms**. This can be changed in the _Rendered visual > Container scroll events > Throttle time_ property:

  ![throttle-time-property.png](/img/changelog/1.7.0/throttle-time-property.png "The `Throttle time` property lets you control how frequently scroll events will update the internal `denebContainer` signal with new values.")

  This has a minimum value of **0ms** and a maximum of **1000ms**; you can use it to tune scroll event update performance as needed.

- To be able to develop using this feature in the Advanced Editor, it's recommended that you enable [Show scrollbars on overflow](#confirming-and-configuring-scrollbar-report-canvas-appearance-in-the-editor), to apply this, otherwise the scroll event is not fired.

:::tip Migration from legacy signal names
If your specification uses the legacy `pbiContainer`, `pbiContainerHeight`, or `pbiContainerWidth` signal names, Deneb will automatically re-map these when your spec is parsed. However, it is recommended that you update to `denebContainer`, `denebContainer.height`, and `denebContainer.width` respectively at the earliest opportunity. Refer to the [2.0 changelog](changelog#internal-signal-changes) for full details.
:::
