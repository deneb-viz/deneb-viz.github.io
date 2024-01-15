// /src/components/SupportContainer.tsx

// React modules
import React, { useEffect, useState } from "react";
// array of expert data
import expertsData from "../../static/data/community-experts.json";

// Component to render community experts and their metadata
const SupportContainer = () => {
  // State management
  const [experts, setExperts] = useState([]);

  // useEffect hook to perform shuffling and data fetching after the component renders
  // state update will trigger a re-render
  // empty dependency array to ensure that this effect only runs once
  useEffect(() => {
    // Shuffle the array of IExperts randomly
    const shuffledExperts = shuffleArray(expertsData as IExpert[]);
    setExperts(shuffledExperts);
  }, []);

  // return JSX for the SupportContainer's UI
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

// Community expert interface to be used with expertsData array
interface IExpert {
  name: string;
  imageSrc: string;
  channelName: string;
  channelExpertSrc: string;
  contributionAreas: IContributionArea[];
}

// Community expert contribution area interface to be used within experts
interface IContributionArea {
  name: "Deneb" | "Vega" | "Vega-Lite";
  abbreviation: "D" | "V" | "VL";
}

// Function to shuffle the array using Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffleArray = (array: IExpert[]) => {
  // variables to track the current index and current random index
  let currentIndex = array.length,
    randomIndex: number;

  // while there are remaining elements
  while (currentIndex !== 0) {
    //assign randomIndex a random number that is >= 0 && < currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex);

    currentIndex--;

    //swap positions between currentIndex and randomIndex
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
