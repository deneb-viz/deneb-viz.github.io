// /src/components/SupportContainer.tsx
import React, { useEffect, useState } from "react";
import expertsData from "../../static/data/community-experts.json";

const SupportContainer = () => {
  const [experts, setExperts] = useState([]);

  useEffect(() => {
    // Shuffle the array randomly
    const shuffledExperts = shuffleArray(expertsData as IExpert[]);
    setExperts(shuffledExperts);
  }, []);

  return (
    <div className="support-container">
      {experts.map((expert) => (
        <div key={expert.name}>
          <img
            className="community-expert-image"
            src={expert.imageSrc}
            alt={expert.name}
          />
          <br />
          <span className="name">{expert.name}</span>
          <br />
          {expert.channelName && (
            <>
              <a
                href={expert.channelExpertSrc}
                target="_blank"
                rel="noopener noreferrer"
              >
                {expert.channelName}
              </a>
            </>
          )}
          <br />
          {expert.contributionAreas.map(
            (area: IContributionArea, i: number) => (
              <span className="contribution-area" key={area.name}>
                {area.abbreviation +
                  (i < expert.contributionAreas.length - 1 ? " | " : "")}
              </span>
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default SupportContainer;

interface IExpert {
  name: string;
  imageSrc: string;
  channelName: string;
  channelExpertSrc: string;
  contributionAreas: IContributionArea[];
}

interface IContributionArea {
  name: "Deneb" | "Vega" | "Vega-Lite";
  abbreviation: "D" | "V" | "VL";
}

const shuffleArray = (array: IExpert[]) => {
  // Fisher-Yates shuffle algorithm
  let currentIndex = array.length,
    randomIndex: number;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
