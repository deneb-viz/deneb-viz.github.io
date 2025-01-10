import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageFeatures from "@site/src/components/HomepageFeatures";
import Heading from "@theme/Heading";

import styles from "./index.module.css";
import { HomePageReviews } from "../components/HomePageReviews";
import { HomePageSponsors } from "../components/HomePageSponsors";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero", styles.heroBanner)}>
      <div className="container">
        <img
          className={styles.heroLogo}
          src="/img/landing_banner.png"
          alt="Logo"
        />
        <Heading as="h1" className={styles.heroTitle}>
          Use the powerful <Link to="http://vega.github.io/vega">Vega</Link> or{" "}
          <Link to="http://vega.github.io/vega-lite">Vega-Lite</Link>{" "}
          visualization grammars to create custom visuals directly inside Power
          BI
        </Heading>
        <div className={styles.bannerOptions}>
          <div>
            <Link
              className="button button--secondary button--outline button--lg"
              to="docs/getting-started"
            >
              Getting started
            </Link>
          </div>
          <div>
            <Link
              className="button button--secondary button--outline button--lg"
              to="community/resources"
            >
              Examples & resources
            </Link>
          </div>
          <div>
            <Link to="https://deneb.link/appsource?source=website&mktcmpid=homepage">
              <img
                src="/img/MS_AppSource.png"
                width="175"
                title="Deneb is available from Microsoft AppSource, and is certified by Microsoft."
              />
            </Link>
          </div>
          <div>
            <span className={styles.indexCtasGitHubButtonWrapper}>
              <iframe
                className={styles.indexCtasGitHubButton}
                src="https://ghbtns.com/github-btn.html?user=deneb-viz&amp;repo=deneb&amp;type=star&amp;count=true&amp;size=large"
                width={150}
                height={30}
                title="GitHub Stars"
              />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}: ${siteConfig.tagline}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
        <HomePageReviews />
        <HomePageSponsors />
      </main>
    </Layout>
  );
}
