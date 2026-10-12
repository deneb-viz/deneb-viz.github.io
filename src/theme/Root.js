import React, { useEffect, useState } from "react";
import { useLocation } from "@docusaurus/router";
import Head from "@docusaurus/Head";
import Link from "@docusaurus/Link";
import { getConsent, setConsent } from "@site/src/analytics";

export default function Root({ children }) {
  const { pathname } = useLocation();
  const isCanary = pathname.startsWith("/docs/next/");
  // Hidden until mounted: the saved choice isn't readable during SSR.
  // ponytail: shown to every visitor; geo-targeting EU/UK needs a server or CDN rule
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(getConsent() === null), []);

  const choose = (consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    <>
      {isCanary && (
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
      )}
      {children}
      {open && (
        <div className="consent-banner" role="region" aria-label="Cookie consent">
          <p>
            We'd like to use Google Analytics cookies to see which pages are
            read and improve these docs. Nothing is sent unless you accept. See
            the <Link to="/privacy-policy#consent">Privacy Policy</Link>.
          </p>
          <div className="consent-banner__buttons">
            <button
              className="button button--primary"
              onClick={() => choose("granted")}
            >
              Accept
            </button>
            <button
              className="button button--primary"
              onClick={() => choose("denied")}
            >
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}
