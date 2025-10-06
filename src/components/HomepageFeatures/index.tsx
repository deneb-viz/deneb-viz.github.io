import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Everything included",
    Svg: require("@site/static/img/box.svg").default,
    description: (
      <>
        Deneb contains all libraries needed for your visual to work anywhere
        your Power BI report does, including publish to web, on-premise with
        Report Server, and mobile.
      </>
    ),
  },
  {
    title: "Customizable *and* actionable",
    Svg: require("@site/static/img/interact.svg").default,
    description: (
      <>
        In addition to the expressiveness of the Vega languages, Deneb can
        integrate with Power BI's interactivity features, including tooltips,
        cross-filtering and drill-through.
      </>
    ),
  },
  {
    title: "Microsoft certified",
    Svg: require("@site/static/img/badge.svg").default,
    description: (
      <>
        Deneb is{" "}
        <Link to="https://learn.microsoft.com/en-us/power-bi/developer/visuals/power-bi-custom-visuals-faq#certified-power-bi-visuals">
          certified by Microsoft
        </Link>
        , meaning that it doesn't access external services or resources and can
        be exported to PDF or displayed in emails.
      </>
    ),
  },
  {
    title: "Free and open source",
    Svg: require("@site/static/img/hearts.svg").default,
    description: (
      <>
        Deneb is released under the{" "}
        <Link to="https://en.wikipedia.org/wiki/MIT_License">MIT License,</Link>{" "}
        and is free of charge.
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--12 col--md-6 col--lg-3")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
