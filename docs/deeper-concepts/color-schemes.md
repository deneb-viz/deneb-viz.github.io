---
id: schemes
description: TODO
slug: /schemes
title: Color Schemes
---

Deneb offers four custom [Vega Color schemes](https://vega.github.io/vega/docs/schemes/) that are tied to the current report theme and will update at run-time. This allows you to keep your visual's color scheme in-sync with your report, if you so wish.

## Usage

The schemes can be used wherever you might reference a color scheme in a Vega or Vega-Lite scale, e.g.:

```json title=Vega-Lite
{
  ...
  "encoding": {
    "color": {
      "field": "City",
      "legend": null,
      "scale": {"scheme": "pbiColorNominal"}
    }
  }
  ...
}
```

```json title=Vega
{
  ...
  "scales": [
    {
      "name": "color",
      "type": "ordinal",
      "domain": {
        "data": "dataset",
        "field": "City",
        "sort": true
      },
      "range": {
        "scheme": "pbiColorOrdinal"
      }
    }
  ],
  ...
}
```

## Available Schemes

### `pbiColorNominal`

The `pbiColorNominal` scheme is intended to be used for nominal/categorical discrete categories, and matches the current Power BI theme colors, e.g.:

![Example of standard theme colors from the Power BI's Customize theme dialog.](./img/report-theme-colors.png "Example of standard theme colors from the Power BI's Customize theme dialog.")

![Example of applying the pbiColorNominal scheme in a specification.](./img/nominal-scheme-example.png "Example of applying the pbiColorNominal scheme in a specification.")

### `pbiColorOrdinal`

The `pbiColorNominal` scheme can be used for ordinal categories, and uses a ramped scale from the Min divergent Color to the Max divergent color from the current Power BI theme (excluding Middle color), e.g.:

![Example of divergent theme colors from the Power BI's Customize theme dialog.](./img/report-theme-divergent-colors.png "Example of divergent theme colors from the Power BI's Customize theme dialog.")

![Example of applying the pbiColorOrdinal scheme in a specification.](./img/ordinal-scheme-example.png "Example of applying the pbiColorOrdinal scheme in a specification.")

:::caution Ordinal Scheme has Limited Discrete Colors
The total number of colors to allocate to the ordinal palette is a fixed number. This is **10** by default.

When this limit is reached, the palette 'wraps' back around, which might not be ideal. Similarly, if you don't have enough discrete values, then you may not see an adequate gradient. We have ways of assisting you with this - refer to the [Discrete Ordinal Colors](#discrete-ordinal-colors) section below for more details.
:::

### `pbiColorLinear`

The `pbiColorLinear` scheme will produce an interpolated gradient from the Min divergent Color to the Max divergent color from the current Power BI theme (excluding Middle color), e.g.:

![Example of applying the pbiColorLinear scheme in a specification.](./img/linear-scheme-example.png "Example of applying the pbiColorLinear scheme in a specification.")

### `pbiColorDivergent`

The `pbiColorDivergent` scheme will produce an interpolated gradient from the Min divergent Color to the Max divergent color from the current Power BI theme (including Middle color), e.g.:

![Example of applying the pbiColorDivergent scheme in a specification.](./img/divergent-scheme-example.png "Example of applying the pbiColorDivergent scheme in a specification.")

### Discrete Ordinal Colors

As mentioned higher-up, we only have a limited number of colors in an ordinal palette as they are manually specified values, rather than a linear ramp. We could potentially see issues like the following examples if we don't get this right. The functionality to mitigate these issues follows on afterwards.

#### Issue #1: Not Enough Discrete Colors = "Wrapping"

If we were to allocate, say, 5 discrete colors to our palette but had more values than this, we get a "Wrapping" effect, e.g.:

![An ordinal palette with less discrete colors that there are values of an ordinal variable can produce a 'color wrapping' effect, where after the last value has been reached, the next mark will start from the first value.](./img/ordinal-scheme-wrapping-effect.png "An ordinal palette with less discrete colors that there are values of an ordinal variable can produce a 'color wrapping' effect, where after the last value has been reached, the next mark will start from the first value.")

#### Issue #2: Not Enough Discrete Values = Indistinct Gradient

If we try to mitigate this by guessing a hypothetical number of colors - say, 50 - then we perhaps don't get desired results at a lower cardinality than that, e.g.:

![Providing too may colors in an ordinal palette can mean that lower cardinality series do not have enough distinction between them, as all assigned colors are at the lower end of this spectrum.](./img/ordinal-scheme-inadequate-gradient.png "Providing too may colors in an ordinal palette can mean that lower cardinality series do not have enough distinction between them, as all assigned colors are at the lower end of this spectrum.")

#### Managing via Properties

The **Report Theme Integration** menu in the Power BI Format pane allows you to configure the number of values using the **Discrete Ordinal Colors** property, e.g.:

![The 'Discrete Ordinal Colors' property in the Power BI format pane allows us to specify the number of values to use when computing the intervening colors.](./img/discrete-ordinal-property-static.png "The 'Discrete Ordinal Colors' property in the Power BI format pane allows us to specify the number of values to use when computing the intervening colors.")

As you may not know what this number is going to be, the property supports [Conditional Formatting](https://docs.microsoft.com/en-us/power-bi/visuals/service-tips-and-tricks-for-color-formatting?WT.mc_id=DP-MVP-5003712#conditional-formatting-for-visualizations), so that you could bind a measure that could count the number of distinct category values. This would then allow dynamic assignment (and calculation) of the intervening colors, e.g.:

![The 'Discrete Ordinal Colors' property also supports Conditional Formatting, so the number of discrete colors can be supplied via a measure.](./img/ordinal-scheme-conditional-formatting.gif "The 'Discrete Ordinal Colors' property also supports Conditional Formatting, so the number of discrete colors can be supplied via a measure.")
