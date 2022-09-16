import React from 'react'
import tourImage from '../../../images/travel.svg'
import '../../../styles/home/ToursandTravels.scss'
function ToursandTravels() {

  return (
    <>
        <img className='toursImage' src={tourImage}/>
        <div className='toursContent'>
                <h2> Tours and Travels</h2>
                <p>Staybook offers customised family trips tailored 
                to the needs of any family, large or small, with youngsters or the 
                elderly. It's a fantastic chance to spend quality time together in a fantastic 
                location.</p>
                <div className='button'>Find more</div>
        </div>
    </>
  )
}

export default ToursandTravels