---
id: pbir-guide
description: Creating Deneb visuals in PBIR
slug: /pbir-guide
title: Guidance for creating and updating Deneb visuals in Power BI Enhanced Report Format (PBIR) workbooks
---

:::warning
This guide is valid for Deneb 1.9 and above. This _should_ work with earlier versions, but you may need to manually step through some onboarding operations in the UI for new visuals.
:::

With [Power BI Enhanced Report Format (PBIR)](https://learn.microsoft.com/en-us/power-bi/developer/projects/projects-report?WT.mc_id=DP-MVP-5003712&tabs=v2%2Cdesktop#pbir-format) becoming the default for Power BI reports, this page provides guidance on how you may wish to understand what is needed to make Deneb features work, if you are manually editing or programmatically generating Deneb visuals, or if you are using an LLM or other tool to help generate report content (or if you are an LLM reading this page for guidance).

:::tip
In addition to PBIR, the detail on this page may also help understand Deneb's internal structure better, for use with building [report themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes??WT.mc_id=DP-MVP-5003712) containing Deneb visuals.
:::

## The Short Version

It's advisable to read the full guide below, but if you just want the quick reference for the minimum properties needed to create a working Deneb visual in PBIR, here they are:

### Minimal Deneb Visual Definition

In a `visual.json` file for a visual instance:

| Path                                           | Value                                                    |
| ---------------------------------------------- | -------------------------------------------------------- |
| `visual.visualType`                            | `"deneb7E15AEF80B9E4D4F8E12924291ECE89A"`                |
| `visual.objects.vega[0].properties.jsonSpec`   | Your stringified Vega/Vega-Lite spec, surrounded by `''` |
| `visual.objects.vega[0].properties.jsonConfig` | `"'{}'"`                                                 |

### Validating Your PBIR Configuration

Before loading your report:

1. Ensure all JSON strings are properly escaped.
2. Verify integer values end with `D` suffix.
3. Confirm text values are wrapped in single quotes within the `Value` field.
4. Confirm boolean values are set to `true` or `false` as literals.

Refer to the [Property Implementation Guide](#property-implementation-guide) section below for more details on these types.

## Visual GUID

All Power BI visuals have a unique identifier (GUID) that is used to identify the visual type. For the AppSource (certified) version of Deneb, this GUID is:

`deneb7E15AEF80B9E4D4F8E12924291ECE89A`

The GUID is also used by Power BI to determine where to look for visual updates. If the GUID Matches a published visual in AppSource, Power BI will attempt to update the visual when a new version is available. Also, if using PBIR/PBIP, this ensures that the visual code does not need to be included in the PBIP assets, as Power BI can retrieve it from AppSource directly and therefore does not need to be source controlled.

#### Other Visual Editions

If you're using the other editions of Deneb, the GUIDs are as follows:

- Standalone: `STANDALONEdeneb7E15AEF80B9E4D4F8E12924291ECE89A`
- Alpha Channel: `ALPHAdeneb7E15AEF80B9E4D4F8E12924291ECE89A`
- Beta Channel: `BETAdeneb7E15AEF80B9E4D4F8E12924291ECE89A`

These editions are not tied to AppSource and will have additional setup required, as the .pbiviz code will need to be included in the PBIP assets for these editions to work correctly.

Much like the legacy .pbix format for Power BI workbooks, .pbiviz files are compressed folders that can be opened with a tool like 7-Zip to extract the contents for inspection. Extracting the .pbiviz into `/CustomVisuals/{GUID}/` will provide the necessary structure to include the visual in PBIR/PBIP.

## Understanding Visual Capabilities

Visual [capabilities](https://learn.microsoft.com/en-us/power-bi/developer/visuals/capabilities?WT.mc_id=DP-MVP-5003712) are special metadata that are effectively a visual's "contract" with Power BI, including what data roles it supports (and how it gets organized), formatting options, and interactivity features. In PBIR, these capabilities are defined in a JSON format and are one of the first touchpoints Power BI uses when a visual is added to a report to determine how it should integrate with the report environment.

When you add a visual to a report and start configuring it, information persisted into the JSON for that visual instance will include things that tie to this capabilities definition, allowing the visual to be re-generated from persisted state whenever you re-open the page (or report).

It can be easy to assume that these work in a particular way, but it is important to realize that (particularly in the case of persisted properties), visuals often have logic to act upon these values as part of their internal operation. So, it can therefore be assumed how they work but this document serves to provide you with details of what properties are set and how they affect your generated Deneb visuals so that you can understand how to work with them rather than guess at what they do (and possibly do the wrong things in some cases).

## Dissecting The Simplest Scenario: A Manually Added Deneb Visual

To try and get an understanding of the structure, let's have a look at what happens when we add a Deneb visual to a report canvas, without adding data or configuring anything. The base definition may look like this:

```json title="Visual added manually to report, with no additional configuration or data"
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.4.0/schema.json",
  "name": "2c2722561a0b6c3deded",
  "position": {
    "x": 80,
    "y": 56,
    "z": 0,
    "height": 280,
    "width": 280,
    "tabOrder": 0
  },
  "visual": {
    "visualType": "deneb7E15AEF80B9E4D4F8E12924291ECE89A",
    "objects": {
      "stateManagement": [
        {
          "properties": {
            "viewportHeight": {
              "expr": {
                "Literal": {
                  "Value": "270D"
                }
              }
            },
            "viewportWidth": {
              "expr": {
                "Literal": {
                  "Value": "270D"
                }
              }
            }
          }
        }
      ]
    },
    "drillFilterOtherVisuals": true
  }
}
```

The `visual.objects` section is where Deneb persists its configuration settings.

We can already see that there is information under `visual.objects.stateManagement`. These are internal settings that deneb generates every time the visual receives updated information from Power BI, such as when the visual is resized or data changes, and is needed to ensure that when we open the editor, the visual preview matches the dimensions of the visual in the report. **It is therefore not something you need to set manually**, as Deneb will manage this for you.

### Equivalent Minimal Definition

Therefore, if you were to add your own visual to the report using PBIR, the example below is functionally equivalent to the above:

```json title="Minimal Deneb visual definition for PBIR"
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.4.0/schema.json",
  "name": "2c2722561a0b6c3deded",
  "position": {
    "x": 80,
    "y": 56,
    "z": 0,
    "height": 280,
    "width": 280,
    "tabOrder": 0
  },
  "visual": {
    "visualType": "deneb7E15AEF80B9E4D4F8E12924291ECE89A",
    "drillFilterOtherVisuals": true
  }
}
```

This will display a Deneb visual on the report canvas and will show the landing page, as there is no active project.

## Adding Data to the Visual

So now, I want to add some data to my visual. In this case, I am going to add a simple table with the `Product` column from my **Product** Table, and the `$ Sales` measure from my **Financials** Table. After adding these fields to the visual, the definition now looks like this:

```json title="Deneb visual definition with data roles mapped"
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.4.0/schema.json",
  "name": "2c2722561a0b6c3deded",
  "position": {
    /* same as previous example */
  },
  "visual": {
    "visualType": "deneb7E15AEF80B9E4D4F8E12924291ECE89A",
    "query": {
      "queryState": {
        "dataset": {
          "projections": [
            {
              "field": {
                "Column": {
                  "Expression": {
                    "SourceRef": {
                      "Entity": "Product"
                    }
                  },
                  "Property": "Product"
                }
              },
              "queryRef": "Product.Product",
              "nativeQueryRef": "Product"
            },
            {
              "field": {
                "Measure": {
                  "Expression": {
                    "SourceRef": {
                      "Entity": "Financials"
                    }
                  },
                  "Property": "$ Sales"
                }
              },
              "queryRef": "Financials.$ Sales",
              "nativeQueryRef": "$ Sales"
            }
          ]
        }
      },
      "sortDefinition": {
        "sort": [
          {
            "field": {
              "Column": {
                "Expression": {
                  "SourceRef": {
                    "Entity": "Product"
                  }
                },
                "Property": "Product"
              }
            },
            "direction": "Ascending"
          }
        ],
        "isDefaultSort": true
      }
    },
    "drillFilterOtherVisuals": true
  }
}
```

This is standard stuff for any visual under PBIR, so let's choose to focus on the bits that are important for Deneb.

- `visual.query.queryState.dataset` represents any columns or measures added to the visual's **Values** data role. This is known internally in the visual capabilities as `dataset`, matching how Deneb maps and assigns this data into your specification.

- Fields in the `dataset` are created and referenced to the display name of the field in the well. If you don't rename this, it will match the column or measure name as defined in the data model. Otherwise there will be a `displayName` property present in the metadata for the field. For example, if I rename `$ Sales` to `Total Sales` in the visual well, the field definition will now include this:

  ```json
  {
    "field": {
      "Measure": {
        "Expression": {
          "SourceRef": {
            "Entity": "Financials"
          }
        },
        "Property": "$ Sales"
      }
    },
    "queryRef": "Financials.$ Sales",
    "nativeQueryRef": "$ Sales",
    "displayName": "Total Sales" // <-- This will be used by Deneb when building the dataset, if present
  }
  ```

- In addition to this above consideration, Deneb will also [sanitize field names](dataset#special-characters-in-column-and-measure-names) if they include characters that are not valid in [Vega](https://vega.github.io/vega/docs/types/#Field) or [Vega-Lite](https://vega.github.io/vega-lite/docs/field.html) specifications. While this is not important for this step, it is important when building a specification that references these fields, so please refer to the linked documentation for more details.

## Creating A Bare Minimum Specification

Let's say I have this simple specification that creates a simple bar chart with Vega-Lite:

```json title="Simple Vega-Lite bar chart specification"
{
  "data": {
    "name": "dataset"
  },
  "mark": {
    "type": "bar"
  },
  "encoding": {
    "y": {
      "field": "Product",
      "type": "nominal"
    },
    "x": {
      "field": "$ Sales",
      "type": "quantitative"
    }
  }
}
```

Due to how Power BI's property system works, the JSON for the specification and configuration will be serialized and escaped ("[stringified](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)") before being stored in the visual's properties. As our visual has an empty config (`{}`), the property storage should be prepared as follows:

```json title="Deneb visual definition with specification added"
{
  "$schema": "https://developer.microsoft.com/json-schemas/fabric/item/report/definition/visualContainer/2.4.0/schema.json",
  "name": "2c2722561a0b6c3deded",
  "position": {
    /* same as previous example */
  },
  "visual": {
    "visualType": "deneb7E15AEF80B9E4D4F8E12924291ECE89A",
    "query": {
      /* same as previous example */
    },
    "objects": {
      "vega": [
        {
          "properties": {
            "jsonSpec": {
              "expr": {
                "Literal": {
                  "Value": "'{\n  \"data\": {\n    \"name\": \"dataset\"\n  },\n  \"mark\": {\n    \"type\": \"bar\"\n  },\n  \"encoding\": {\n    \"y\": {\n      \"field\": \"Product\",\n      \"type\": \"nominal\"\n    },\n    \"x\": {\n      \"field\": \"$ Sales\",\n      \"type\": \"quantitative\"\n    }\n  }\n}'"
                }
              }
            },
            "jsonConfig": {
              "expr": {
                "Literal": {
                  "Value": "'{}'"
                }
              }
            }
          }
        }
      ]
    },
    "drillFilterOtherVisuals": true
  }
}
```

Our specification and configuration are now stored under `visual.objects.vega` in the properties `jsonSpec` and `jsonConfig` respectively. These will be deserialized and parsed by Deneb when the visual is loaded in Power BI, and the visual will render as expected. So as long as your JSON string is valid (and this can contain comments, as Deneb will parse using JSONC), then Deneb will be able to work with it.

Deneb's default provider configuration is Vega-Lite, so we only need to provide the specification itself and the logic will work as expected. We will provide a reference for each `objects` section further below, to help you understand how to assemble more complex configurations based on your needs.

If we open our workbook with this configuration, we will see our simple bar chart rendered as expected, e.g.:

![A simple Deneb bar chart visual rendered in Power BI, showing sales by product.](./img/pbir-simple-bar-chart.png "A simple Deneb bar chart visual rendered in Power BI, showing sales by product, created via PBIR.")

## Properties Reference

The following sections provide a reference for each of the `objects` sections that Deneb uses to persist configuration and state. Where possible we'll provide as much detail as possible as to what each property does, and how it affects the visual's operation.

:::note
Some of these properties are used for advanced editor configuration and therefore may not be relevant if you are only generating visuals for consumption, but may help with creating [report themes](https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-report-themes??WT.mc_id=DP-MVP-5003712) and understanding what setting their defaults may do for you and your users.
:::

### `objects.vega`

Properties in this groups are concerned with the specification and configuration for the Vega or Vega-Lite runtime within a Deneb visual instance.

| Property                 | Default Value (if Omitted) | Type                 | Remarks                                                                                                                                                                                                                                                                                                                                                                              |
| ------------------------ | -------------------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `jsonSpec`               | `'{}'`                     | [text](#text)        | The Vega or Vega-Lite specification, which is JSON (or JSONC) turned into a string representation.                                                                                                                                                                                                                                                                                   |
| `jsonConfig`             | `'{}'`                     | [text](#text)        | The Deneb configuration object, which is JSON (or JSONC) turned into a string representation.                                                                                                                                                                                                                                                                                        |
| `provider`               | `'vegaLite'`               | [text](#text) (enum) | The provider to use when parsing a specification. Either `vega` or `vegaLite`.                                                                                                                                                                                                                                                                                                       |
| `renderMode`             | `'svg'`                    | [text](#text) (enum) | The rendering mode to use. Either `canvas` or `svg`.                                                                                                                                                                                                                                                                                                                                 |
| `logLevel`               | `3D` (vega.Info)           | [integer](#integer)  | The [logging verbosity level](https://github.com/vega/vega-util?tab=readme-ov-file#logging) for the Vega/Vega-Lite runtime. One of: `0` (None), `1` (Error), `2` (Warn), `3` (Info), `4` (Debug).                                                                                                                                                                                    |
| `enableTooltips`         | `true`                     | [boolean](#boolean)  | Enables the [Power BI tooltip handler](interactivity-tooltips) instead of Vega's built in one. Analogous to checking the _Tooltip handler_ checkbox in the interactivity settings.                                                                                                                                                                                                   |
| `enableContextMenu`      | `true`                     | [boolean](#boolean)  | Ensures that data points are resolved in [Power BI's context menu](interactivity-context-menu) when right-clicking a visual. Analogous to checking the _Resolve data points in context menu_ checkbox in the interactivity settings.                                                                                                                                                 |
| `enableHighlight`        | `false`                    | [boolean](#boolean)  | Enables support for tracking and responding to [highlight events](interactivity-highlight) from other visuals. Analogous to checking the _Expose cross-highlight values for measures_ checkbox in the interactivity settings.                                                                                                                                                        |
| `enableSelection`        | `false`                    | [boolean](#boolean)  | Enables support for tracking and responding to [cross-filter](interactivity-selection) events when interacting with your visual and tracking state. Analogous to checking the _Expose cross-filtering values for dataset rows_ checkbox in the interactivity settings.                                                                                                               |
| `selectionMaxDataPoints` | `50D`                      | [integer](#integer)  | The maximum number of data points to consolidate for cross-filtering operations and is only relevant when `enableSelection` is `true`.                                                                                                                                                                                                                                               |
| `selectionMode`          | `simple`                   | [text](#text) (enum) | The selection mode to use when `enableSelection` is `true`. `simple` will monitor the Vega view, attempt to resolve data points and apply cross-filtering. `advanced` enables [advanced cross filtering](interactivity-selection-advanced), which is only supported and functional when `provider` is `'vega'` and you have defined the relevant events in your spec to initiate it. |
| `version`                | [managed by Deneb]         | [text](#text)        | Deneb uses this as a checkpoint to store the version of the provider last used to render your visual, and is assumed to be the currently packaged version of Vega or Vega-Lite if omitted. It is automatically populated when the visual is updated and used to track any migration requirements.                                                                                    |

### `objects.display`

Properties in this group are displayed in the _Rendered visual_ property menu in the formatting pane and are concerned with any processing Deneb does to the visual output on top of the Vega view.

| Property              | Default Value (if Omitted) | Type                | Remarks                                                                                                                                                                                                                                     |
| --------------------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `scrollbarColor`      | `#000000`                  | [color](#color)     | The color of the [container scrollbar](scrolling-overflow#configuring-scrollbar-appearance) when it is shown.                                                                                                                               |
| `scrollbarOpacity`    | `20D`                      | [integer](#integer) | The opacity of the [container scrollbar](scrolling-overflow#configuring-scrollbar-appearance) when it is shown. Values are converted to decimal percentage by Deneb and valid values are `0D` to `100D`.                                    |
| `scrollbarRadius`     | `0D`                       | [integer](#integer) | The border radius of the [container scrollbar](scrolling-overflow#configuring-scrollbar-appearance) in px when it is shown. Valid values are `0D` to `3D`; anything higher than `3D` will be artificially due to the scrollbar's thickness. |
| `scrollEventThrottle` | `5D`                       | [integer](#integer) | The throttle delay in ms for updating the container scroll position values [in the `pbiContainer` signal](scrolling-overflow#using-pbicontainer-to-track-scrolling-events). Valid values are `0D` to `1000D`.                               |

### `objects.dataLimit`

Properties in this group are displayed in the _Data limit options_ menu and used to dictate how Deneb should handle [data row limits](dataset#data-row-limits) imposed by Power BI.

| Property                | Default Value (if Omitted) | Type                | Remarks                                                                                                                                                                         |
| ----------------------- | -------------------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `override`              | `false`                    | [boolean](#boolean) | When `true`, this will enable the[ _Override row limit_ property](dataset#data-row-limits), instructing Deneb to fetch more data when the standard 10,000 row limit is reached. |
| `showCustomVisualNotes` | `true`                     | [boolean](#boolean) | When `true`, this will show the _Custom visual notes_ section in the editor's data panel when data is being fetched.                                                            |

### `objects.developer`

Properties in this group are intended for internal use.

| Property  | Default Value (if Omitted) | Type | Remarks                                                                                                                                                                                                                                                                                                              |
| --------- | -------------------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `version` | [managed by Deneb]         | text | Deneb uses this as a checkpoint to store the version of the provider last used to render your visual, and is assumed to be the currently visual version from the manifest if omitted. It is automatically populated when the visual is updated and used to track any migration requirements between version changes. |

### `objects.stateManagement`

Properties in this group are intended for internal use and transient state management between sessions.

| Property         | Default Value (if Omitted) | Type                | Remarks                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------------- | -------------------------- | ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viewportHeight` | `null` [managed by Deneb]  | [integer](#integer) | The last known height of the visual viewport when viewing normally (in px). If omitted, Deneb will calculate this and update whenever the visual is updated, to ensure that it matches the visual container on the canvas. It is only needed to ensure that the preview is correctly sized in the Advanced Editor and is not necessary for any automation. Details have ony been included for completeness. |
| `viewportWidth`  | `null` [managed by Deneb]  | [integer](#integer) | The last known width of the visual viewport when viewing normally (in px). If omitted, Deneb will calculate this and update whenever the visual is updated, to ensure that it matches the visual container on the canvas. It is only needed to ensure that the preview is correctly sized in the Advanced Editor and is not necessary for any automation. Details have ony been included for completeness.  |

### `objects.editor`

Properties in this group are displayed in the _Advanced Editor_ property menu in the formatting pane and are concerned with the editor's operation and appearance. Setting them can be used to 'prime' the editor experience for users but will have no effect on the visual's rendering or operation outside of the editor.

| Property                | Default Value (if Omitted) | Type                 | Remarks                                                                                                                                                                                                                                  |
| ----------------------- | -------------------------- | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `theme`                 | `light`                    | [text](#text) (enum) | The theme to use for the editor interface. Either `light` or `dark`.                                                                                                                                                                     |
| `showViewportMarker`    | `true`                     | [boolean](#boolean)  | When `true`, shows the viewport marker in the editor [preview area](visual-editor#preview-area).                                                                                                                                         |
| `previewScrollbars`     | `true`                     | [boolean](#boolean)  | When `true`, shows scrollbars in the editor [preview area](visual-editor#preview-area) when the rendered specification overflows the container viewport.                                                                                 |
| `backgroundPassthrough` | `true`                     | [boolean](#boolean)  | When `true`, the editor [preview area](visual-editor#preview-area) will render with a transparent background, allowing you to see through to any underlying report canvas background.                                                    |
| `position`              | `left`                     | [text](#text) (enum) | The position of the [JSON editor](visual-editor#json-editor-properties) pane. Either `left` or `right`.                                                                                                                                  |
| `fontSize`              | `10D`                      | [integer](#integer)  | The font size in px for the [JSON editor](visual-editor#json-editor-properties). Valid values are `8D` to `30D`.                                                                                                                         |
| `wordWrap`              | `true`                     | [boolean](#boolean)  | When `true`, enables word wrapping in the [JSON editor](visual-editor#json-editor-properties).                                                                                                                                           |
| `showLineNumbers`       | `true`                     | [boolean](#boolean)  | When `true`, shows line numbers in the [JSON editor](visual-editor#json-editor-properties).                                                                                                                                              |
| `debouncePeriod`        | `300D`                     | [integer](#integer)  | How frequently to track changes to the content inside the [JSON editor](visual-editor#json-editor-properties).                                                                                                                           |
| `debugTableRowsPerPage` | `50D`                      | [integer](#integer)  | The number of rows to show per page for the Advanced Editor's [data tables in the debug pane](visual-editor#debug-pane). This can be any integer value, but the interface provides options for `10`, `25`, `50`, `100`, `150` and `200`. |

## Property Implementation Guide

The PBIR documentation does not elaborate on property specifics too well, so here are some notes regarding types that may help you understand how to work with them in Deneb. Note that we only cover how we support them instead of the whole PBIR property system.

### Common Pitfalls

1. **Forgetting the `D` suffix** on numeric values - Power BI will fail to parse
2. **Double-escaping JSON** in `jsonSpec` - results in parse errors
3. **Using double quotes** instead of single quotes for text literals
4. **Missing `expr.Literal.Value` wrapper** - properties won't be recognized

### `boolean`

Boolean properties should use `true` or `false` literals. For example, to set a boolean property to `true`, you would use:

```json title="Boolean property structure"
{
  "enableTooltips": {
    "expr": {
      "Literal": {
        "Value": "true"
      }
    }
  }
}
```

### `color`

Color properties match the structure of `#/definitions/fill` from the [Report Theme JSON Schema](https://github.com/microsoft/powerbi-desktop-samples/tree/main/Report%20Theme%20JSON%20Schema) published by MS. For Deneb, we currently only use (and support) `solid`.

Colors can be supplied using `Literal` values that should support any known HTML/CSS color format, but the structure is slightly different to regular text properties. For example, to set a color property to red, you would use:

```json title="Color property structure using 'Literal' value"
{
  "scrollbarColor": {
    "solid": {
      "color": {
        "expr": {
          "Literal": {
            "Value": "'#FF0000'" // or "'red'", "'rgb(255,0,0)'", etc.
          }
        }
      }
    }
  }
}
```

And you can use `ThemeDataValue` for binding to your theme, e.g.:

```json title="Color property structure using 'ThemeDataValue' value"
{
  "scrollbarColor": {
    "solid": {
      "color": {
        "expr": {
          "ThemeDataColor": {
            "ColorId": 1,
            "Percent": 0
          }
        }
      }
    }
  }
}
```

### `integer`

Integer values should be suffixed with a `D` to indicate that they are numeric literals. For example, to set an integer property to `50`, you would use:

```json title="Integer property structure"
{
  "selectionMaxDataPoints": {
    "expr": {
      "Literal": {
        "Value": "50D"
      }
    }
  }
}
```

### `text`

Text properties should be enclosed in single quotes (`'`) to indicate that they are string literals. For example, to set a text property to `vegaLite`, you would use:

```json title="Text property structure"
{
  "provider": {
    "expr": {
      "Literal": {
        "Value": "'vegaLite'"
      }
    }
  }
}
```

Any JSON objects or arrays that need to be stored as text (such as the Vega specification) should be stringified and escaped accordingly, as shown in the earlier examples.
