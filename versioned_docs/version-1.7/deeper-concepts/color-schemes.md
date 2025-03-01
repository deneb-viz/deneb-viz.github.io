---
id: schemes
description: Using custom Vega schemes in Deneb to bind to the Power BI report theme, as well as accessing Power BI report theme colors in-general.
slug: /schemes
title: Theme Colors and Schemes
---

Deneb provides some means to bind to your report's current theme, in the form of:

- Expression-based access using a custom function
- Custom [Vega Color schemes](https://vega.github.io/vega/docs/schemes/)

This functionality will dynamically reference the theme are run-time, meaning that if you change your colors, Deneb will keep these references in-sync.

## Expression-Based Access Using `pbiColor`

Deneb provides a custom function, named `pbiColor` that you can use in [Vega or Vega-Lite expressions](https://vega.github.io/vega/docs/expressions/):

```
pbiColor(index|name, shadePercent = 0)
```

- The first parameter (`index` or `name`) provides access to the associated theme color:

  - `index` is a [zero-based](https://en.wikipedia.org/wiki/Zero-based_numbering) reference to the Power BI theme palette. This means that:

    - `0` = Theme color 1
    - `1` = Theme color 2
    - `2` = Theme color 3
    - ...and so on

  - `name` is a string value (surrounded by single quotes) that specifies a named color from the theme configuration. Valid names are:

    - `min` / `middle` / `max` for divergent colors.
    - `negative` / `neutral` / `positive` for sentiment colors.
    - Power BI also exposes `bad` and `good` for sentiment colors, which can also be used instead of `negative` or `positive`, should you prefer to use these instead.

    ![Valid color names for the `pbiColor` expression function (as detailed above).](img/pbiColor-named.png "Valid color names for the `pbiColor` expression function (as detailed above).")

- `shadePercent` is optional, and is a decimal value between `-1` (-100%) and `1` (100%).

  - If supplied, this will darken (< 0) or lighten (> 0) the color by the specified amount.
  - This is to provide variants of the theme colors, much like how Power BI does in its color picker.

For example, to specify a `bar` mark's `color` to use Theme color 1, you could use the following in your mark's properties:

```json
{
  ...
  "mark": {
    ...
    "color": {
      "expr": "pbiColor(0)"
    }
  }
}
```

Assuming that you are using the standard theme, output should look like the following for the theme's first two colors (`#118DFF` and `#12239E`):

![The pbiColor function allows you to access individual theme colors using a zero-based index.](img/pbiColor-simple-grid.png "The pbiColor function allows you to access individual theme colors using a zero-based index.")

## Power BI Schemes

The schemes can be used wherever you might reference a color scheme in a Vega or Vega-Lite scale, e.g.:

```json title=Vega-Lite showLineNumbers
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

```json title=Vega showLineNumbers
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

The available schemes are detailed further below.

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
