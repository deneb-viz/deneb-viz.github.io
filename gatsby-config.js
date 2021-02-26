module.exports = {
  siteMetadata: {
    siteTitle: `Deneb - Declarative visualization in Power BI, using the Vega language`,
    defaultTitle: `Deneb - Declarative Visualization in Power BI`,
    siteTitleShort: `Deneb`,
    siteDescription: `Deneb - Declarative visualization in Power BI, using the Vega language`,
    siteUrl: `https://deneb-viz.github.io`,
    siteAuthor: `@dm-p`,
    siteImage: `/banner.svg`,
    siteLanguage: `en`,
    themeColor: `#8257E6`,
    basePath: `/`,
  },
  plugins: [
    {
      resolve: `@rocketseat/gatsby-theme-docs`,
      options: {
        configPath: `src/config`,
        docsPath: `src/docs`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Deneb - Declarative visualization in Power BI, using the Vega language`,
        short_name: `Deneb Visual Site`,
        start_url: `/`,
        background_color: `#ffffff`,
        display: `standalone`,
        icon: `static/favicon.png`,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: ``,
      },
    },
    `gatsby-plugin-remove-trailing-slashes`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://deneb-viz.github.io`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
