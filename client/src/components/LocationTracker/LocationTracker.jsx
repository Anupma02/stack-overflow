import React, { useState, useEffect } from 'react';
import { getUserLocation } from '../../services/GeolocationService';
import MapDisplay from './MapDisplay';
import "./LocationTracker.css"

const LocationTracker = () => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        console.log("Fetching user location...");
        const location = await getUserLocation();
        console.log("User location:", location);
        setUserLocation(location);
      } catch (error) {
        console.error('Error fetching user location:', error.message);
      }
    };

    fetchUserLocation();
  }, [userLocation]); // Empty dependency array to fetch user location only once

  return (
    <div className='user-location'>
      <h2 className='User-location-heading'>User Location</h2>
      {userLocation  && <MapDisplay location={userLocation}  />}
    </div>
  );
};

export default LocationTracker;
