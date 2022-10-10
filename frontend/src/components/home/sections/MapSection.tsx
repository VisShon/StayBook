import React from 'react'
import { Map, Marker } from "pigeon-maps"
function MapSection() {
  return (
    <div className="map-section">
        <Map height={300} defaultCenter={[50.879, 4.6997]} defaultZoom={11}>
         <Marker width={50} anchor={[50.879, 4.6997]} />
        </Map>
    </div>
  )
}

export default MapSection