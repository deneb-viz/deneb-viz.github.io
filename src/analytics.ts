// /src/analytics.ts

// Google Analytics, loaded only after the visitor accepts the consent banner
// (src/theme/Root.js). Nothing is sent to Google before then. Registered as a
// client module in docusaurus.config.js so route changes report page views.

import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import type { ClientModule } from "@docusaurus/types";

const MEASUREMENT_ID = "G-TLTRMQ5148";
const CONSENT_KEY = "analytics-consent";

export type Consent = "granted" | "denied";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

const loadAnalytics = () => {
  if (window.dataLayer) return;
  const dataLayer: unknown[] = (window.dataLayer = []);
  window.gtag = function () {
    // gtag.js expects the arguments object itself, not an array
    dataLayer.push(arguments);
  };
  // Consent covers analytics only; keep Google's ad features off
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);
};

// localStorage can throw in private windows or with site data blocked
export const getConsent = (): Consent | null => {
  try {
    const value = localStorage.getItem(CONSENT_KEY);
    return value === "granted" || value === "denied" ? value : null;
  } catch {
    return null;
  }
};

export const setConsent = (consent: Consent) => {
  try {
    localStorage.setItem(CONSENT_KEY, consent);
  } catch {
    // Choice can't be saved; it still applies until the page is reloaded
  }
  if (consent === "granted") loadAnalytics();
};

// Clears the saved choice and any GA cookies, then reloads so the banner shows
// again without gtag.js on the page
export const resetConsent = () => {
  try {
    localStorage.removeItem(CONSENT_KEY);
  } catch {
    // Nothing saved to clear
  }
  const domain = location.hostname.replace(/^www\./, "");
  for (const cookie of document.cookie.split("; ")) {
    const name = cookie.split("=")[0];
    if (name.startsWith("_ga")) {
      document.cookie = `${name}=; Max-Age=0; path=/`;
      document.cookie = `${name}=; Max-Age=0; path=/; domain=.${domain}`;
    }
  }
  location.reload();
};

if (ExecutionEnvironment.canUseDOM && getConsent() === "granted") {
  loadAnalytics();
}

// The initial page view is sent by `config`; this covers client-side
// navigation. Anchor-only changes (table of contents clicks) are skipped.
export const onRouteDidUpdate: ClientModule["onRouteDidUpdate"] = ({
  location,
  previousLocation,
}) => {
  if (
    window.dataLayer &&
    previousLocation &&
    (location.pathname !== previousLocation.pathname ||
      location.search !== previousLocation.search)
  ) {
    // Defer a tick so document.title has updated (facebook/docusaurus#7420)
    setTimeout(() => window.gtag("event", "page_view"));
  }
};
