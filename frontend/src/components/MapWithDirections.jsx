import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useLoadScript, DirectionsRenderer } from '@react-google-maps/api';

const mapContainerStyle = {
  height: "400px",
  width: "800px",
};

const center = {
  lat: 41.3851, // Example latitude, adjust accordingly
  lng: 2.1734,  // Example longitude, adjust accordingly
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const MapWithDirections = ({ origin, destination }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyDi7jsmBJKnJVPZ_S_8CXL5X4wWDdXBz24", // Replace with your API key
  });

  const [directions, setDirections] = useState(null);

  const mapRef = useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }, [isLoaded, origin, destination]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={14}
      options={options}
      onLoad={onMapLoad}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default MapWithDirections;
