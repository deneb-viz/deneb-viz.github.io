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
  favicon: "img/favicon.png",
  organizationName: "deneb-viz",
  projectName: "deneb-viz.github.io",
  trailingSlash: false,
  staticDirectories: ["static"],
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],
  future: {
    v4: true,
    faster: true,
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
    // ponytail: v4 disables MDX v1 compat by default; keep legacy <!-- --> and
    // {#id} syntax working. Migrate content (write-heading-ids --syntax
    // mdx-comment --migrate) before Docusaurus v5 removes these options.
    mdx1Compat: {
      comments: true,
      admonitions: true,
      headingIds: true,
    },
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl:
            "https://github.com/deneb-viz/deneb-viz.github.io/edit/source/",
          versions: {
            current: {
              label: "Canary 🚧",
            },
          },
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: {
          trackingID: "UA-143608567-3",
          anonymizeIP: true,
        },
        sitemap: {
          ignorePatterns: ["/docs/next/**"],
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
            label: "Docs",
            to: "docs/",
            position: "left",
          },
          { to: "blog", label: "Blog", position: "left" },
          {
            label: "Community & Resources",
            to: "/community/resources",
            position: "left",
          },
          {
            label: "Support",
            href: "/support",
            position: "left",
          },
          {
            type: "docsVersionDropdown",
            position: "right",
            dropdownActiveClassDisabled: true,
            versions: ["1.9", "1.8"],
          },
          {
            href: "https://github.com/sponsors/deneb-viz",
            label: "Sponsor",
            position: "right",
          },
          {
            href: "/privacy-policy",
            label: "Privacy Policy",
            position: "right",
          },
          {
            href: "https://github.com/deneb-viz/deneb",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        links: [
          {
            title: "Documentation",
            items: [
              {
                label: "Docs",
                to: "docs/",
              },
              {
                label: "Vega Documentation",
                href: "https://vega.github.io/vega/docs/",
              },
              {
                label: "Vega-Lite Documentation",
                href: "https://vega.github.io/vega-lite/docs/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Resources and Examples",
                href: "/community/resources",
              },
              {
                label: "Support",
                href: "/support",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Privacy Policy",
                href: "/privacy-policy",
              },
              {
                label: "Blog",
                to: "blog",
              },
              {
                label: "Sponsor",
                href: "https://github.com/sponsors/deneb-viz",
              },
              {
                label: "GitHub",
                href: "https://github.com/deneb-viz/deneb",
              },
            ],
          },
        ],
        copyright: `Deneb is released under the MIT License.`,
      },
      prism: {
        additionalLanguages: ["json"],
        theme: lightTheme,
        darkTheme: darkTheme,
      },
    }),
};

module.exports = config;
