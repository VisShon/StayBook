import React from 'react';
import plans from '../../../images/plan.svg'
import '../../../styles/home/Plans.scss';
function Plans() {
  return (
    <div className="plansBody">
      <img src={plans} />
      <div className="centerCard">
        <h2>Plan an Unforgettable Experience in Staybook!</h2>
        <p>We can help you fit your stay and experience within your allotted budget.</p>
        <a href="tel: +91-8373929299" className='contact'>Call for Support: +91-8373929299</a>
      </div>
    </div>
  )
}

export default Plans