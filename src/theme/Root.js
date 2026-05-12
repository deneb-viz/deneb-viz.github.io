import React from "react";
import { useLocation } from "@docusaurus/router";
import Head from "@docusaurus/Head";

export default function Root({ children }) {
  const { pathname } = useLocation();
  const isCanary = pathname.startsWith("/docs/next/");
  return (
    <>
      {isCanary && (
        <Head>
          <meta name="robots" content="noindex,nofollow" />
        </Head>
      )}
      {children}
    </>
  );
}
