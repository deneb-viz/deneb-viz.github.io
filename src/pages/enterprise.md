---
title: Enterprise and Security FAQ
description: Answers to the questions IT and security teams commonly ask when evaluating Deneb for Power BI
---

# Enterprise and Security FAQ

This page is the official statement for organizations evaluating Deneb. It answers the questions we are most often asked by IT, security, and procurement teams, and it is intended to be shared directly with them.

Deneb is a free, [open source](https://github.com/deneb-viz/deneb) project released under the [MIT License](https://github.com/deneb-viz/deneb/blob/main/LICENSE). It is provided as-is, without warranty or a service level agreement. We do not complete bespoke vendor questionnaires; if this page does not answer a question, or you believe something here is inaccurate, please [open an issue](https://github.com/deneb-viz/deneb/issues) so the answer can benefit everyone.

## Does Deneb transmit, store, or process report data outside Power BI?

No. Deneb processes the data that Power BI passes to it entirely within the visual, in the user's browser or Power BI Desktop session, solely to render a visualization. It does not collect, store, or transmit report data anywhere. There is no telemetry, no analytics, and no external service behind the visual.

This applies without qualification to the AppSource (certified) edition. The standalone edition can load remote resources that a report author references in their specification, which is covered in the next question.

See also our [Privacy Policy](/privacy-policy).

## Can Deneb make external network requests?

**AppSource (certified) edition: no.** Microsoft's [certification requirements](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-certified?WT.mc_id=DP-MVP-5003712#source-code-requirements) prohibit certified visuals from accessing external services or resources, and Microsoft verifies this against the source code for every release. Specifications that reference remote URLs (for example, images or external data) will not load them in this edition.

**Standalone edition: only when a report author explicitly asks it to.** The [standalone version](/docs/getting-started#standalone-version) is not certified and permits Vega/Vega-Lite specifications to reference remote images and data URLs, subject to Deneb's URL allow-list. Deneb itself never initiates a request; it only does so when the spec written by your own report author references a remote resource. If your organization wants to prevent this outright, use the AppSource edition, or restrict tenants to certified visuals (see [Guidance for IT and security teams](#guidance-for-it-and-security-teams) below).

## What security reviews or certifications does Deneb have?

Deneb is a [Microsoft-certified Power BI custom visual](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-certified?WT.mc_id=DP-MVP-5003712). Certification means each release is submitted to Microsoft, who review the source code and test the packaged visual for compliance before it is published to AppSource. Among other things, certified visuals must:

- Not access external services or resources, and not use `fetch` or `XMLHttpRequest`.
- Not use minified or obfuscated code, or dynamic code execution such as `eval`.
- Make the source code available to Microsoft for review, with the reviewed code matching the submitted package exactly.
- Run within Power BI's custom visual sandbox (an isolated iframe with no access to the host report's DOM, cookies, or storage).

Certification is renewed with every release. Deneb goes further than certification requires: the complete source is [public on GitHub](https://github.com/deneb-viz/deneb), so your own security team is free to audit it independently.

Deneb does not hold SOC 2, ISO 27001, or similar organizational certifications. It is a community open source project, not a company, and those frameworks do not apply.

## Are there any known security vulnerabilities?

Known issues are tracked and disclosed via the repository's [Security](https://github.com/deneb-viz/deneb/security) tab, which is the authoritative, current list. Deneb publishes a [security policy](https://github.com/deneb-viz/deneb/security/policy) describing what is in scope, how to report an issue privately via GitHub's security advisory process, and expected response times.

Two design points worth understanding when assessing risk:

- **A specification author has full control over what the visual renders**, within the sandbox. This is by design and is the same trust model as any authored report content, such as DAX measures or Power Query scripts. Treat Deneb specifications as report code, authored by people you trust.
- **Deneb embeds Vega and Vega-Lite**, which are widely used, actively maintained open source libraries. Dependency versions are pinned per release and updated as part of normal maintenance.

## Is Deneb actively maintained?

Yes. Deneb has been continuously developed and published to AppSource since 2021, with regular releases through to the current major version. Development is tracked openly on GitHub: the [Change Log](/docs/changelog) records what has shipped, and [issues](https://github.com/deneb-viz/deneb/issues) and [milestones](https://github.com/deneb-viz/deneb/milestones) show what is planned. There is no formal long-term roadmap or support commitment beyond this. The people involved are listed on the [Contributors](/community/contributors) page.

Deneb is developed and supported in contributors' own time. Community help is available via the channels on the [Support](/support) page, and consulting is available for organizations that need more than that.

## If development were discontinued, would existing reports keep working?

The visual package is embedded in each Power BI report file that uses it, so existing reports continue to render with a working version of the visual regardless of whether development continues. Nothing in Deneb depends on an external service that could be switched off.

For organizations that want full control over continuity, the standalone `.pbiviz` package from each [GitHub release](https://github.com/deneb-viz/deneb/releases) can be deployed as an [organizational visual](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-organization?WT.mc_id=DP-MVP-5003712). This pins the version you have approved, is managed entirely within your tenant, and does not depend on AppSource availability. Because the source is MIT licensed, your organization is also free to fork, build, and maintain it yourselves.

We cannot make commitments on Microsoft's behalf regarding how AppSource handles delisted visuals, so organizational visuals are the recommended path where continuity guarantees are required.

## Could future Power BI updates break existing Deneb visuals?

Power BI custom visuals are built on a versioned API that Microsoft maintains with backward compatibility, and Microsoft communicates deprecations to visual developers in advance. Deneb has tracked these changes since 2021 without loss of existing report functionality.

This risk is not zero, and it is not unique to Deneb: any custom visual, and indeed any Power BI feature, is subject to platform evolution. The mitigations are the same as for the previous question: keep the visual updated via AppSource, or pin an approved version as an organizational visual and upgrade on your own schedule.

## Guidance for IT and security teams

Share this page. In addition, the following Power BI tenant controls are relevant:

- **Restrict to certified visuals only.** The [tenant setting](https://learn.microsoft.com/en-us/power-bi/admin/organizational-visuals?WT.mc_id=DP-MVP-5003712) _Add and use certified visuals only_ ensures users can only add visuals that have passed Microsoft's certification, which includes Deneb's AppSource edition.
- **Use organizational visuals for approved versions.** If you need to control exactly which version runs, or want to allow the standalone edition under governance, deploy it as an [organizational visual](https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-organization?WT.mc_id=DP-MVP-5003712).
- **Audit the source.** Everything Deneb ships is in the [public repository](https://github.com/deneb-viz/deneb), including the exact code submitted for each certified release.
- **Report concerns privately.** Use the process in the [security policy](https://github.com/deneb-viz/deneb/security/policy) rather than public channels.
