import clsx from "clsx";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import { HomePageSponsor } from "../HomePageSponsor";
import sponsorsData from "@site/src/data/sponsors.json";
import { shuffleArray } from "@site/src/utils/shuffleArray";
import { SponsorInformation } from "@site/types";

const platinum = shuffleArray(sponsorsData.platinum);
const gold = shuffleArray(sponsorsData.gold);
const silver = shuffleArray(sponsorsData.silver);
const bronze = shuffleArray(sponsorsData.bronze);

export function HomePageSponsors() {
  return (
    <div className={styles.section}>
      <div className="container">
        <Heading
          as="h2"
          id="our-sponsors"
          className={clsx("margin-bottom--lg", "text--center")}
        >
          Our sponsors
        </Heading>
        <div className={styles.sponsorsLink}>
          Development of Deneb is self-funded by the development team, and also
          from the kindness of our sponsors! ❤️ If you want to help keep
          development moving along, support open-source development, or just
          want to say thanks,{" "}
          <Link to="https://github.com/sponsors/deneb-viz">
            you can help sponsor Deneb's development here
          </Link>
          .
        </div>
        <fieldset className={clsx(styles.sponsorsContainer, styles.platinum)}>
          <legend>Platinum Sponsors</legend>
          {platinum.map((sponsor: SponsorInformation, si) => (
            <HomePageSponsor key={si} sponsor={sponsor} tier="platinum" />
          ))}
        </fieldset>
        {/* <fieldset className={clsx(styles.sponsorsContainer, styles.gold)}>
          <legend>Gold Sponsors</legend>
          {gold.map((sponsor: SponsorInformation, si) => (
            <HomePageSponsor key={si} sponsor={sponsor} tier="gold" />
          ))}
        </fieldset>
        <fieldset className={clsx(styles.sponsorsContainer, styles.silver)}>
          <legend>Silver Sponsors</legend>
          {silver.map((sponsor: SponsorInformation, si) => (
            <HomePageSponsor key={si} sponsor={sponsor} tier="silver" />
          ))}
        </fieldset> */}
        <fieldset className={clsx(styles.sponsorsContainer, styles.bronze)}>
          <legend>Bronze Sponsors</legend>
          {bronze.map((sponsor: SponsorInformation, si) => (
            <HomePageSponsor key={si} sponsor={sponsor} tier="bronze" />
          ))}
        </fieldset>
      </div>
    </div>
  );
}
