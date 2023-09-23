import React, { useState } from 'react';

import {
  Box, Button, CircularProgress, TextField, Typography,
} from '@mui/material';
import {
  GoogleMap, MarkerF, useLoadScript,
} from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const initialCenter = {
  lat: 51.09101,
  lng: 71.400222,
};

export const Map = React.memo(() => {
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [destinationName, setDestinationName] = useState<any>('');

  const [directionsRenderer,
    setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  const [distance, setDistance] = useState<string|undefined>('');
  const [duration, setDuration] = useState<string|undefined>('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlHw8ADaNMCZM4ArVpBpAWFk99N9cJ8Bo',
    libraries: ['places'],
  });

  const handleMapLoad = (m: google.maps.Map) => {
    setMap(m);
  };
  const clearRoute = async () => {
    directionsRenderer?.setMap(null);
    setDuration('');
    setDistance('');
    setDestinationName('');
  };

  const createRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer();
    setDirectionsRenderer(renderer);
    directionsService.route({
      origin: 'Кабанбай Батыра 53, Астана',
      destination: `${destinationName}`,
      travelMode: google.maps.TravelMode.WALKING,
    }).then((res) => {
      renderer.setOptions({
        directions: res, suppressMarkers: true, map, polylineOptions: { strokeColor: 'red' },
      });

      setDistance(res.routes[0].legs[0].distance?.text);
      setDuration(res.routes[0].legs[0].duration?.text);
    });
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 2, m: 2 }}>
        <TextField value={destinationName} onChange={(e) => setDestinationName(e.target.value)} />
        <Button variant="contained" onClick={createRoute}>
          Calculate Route
        </Button>
        <Typography>{distance}</Typography>
        <Typography>{duration}</Typography>
        <Button variant="contained" onClick={clearRoute}>
          Clear Route
        </Button>
      </Box>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={14}
        onLoad={handleMapLoad}
        options={{
          disableDefaultUI: true, // Disable all default user interface components
        }}
      >
        <MarkerF position={markerPosition} icon="src/assets/icons8-home-50.png" />
      </GoogleMap>
      <Button variant="contained" onClick={() => map?.panTo(initialCenter)}>
        Go center
      </Button>

    </Box>
  );
});
