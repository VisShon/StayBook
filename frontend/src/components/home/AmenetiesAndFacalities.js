import React from 'react'
import '../../styles/home/AmenetiesAndFacalities.css';
import AmenetiesFacalitiesTable from './AmenetiesFacalitiesTable';
function AmenetiesAndFacalities() {
  return (
    <div className = "textContainer">    <h1 className = "textTitle">Amenities & Facilities</h1>
    <div className = "container"><div className = "textParagraph">If you are looking for a relaxing, refreshing and rejuvenating experience 
    altogether, we offer all of that under one roof.</div>
 <button className = "glow-on-hover">View All</button></div>
    <AmenetiesFacalitiesTable />
    </div>

  );
}

export default AmenetiesAndFacalities;