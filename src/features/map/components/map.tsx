import React, { useState } from 'react';

import {
  Box, Button, CircularProgress, TextField, Typography, Stack,
} from '@mui/material';
import {
  GoogleMap, MarkerF, useLoadScript,
} from '@react-google-maps/api';

import { nightMode } from './night-mode-props';

const containerStyle = {
  width: '950px',
  height: '600px',
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
  const [destinationLocation, setDestinationLocation] = useState<{lat: number,
     lng: number}>({ lat: 0, lng: 0 });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlHw8ADaNMCZM4ArVpBpAWFk99N9cJ8Bo',
    libraries: ['places'],
    region: 'kz',
    language: 'ru',
  });

  const handleMapLoad = (m: google.maps.Map) => {
    setMap(m);
  };
  const clearRoute = async () => {
    directionsRenderer?.setMap(null);
    setDuration('');
    setDistance('');
    setDestinationName('');
    setDestinationLocation({ lat: 0, lng: 0 });
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
      setDestinationLocation({
        lat: res.routes[0].legs[0].end_location.lat(),
        lng: res.routes[0].legs[0].end_location.lng(),
      });
      setDistance(res.routes[0].legs[0].distance?.text);
      setDuration(res.routes[0].legs[0].duration?.text);
    });
  };

  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{
      width: '100%', height: '100%', p: 2, display: 'flex', gap: 2,
    }}
    >
      <Stack spacing={2} flexGrow={4}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={initialCenter}
          zoom={14}
          onLoad={handleMapLoad}
          options={{
            disableDefaultUI: true, // Disable all default user interface components
            styles: nightMode,
          }}
        >
          <MarkerF position={markerPosition} />
          {distance && <MarkerF position={destinationLocation} />}
        </GoogleMap>
        <Button
          variant="contained"
          onClick={() => map?.panTo(initialCenter)}
          sx={{ maxWidth: 200 }}
        >
          Где я?
        </Button>
      </Stack>
      <Stack spacing={2} flexGrow={3}>
        <TextField
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
          variant="outlined"
          color="secondary"
          placeholder="Куда хотите?"
          sx={{ bgcolor: 'white' }}
        />
        <Button variant="contained" onClick={createRoute}>
          Пошли!
        </Button>
        {distance !== '' && (
        <>
          <Typography sx={{ color: 'white', width: '100%' }}>
            Расстояние:
            {' '}
            {distance}
          </Typography>
          <Typography sx={{ color: 'white' }}>
            Время:
            {' '}
            {duration}

          </Typography>
          <Button variant="contained" onClick={clearRoute}>
            Удалить Маршрут
          </Button>
        </>
        )}

      </Stack>

    </Box>
  );
});
