import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {
  
  const mapStyles = {        
    height: "100vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 30.6123298, lng: -96.3412948
  }

  const locations = [
    {
      name: "Our Chick-fil-a Location",
      location: { 
        lat: 30.6123298,
        lng: -96.3412948
      },
    }
  ]


  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAOnc72pQ5JSAViN8Ec--HCDdehJDliCUw'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={20.44}
          center={defaultCenter}
        >
        {
            locations.map(item => {
              return (
              <Marker key={item.name} position={item.location}/>
              )
            })
        }

        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;