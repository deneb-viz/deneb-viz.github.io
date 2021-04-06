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
        // The property ID; the tracking code won't be generated without it
        trackingId: "UA-143608567-3",
        // Defines where to place the tracking script - `true` in the head and `false` in the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
        // Avoids sending pageview hits from custom paths
        exclude: ["/preview/**", "/do-not-track/me/too/"],
        // Delays sending pageview hits on route update (in milliseconds)
        pageTransitionDelay: 0,
        // Defers execution of google analytics script after page load
        defer: false,
        // Any additional optional fields
        sampleRate: 5,
        siteSpeedSampleRate: 10,
        cookieDomain: "deneb-viz.github.io",
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
