import React, {useState , useEffect} from 'react';
import '../styles/Amneties.scss';

function Ameneties({data}:any) {

  // const [items , setItems]  = useState([]);
  
  const [visible , setVisible]  = useState(3);

   const showMoreItems = () => {


    setVisible((prevValue) => prevValue +20);
   }


  return (
    <div className="details">Amenities:

      {
      data.slice(0 , visible).map((item:any,index:number) => (
        <h1 className="amenities" key={index}>{index + 1} {item}</h1>
      ))}
    <button onClick={showMoreItems}>Load More</button>
    </div>


  )

  
}

export default Ameneties