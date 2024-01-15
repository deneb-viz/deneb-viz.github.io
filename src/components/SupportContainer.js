// /src/components/SupportContainer.js
import React, { useEffect, useState } from 'react';

const SupportContainer = () => {

  const [experts, setExperts] = useState([]);

  useEffect(() => {
    // Fetch community-experts data
    fetch('/data/community-experts.json')
      .then((response) => response.json())
      .then((data) => {
        // Shuffle the array randomly
        const shuffledExperts = shuffleArray(data);
        setExperts(shuffledExperts);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const shuffleArray = (array) => {
    // Fisher-Yates shuffle algorithm
    let currentIndex = array.length,
      randomIndex;

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

  return (
    
    <div className="support-container">
      {experts.map((expert) => (
        <div key={expert.name}>
          <img className="community-expert-image" src={expert.imageSrc} alt={expert.name} />
          <br />
          <span className="name">{expert.name}</span>
          <br />
          {expert.channelName && (
            <>
              <a href={expert.channelExpertSrc} target="_blank" rel="noopener noreferrer">
                {expert.channelName}
              </a>
            </>
          )}
          <br />
          {expert.contributionAreas.map((area, i) => (
            <span class="contribution-area" key={area.name}>{area.abbreviation + (i < expert.contributionAreas.length -1 ? " | " : "")}</span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SupportContainer;
