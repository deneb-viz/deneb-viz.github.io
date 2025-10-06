import clsx from "clsx";
import Heading from "@theme/Heading";

import styles from "./styles.module.css";
import reviewData from "@site/src/data/reviews.json";
import { useEffect, useState } from "react";
import { shuffleArray } from "@site/src/utils/shuffleArray";
import Link from "@docusaurus/Link";

const RANDOM_REVIEW_SLICE = 9;
const MOBILE_SLICE = 6;

export function HomePageReviews() {
  // Use a single list; layout is handled by CSS masonry columns
  const [reviews, setReviews] = useState<IReview[]>([]);
  useEffect(() => {
    const shuffledReviews = shuffleArray(reviewData as IReview[])
      .filter((review) => review.title && review.content)
      .slice(0, RANDOM_REVIEW_SLICE);
    setReviews(shuffledReviews);
  }, []);
  return (
    <div className={clsx(styles.section, styles.sectionAlt)}>
      <div className="container">
        <Heading as="h2" className={clsx("margin-bottom--lg", "text--center")}>
          What our users are saying
        </Heading>
        <div className={styles.reviewLink}>
          <Link to="https://appsource.microsoft.com/en-us/product/power-bi-visuals/coacervolimited1596856650797.deneb?source=website&mktcmpid=leave_review">
            If you love Deneb, please help us out with an AppSource review!
          </Link>
        </div>
        <div className={clsx(styles.reviewMasonry)}>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={clsx(
                styles.reviewItem,
                i >= MOBILE_SLICE && styles.hideOnMobile
              )}
            >
              <div className={clsx("card", styles.review)}>
                <div className="card__header">
                  <div className={clsx("avatar__intro", styles.reviewMeta)}>
                    <strong className="avatar__name">{review.title}</strong>
                  </div>
                </div>

                <div className={clsx("card__body", styles.review)}>
                  {review.content}
                </div>

                <div className={clsx("card__footer", styles.reviewFooter)}>
                  <div className={clsx(styles.reviewMeta, styles.reviewDate)}>
                    {new Date(Date.parse(review.created_at)).toLocaleString(
                      undefined,
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </div>
                  <div>{"⭐".repeat(review.rating)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface IReview {
  id: string;
  rating: number;
  title: string;
  content: string;
  created_at: string;
}
