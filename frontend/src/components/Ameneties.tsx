import React, {useState , useEffect} from 'react';
import '../styles/Amneties.scss';


function Ameneties({data}:any) {
  
  const [visible , setVisible]  = useState(5);
   const showMoreItems = () => {
    setVisible((prevValue) => prevValue +data.length);
   }
   const showLessItems = () => {
    setVisible(5);
   }

   const tryRequire = (item:any) => {
      try{
        return require("../images/staybookAmenities/"+item+".svg");
      }
      catch(err){
        console.log('notfound')
        return null;
      }
   }


  return (
    <>
      <h2>Ameneties:</h2>
        <div className="details">
          {
          data.slice(0 , visible).map((item:any,index:number) => (
            <h1 className="amenities" key={index} style={{display: 'flex', alignItems: 'center'}}>
              {
                tryRequire(item)?
                <img src={require("../images/staybookAmenities/"+item+".svg")} style={{width:'2rem'}}/>:<>•</>
              }
              {item}
            </h1>
          ))}
        {visible<data.length?
          <div style={{cursor:'pointer',fontSize:'2rem'}} onClick={showMoreItems}>+</div>:
          <div style={{cursor:'pointer', fontSize:'1rem'}} onClick={showLessItems}>Less...</div>}
        </div>
    </>


  )

  
}

export default Ameneties