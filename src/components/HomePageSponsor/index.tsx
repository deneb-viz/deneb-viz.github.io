import clsx from "clsx";
import styles from "./styles.module.css";
import { HomePageSponsorProps } from "@site/types";
import Link from "@docusaurus/Link";

export const HomePageSponsor: React.FC<HomePageSponsorProps> = ({
  sponsor,
  tier,
}) => {
  return (
    <div className={clsx(styles[`sponsor-${tier}`], "sponsor")}>
      {sponsor.source === "github" && sponsor && (
        <Link to={sponsor.url}>
          <img
            className={clsx(
              styles.avatar,
              styles.github,
              styles[`${tier}-${sponsor.image_sizing}`],
              styles[`${tier}-border`]
            )}
            src={sponsor.image_url}
            title={sponsor.name}
            alt={`${sponsor.name}'s avatar`}
          />
        </Link>
      )}
      {sponsor.source === "repo" && sponsor && (
        <Link to={sponsor.url}>
          <img
            className={clsx(
              styles.avatar,
              styles[`${tier}-${sponsor.image_sizing}`],
              styles[`${tier}-border`]
            )}
            src={sponsor.image_url}
            title={sponsor.name}
            alt={`${sponsor.name}'s avatar`}
          />
        </Link>
      )}
    </div>
  );
};
