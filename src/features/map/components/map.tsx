import React, { useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import NearMeIcon from '@mui/icons-material/NearMe';
import {
  Box, CircularProgress, TextField, Typography, IconButton, Button, Stack,
} from '@mui/material';
import {
  GoogleMap, MarkerF, useLoadScript,
} from '@react-google-maps/api';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';

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
  const { t } = useTranslation();
  const [map, setMap] = useState<null | google.maps.Map>(null);
  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [destinationName, setDestinationName] = useState<any>('');
  const navigate = useNavigate();
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
    <Box>
      <IconButton onClick={() => navigate('/')}>
        <Iconify icon="material-symbols:arrow-back-ios-new" sx={{ width: 24, height: 24 }} />
      </IconButton>
      <Box sx={{
        width: '100%',
        height: '100%',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 2,
      }}
      >
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: 2,
        }}
        >
          <Box sx={{
            display: 'flex', justifyContent: 'center', flexDirection: 'row', gap: 2,
          }}
          >
            <TextField
              value={destinationName}
              onChange={(e) => setDestinationName(e.target.value)}
              variant="outlined"
              color="secondary"
              placeholder="Куда хотите?"
              sx={{ bgcolor: 'white', minWidth: 250, borderRadius: 2 }}
            />
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                cursor: 'pointer',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #4f7dc1, #2aacf2)',
              }}
              onClick={createRoute}
            >
              <DirectionsCarIcon style={{ color: 'white' }} />
            </Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: 50,
                height: 50,
                cursor: 'pointer',
                borderRadius: '50%',
                background: 'linear-gradient(to right, #4f7dc1, #2aacf2)',
              }}
              onClick={() => map?.panTo(initialCenter)}
            >
              <NearMeIcon style={{ color: 'white' }} />
            </Box>
          </Box>
          <Box sx={{
            display: 'flex', justifyContent: 'center', gap: 2,
          }}
          >
            {distance !== '' && (
            <Box sx={{
              background: 'white',
              p: 1,
              color: 'black',
              borderRadius: 2,
            }}
            >
              <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              >
                <Typography variant="h6">
                  {duration}
                </Typography>
                <IconButton onClick={clearRoute}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Typography variant="body2">
                {distance}
                {' '}
                с пробками
              </Typography>
            </Box>
            )}
          </Box>
          <GoogleMap>
            <MarkerF position={markerPosition} />
          </GoogleMap>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={initialCenter}
            zoom={14}
            onLoad={handleMapLoad}
            options={{
              zoom: 14,
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
            {t('whereAmI')}
          </Button>
        </Box>
        <Stack spacing={2} flexGrow={3}>
          <TextField
            value={destinationName}
            onChange={(e) => setDestinationName(e.target.value)}
            variant="outlined"
            color="secondary"
            placeholder={t('whereToGo')}
            sx={{ bgcolor: 'white' }}
          />
          <Button variant="contained" onClick={createRoute}>
            {t('go')}
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

          <GoogleMap>
            <MarkerF position={markerPosition} />
          </GoogleMap>
        </Stack>

      </Box>
    </Box>

  );
});
