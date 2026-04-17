---
id: performance-considerations
description: Things to consider when working with large datasets or a large quantity of marks
slug: /performance
title: Performance Considerations
---

# Performance Considerations

For the majority of cases, Deneb should perform quite well, but if you're building a behemoth visual with lots of data, then you may need to think about the resulting output and the demand this can potentially create on a client machine - either while you're building a visual, or when your end users are consuming it.

Please bear in mind that while care has been taken so far to make things work nicely, we will make a concerted effort to improve the interface's performance as we iterate.

The following page offers recommendations for maintaining optimal performance.

## Selection of Renderer

You can specify the renderer to use [in the Settings panel of the Visual Editor](visual-editor#settings-pane).

**SVG** is the default, which renders your specification using vector graphics. You can also select **Canvas**, which uses pixel graphics.

- SVG is typically used for the lion's share of simple data visualizations and typically produces "clearer" output that scales well at a variety of sizes.

- However, much like adding multiple visuals to a report page in Power BI can have an impact on performance, using SVG with a lot of data can have similar detrimental effects on performance.

- If you want to use SVG and you're working with a lot of data, consider if you can use elements that consolidate many data points into a single item on-screen, such as a `line` rather than a `point`, as this helps reduce the number of moving parts. Other techniques, such as binning or aggregation, can also help keep mark count down.

- If you can't get around needing a lot of marks on screen, then Canvas is likely to be a better option, as it is optimized for this kind of scenario. However, bear in mind that Canvas does not scale as well as SVG and can look blurry at larger sizes.

For more details on Canvas vs. SVG, [there's a great article here at CSS-Tricks](https://css-tricks.com/when-to-use-svg-vs-when-to-use-canvas) that consolidates a lot of useful info and summarizes a number of pros and cons.

## Applying Changes as You Type vs. Manually

The Visual Editor has the ability to [apply changes to your output as you type them](visual-editor#auto-apply-changes-as-you-type-ctrl--shift--enter). Whilst this is pretty cool, it can really slow things down if you're making many changes to a particularly ambitious specification in a short space of time, as each change requires Vega or Vega-Lite to re-parse and render the output.

We already use some techniques to minimize unnecessary chatter if this option is enabled, such as [debouncing text input](https://css-tricks.com/debouncing-throttling-explained-examples/), but it's still recommended that you apply your changes manually when ready, if editing a complex or data-intensive specification.

## Include only Necessary Columns and Measures

Any data that you add to the visual will have performance implications, specifically:

- The DAX query required by Power BI to generate the dataset for Deneb.

- The amount of resources needed by Deneb to process the dataset and for Vega or Vega-Lite to render the resulting output as per your specification.

- Creating a row context with lower granularity than you actually need, which can make producing the desired output more challenging.

Therefore, only add the columns and measures (and filter context) that your visual needs to communicate its message.
