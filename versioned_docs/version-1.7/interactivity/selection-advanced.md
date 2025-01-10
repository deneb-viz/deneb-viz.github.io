---
id: selection-advanced
slug: /interactivity-selection-advanced
sidebar_label: Advanced Cross-Filtering
---

# Advanced Cross-Filtering

For many use cases, Deneb's [cross-filtering](interactivity-selection) is typically enough. However, there are people who want much more control over how cross-filtering should work within their designs, and the advanced cross-filtering features are designed to help with this.

:::info This mode is only available for developers using Vega
If you are using Vega-Lite, or are happy with how your cross-filtering is managed with the _Simple_ mode, then it's probably best to skip through to the [next page](interactivity-highlight).
:::

## How Advanced Cross-Filtering Works (in a Nutshell)

Because your resulting visual specification might be quite different from your source dataset, it's not always easy to trace lineage of a mark back to its source data point (which is essentially what simple cross-filtering does). At a high level, you can do the following with the functionality provided:

- Specify exactly when events are triggered through Vega.
- Rather than just use the current data point in the event, you can specify a filter to apply to the original dataset sent by Power BI, based on this data point (or even static logic).
- Whatever is returned by this filter will be subject to cross-filtering (with all eligible data points having their `__selected__` field set accordingly).
- The filter you construct is a valid Vega `filter` transform.

There is a lot of scope in this functionality, which will open up how cross-filtering works and we couldn't possibly document (or know) what's possible. Instead this page will focus on providing you with as much detail about the functionality as we can so that you can use this as a basis for your own designs.

## Enabling Advanced Cross-Filtering

Vega allows you to control much more in terms of what happens with events inside a visual (known as [Event Streams](https://vega.github.io/vega/docs/event-streams/)). These Event Streams allow you to set signal values using [Expressions](https://vega.github.io/vega/docs/expressions/). As such, you are able to define all kinds of ways to define how a user can interact with your visual and this can create all kinds of interesting opportunities for how you can invoke cross-filtering from your visual to others on the page.

- You can configure whether Deneb should attempt to [resolve data points](interactivity-selection#data-point-resolution) when clicking on marks, through the **Expose cross-filtering values for dataset rows** property in the _Vega > Power BI Interactivity_ section of the [Settings pane in the Visual editor](visual-editor#settings-pane).

- This setting is **disabled** by default.

- For each row in the visual `"dataset"`, Deneb will generate a [special field for each row](interactivity-selection#the-__selected__-field) called `"__selected__"`, and will update this based on click events, or eligible external events to your visual, such as restoring a bookmark with an active selection state

- The _Cross filtering management_ mode should be set to **Advanced**.

:::caution Now you're on your own
With this setting enabled, Deneb will no longer monitor for click events, or clear the current-cross filter on your behalf.
:::

## Approach for Advanced Management Within your Specification

With the above in mind, you need to then think about what to do with the events that you wish to wire up to Vega, either:

1. Clear the current cross-filter selection - this is carried out via the `pbiCrossFilterClear` expression function.

2. Apply/update the current cross-filter selection - this is carried out via the `pbiCrossFilterApply` expression function.

Both functions are documented in detail further below so that you can get the most out of them, but we'll do a simple worked example that mimics the simple cross filtering, so that you can start to understand how to think about managing this yourself.

In this example, we have a mark that we've named `data-point`, and we want to manage the cross-filter state via a signal we've named `pbiCrossFilterSelection`:

```json
{
  "marks": [
    {
      /* The mark we wish to monitor (and encode) */
      "name": "data-point",
      ...
    }
  ],
  ...
  "signals": [
    {
      "name": "pbiCrossFilterSelection",
      "value": [],
      "on": [
        /* When specified mark is clicked, apply the cross-filter operation */
        {
          "events": {
            "source": "scope",
            "type": "mouseup",
            "markname": "data-point"
          },
          "update": "pbiCrossFilterApply(event)"
        },
        /* When the view is clicked (but not our mark by name), clear the current cross-filter */
        {
          "events": {
            "source": "view",
            "type": "mouseup",
            "filter": [
              "!event.item || event.item.mark.name != 'data-point'"
            ]
          },
          "update": "pbiCrossFilterClear()"
        }
      ]
    }
  ],
  ...
}
```

:::caution Handling 'catch-all' events against the view
You'll notice that there is very specific filtering in the `mouseup` event stream handler, so that the mark is excluded by its name. This is because monitoring the view for an event will include any marks as well. [Vega does not currently prevent propagation of the event from a mark to the view](https://github.com/vega/vega/issues/1493), so for now you will need to bear this in mind when implementing 'catch-all' events against the view.
:::

Some other key takeaways at this stage:

- The `pbiCrossFilterApply` event requires the [bound `event` variable](https://vega.github.io/vega/docs/expressions/#event) as its first parameter. This contains the information about the event type being captured and the backing datum for the mark or element being interacted with.
- With no further parameters, the `pbiCrossFilterApply` method will just work against the current datum (if it exists) and will mimic simple cross-filtering (including multi-selection handling via Ctrl/Shift key state).

## Expression Functions in Detail

### `pbiCrossFilterClear()`

This expression function explicitly instructs the Power BI host to clear the active data points subject to cross-filtering.

#### Function Implementation

As it is an explicit operation, no further parameters are needed.

### `pbiCrossFilterApply()`

This expression function is used to apply a cross-filter selection to the Power BI host.

#### Function Implementation

```ts
pbiCrossFilterApply ( event, filter? options? )
```

Where:

- `event` is the [bound `event` variable](https://vega.github.io/vega/docs/expressions/#event) accessible to expression functions

  - This contains the information about the event type being captured and the backing datum for the mark or element being interacted with.
  - The `event` contains the current `datum`, if Vega can resolve it.
  - If this is not a valid `event` object, we will not apply cross-filtering, and a warning will be shown in the **Logs** pane.

* `filter` is the optional (string) Vega filter expression to supply to the base visual dataset, and this is the objective you should aim for when thinking about how to construct your expression.

  - If this is not supplied or empty (`''` / `undefined` / `null`), then Deneb will invoke simple filtering, i.e., resolve the data point from the `event` parameter and do single-select.
  - Exceptions to this will result in the cross-filter not being applied and a warning being raised in the _Logs_ pane.
  - The filter must be a valid Vega [`filter` transform](https://vega.github.io/vega/docs/transforms/filter/) syntax.
  - In the context of this string, `datum.field` will apply to the desired field in the base dataset you want to apply your criteria to, as if you were applying a normal filter transform higher up in your spec.
  - To reference the `datum` of the mark that is being interacted with, you can either:
    - Manually add the resolved value using terminated/escaped values as a normal expression, or...
    - Add a placeholder expression, which Deneb will resolve for you (and save some effort having to work out the correctly escaped syntax yourself.
  - The following filters are syntactically the same internally once the expression is evaluated by Deneb (assuming `datum['Product']` of the current subject/mark is (_'Paseo'_):
    &nbsp;

    ```js
    // manually assembling
    "pbiCrossFilterApply ( event, \"datum['Product'] == '\" + datum['Product'] + \"'\")";

    // using the placeholder syntax
    "pbiCrossFilterApply ( event, \"datum['Product'] == _{Product}_\" )";

    // resolved filter expression
    "datum['Product'] == 'Paseo'";
    ```

  - For the placeholder expression the enclosing characters to denote this are `_{` and `}_`. Therefore, the parser will regard anything you include between them as the field name. This means that if you have fields containing special characters or whitespace, e.g. `$ Sales`, you would enter this as `_{$ Sales}_`.
  - If there are parse errors in this `filter` parameter, we try to raise the appropriate errors or warnings in the _Logs_ pane to help you debug.
  - Behind the scenes, Deneb creates a headless Vega spec containing only the base dataset, top-level signals and the resolved transform. This 'spec' is parsed, and the resulting rows are returned to the cross-filtering handler. These rows then become the subject of cross-filtering.
  - Because the `filter` expression is a valid Vega transform, you can combine predicates to create more sophisticated filter targets.
  - All current top-level signal values from your specification will be accessible when the filter is evaluated.

* `options` is an optional object containing further control over behavior.

  - If omitted, Deneb will use the defaults for supported properties (detailed in context below).
  - If you wish to use this, but not filter (i.e. _Simple_ selection with specific modifiers), supply an empty property for `filter`.
  - Valid properties for this object are:

    - `limit`: the maximum number of data points to permit when cross-filtering.

      - This is the same as the [_Data point limit_](https://deneb-viz.github.io/interactivity-selection#data-point-limit) setting for _Simple_ selection.
      - The same limits apply as this option for _Simple_ mode, i.e., **1** minimum, **2,500** maximum.
      - The maximum cap is for performance reasons, as it gets expensive for Power BI to resolve them. If, through experimentation, you find better sensible limits, we can increase this, but we do have to make sure that we don't cause the visual to crash, as this will be a blocker for certification.
      - If omitted, the default is **50**.

    - `multiSelect`: an array of values specifying which keys apply to this operation.
      - Valid values are `ctrl`, `shift` and `alt`.
      - Using multiple values will mean that either key being held down will apply to that event.
      - If omitted, the default is `['ctrl', 'shift']`, which mimics typical Power BI visual multi-selection (either ctrl or shift is held down to specify multi-selection).
      - The theory here is that you might be able to set up multiple interactions via different signals or key/mouse events, e.g., regular cross-filtering through clicking and something like using the alt key held down to invoke lasso selection (or, you might choose to use a drag event for this, but we want to give you as much flexibility as possible).
