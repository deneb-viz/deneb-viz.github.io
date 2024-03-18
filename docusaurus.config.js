// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const { themes } = require("prism-react-renderer");
const lightTheme = themes.github;
const darkTheme = themes.dracula;

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
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
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
              label: "1.7 🚧",
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
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        logo: {
          alt: "My Site Logo",
          src: "img/banner.png",
          srcDark: "img/banner_dark.png",
        },
        items: [
          {
            href: "/",
            label: "Docs",
            position: "left",
          },
          {
            type: "docsVersionDropdown",
            position: "left",
            dropdownActiveClassDisabled: true,
          },
          {
            label: "Community & Resources",
            to: "/community/resources",
            position: "left",
          },
          {
            label: "Support",
            href: "/support",
            position: "right",
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
        additionalLanguages: ["json"],
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
