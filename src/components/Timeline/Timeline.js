import React from 'react';

import TimelineCard from "../../containers/TimelineCard/TimelineCard";

const Timeline  = (props) => {
  const timelineCardData = props.timelineCardData;
  return(
  <div className="RightSection">
    {timelineCardData.map((card) => (
     <TimelineCard 
                     logoImage={card.logoImage}
                     startDate={card.startDate}
                     endDate={card.endDate}
                     title={card.title}
                     location={card.location}
                     description={card.description}
                     techlist={card.techlist}
                     />
  ))}
   
  </div>
  )
}

export default Timeline;
