// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Deneb",
  tagline: "Declarative Visualization in Power BI",
  url: "https://deneb-viz.github.io",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.png",
  organizationName: "deneb-viz",
  projectName: "deneb-viz.github.io",
  trailingSlash: false,
  staticDirectories: ["static"],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: "/",
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/deneb-viz/deneb-viz.github.io/edit/source/",
          versions: {
            current: {
              label: "1.1 🚧",
            },
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "UA-143608567-3",
          anonymizeIP: true,
        },
      }),
    ],
  ],
  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
      },
    ],
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          {
            to: "/community/support",
            from: ["/support"],
          },
        ],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "My Site Logo",
          src: "img/banner.svg",
          srcDark: "img/banner_dark.svg",
        },
        items: [
          {
            href: "/",
            label: "Docs",
            position: "left",
          },
          {
            label: "Community",
            to: "/community/support",
            position: "left",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "/privacy-policy",
            label: "Privacy Policy",
            position: "right",
          },
          {
            href: "https://github.com/sponsors/deneb-viz",
            label: "Sponsor",
            position: "right",
          },
          {
            href: "https://github.com/deneb-viz/deneb",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {},
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
