---
id: introduction
slug: /
sidebar_position: 0
sidebar_label: Introduction
---

# Declarative Visualization in Power BI

Deneb is a custom visual for [Microsoft Power BI](https://www.powerbi.com), which allows developers to use the declarative [JSON](https://www.json.org/json-en.html) syntax of the [Vega](http://vega.github.io/vega) or [Vega-Lite](http://vega.github.io/vega-lite) languages to create their own data visualizations.

This is similar to the approaches used for creating [R](https://docs.microsoft.com/en-us/power-bi/create-reports/desktop-r-visuals?WT.mc_id=DP-MVP-5003712) and [Python](https://docs.microsoft.com/en-us/power-bi/connect-data/desktop-python-visuals?WT.mc_id=DP-MVP-5003712) visuals in Power BI, with the following additional benefits:

- Libraries are packaged with the visual, so no additional dependencies on local libraries or gateways for your end-users when publishing reports.
- Specifications are rendered inside the Power BI client, rather than being delegated to another location, typically resulting in faster render times for end-users.
- Built for the web, meaning that it's possible to integrate with Power BI's interactivity features, with some additional setup.

#### Starting Out?

- Deneb is [available in AppSource](https://deneb.link/appsource?source=website&mktcmpid=homepage), and this is the most straightforward way of getting started and staying up-to-date with the latest versions.

  <a href="https://deneb.link/appsource?source=website&mktcmpid=homepage"><img src="/img/MS_AppSource.png" width="200" title ="Deneb is available from Microsoft AppSource, and is certified"/></a>

- You can use the menu to start learning more about Deneb and how to build visuals with the Vega languages in Power BI.

- For community resources and examples, follow the **[Community](/community/support)** link at the top of the page.
