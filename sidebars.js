/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  mainSidebar: [
    "introduction",
    {
      type: "category",
      label: "Getting Started",
      collapsible: true,
      collapsed: false,
      link: {
        type: "doc",
        id: "getting-started/introduction",
      },
      items: [
        "getting-started/example",
        "getting-started/editor",
        "getting-started/dataset",
        "getting-started/keyboard",
      ],
    },
    {
      type: "category",
      label: "Deeper Concepts",
      collapsible: true,
      collapsed: false,
      items: [
        "deeper-concepts/formatting",
        "deeper-concepts/schemes",
        "deeper-concepts/pattern-fills",
        "deeper-concepts/templates",
        "deeper-concepts/performance-considerations",
      ],
    },
    {
      type: "category",
      label: "Interactivity Features",
      collapsible: true,
      collapsed: false,
      link: {
        type: "doc",
        id: "interactivity/overview",
      },
      items: [
        "interactivity/tooltips",
        "interactivity/context-menu",
        "interactivity/selection",
        "interactivity/highlight",
      ],
    },
    {
      type: "category",
      label: "Change Log",
      collapsible: true,
      link: {
        type: "doc",
        id: "changelog",
      },
      items: ["archive/changelog-001"],
    },
    {
      type: "category",
      label: "Further Resources",
      collapsible: true,
      collapsed: false,
      items: [
        {
          type: "link",
          label: "Vega Documentation",
          href: "https://vega.github.io/vega/docs/",
        },
        {
          type: "link",
          label: "Vega-Lite Documentation",
          href: "http://vega.github.io/vega-lite/docs/",
        },
      ],
    },
  ],
};

module.exports = sidebars;
