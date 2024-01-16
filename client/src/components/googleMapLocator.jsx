import React, { useEffect } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMapLocator = () => {
    useEffect(() => {
        const loader = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
          version: "weekly",        
        });
  
        loader.load().then(() => {
          if (window.google) {
            const { Map, Marker, InfoWindow } = window.google.maps;
      
            const map = new Map(document.getElementById("map"), {
              center: { lat: 49.1780259, lng: -123.1357682 },
              zoom: 10,
            });
      
            const locations = [
              { lat: 49.1780259, lng: -123.1357682, title: 'King Feet Massage - Richmond' },
              { lat: 49.3126577, lng: -123.0774369, title: 'King Feet Massage - North Vancouver' },            
            ];
      
            locations.forEach((location) => {
              const marker = new Marker({
                position: location,
                map: map,
                title: location.title,
              });
      
              const navigateUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;
              const infoWindowContent = `
                <div>
                  <h2>${location.title}</h2>
                  <p><a href="${navigateUrl}" target="_blank">Navigate in Google Maps</a></p>
                </div>
              `;
      
              const infoWindow = new InfoWindow({
                content: infoWindowContent,
              });
      
              marker.addListener('click', () => {
                infoWindow.open(map, marker);
              });
            });
          }
        });
      }, []);

    return <div id="map" style={{ height: '400px', width: '100%' }}></div>;
}
 
export default GoogleMapLocator;