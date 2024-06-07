import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapDisplay = ({ location }) => {
  const mapStyles = {
    height: '572px',
    width: '100%',
  };

  // Ensure location is valid and latitude/longitude are numbers
  const isValidLocation = location && typeof location.latitude === 'number' && typeof location.longitude === 'number';

  // Convert latitude and longitude to numbers
  const center = isValidLocation ? { lat: parseFloat(location.latitude), lng: parseFloat(location.longitude) } : null;

  return (
    <LoadScript googleMapsApiKey="AIzaSyBMixVNDRAD9_HlLQgYmg7SAcvDn323zn0">
      <GoogleMap mapContainerStyle={mapStyles} center={center} zoom={12}>
        {isValidLocation && <Marker position={center} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapDisplay;
