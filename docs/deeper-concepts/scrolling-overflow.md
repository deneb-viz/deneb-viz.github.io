---
id: scrolling-overflow
description: Things to consider when working with large datasets or a large quantity of marks
slug: /scrolling-overflow
title: Scrolling and Overflow
---

# Scrolling and Overflow

By default, Deneb will do its best to fit simple specifications to the visual container. However, there are many scenarios that can and will cause the displayed visual to overflow this container. Such scenarios can include setting the explicit height and/or width of your viewport, working with facets or repeating views, or using an explicit step size for a scale.

## On the Report Canvas

Let's use the step size as an example to demonstrate how this looks. Here, we have too many values on our y-axis, causing our visual to overflow vertically:

![scrolling-simple-overflow](img/scrolling-simple-overflow.png "With a prescribed step size and enough data our visual overflows the Power BI viewport, causing it to display a vertical scroll bar.")

## Configuring Scrollbar Appearance

The **Scrollbars** formatting card in the **Rendered visual** menu in Power BI's formatting pane provides some customization options for the scrollbars:

![scrolling-scrollbar-properties](img/scrolling-scrollbar-properties.png "The Scrollbars formatting card in the Rendered visual menu in Power BI's formatting pane provides some customization options for the scrollbars")

- **Scrollbar color** allows you to tailor the displayed color of the scrollbar.

- **Scrollbar opacity (%)** allows you to tailor the opacity of the scrollbar.

- **Scrollbar radius (px)** allows you to tailor the corder radius of the scrollbar handle.

## In the Visual Editor

When viewing your specification in the Visual Editor's preview area, this is shown relative to the viewport marker (dotted area), so that you can quickly determine the degree of overflow and make any corrections if necessary, e.g.:

![scrolling-editor-overflow-default](img/scrolling-editor-overflow-default.png "The preview area in the Visual Editor will show the full extent of the rendered output")

The preview area will have its own scrollbars as needed, and these also take effect if you zoom the output in to a larger footprint than the available room in the editor.

#### Confirming and Configuring Scrollbar Report Canvas Appearance in the Editor

If you want to see how the visual will appear on the canvas in terms of its scrolling behavior, you can enable the **Show scrollbars on overflow** property in the **Preview area** formatting card in the **Advanced area** property menu:

![scrolling-editor-overflow-property](img/scrolling-editor-overflow-property.png "The Advanced editor > Preview area > Show scrollbars on overflow property allows you to apply the scrollbars (as viewed on the report canvas) to the viewport marker rather than the preview area.")

With this property enabled, Deneb will apply the scrollbars to the viewport marker rather than the preview area, e.g.:

![scrolling-editor-scrollbars-enabled](img/scrolling-editor-scrollbars-enabled.png "The viewport marker with scrollbars applied to it.")

The displayed scrollbars will also use the [appearance configuration](#configuring-scrollbar-appearance) from the **Scrollbars** formatting card, so you can use this option to test this within the editor if so desired.

## Using `pbiContainer` to Track Scrolling Events

Deneb adds a signal named `pbiContainer` to the Vega view, which provides access to information about the visual container in expressions, e.g.:

![pbiContainer-signal.png](/img/changelog/1.7.0/pbiContainer-signal.png "The `pbiContainer` signal provides information about the visual container that can be used in expressions.")

- This is an object with 6 properties:

  - `height` - the height of the visual container.
  - `width` - the width of the visual container.
  - `scrollHeight` - the scrollable height of the container.
  - `scrollWidth` - the scrollable width of the container.
  - `scrollTop` the current vertical scroll position.
  - `scrollLeft` the current horizonal scroll position.

- If the generated visual overflows the preview area and enables scrolling, Deneb will update the `scrollHeight` and `scrollLeft` values as the user scrolls the visible area and re-run the view, meaning that you can assign these values to marks or expressions and they will update.
- Scroll event monitoring has a defult throttle time of **5ms**. This can be changed in the _Rendered visual > Container scroll events > Throttle time_ property:

  ![throttle-time-property.png](/img/changelog/1.7.0/throttle-time-property.png "The `Throttle time` property lets you control how frequently scroll events will update the intenral `pbiContainer` signal with new values.")

  This has a minimum value of **0ms** and a maximum of **1000ms**, and you can use this to tune the performance of scroll event updates as needed.

- To be able to develop using this feature in the Advanced Editor, it's recommended that you enable [Show scrollbars on overflow](#confirming-and-configuring-scrollbar-report-canvas-appearance-in-the-editor), to apply this, otherwise the scroll event is not fired.
- For backwards compatibility purposes, the `pbiContainerHeight` and `pbiContainerWidth` signals that Deneb adds for Vega specifications will remain available, but if you rely on these signals, it's recommended that you move to `pbiContainer.height` and `pbiContainer.width` accordingly, as these values will update on container changes rather than when the specification is parsed.
