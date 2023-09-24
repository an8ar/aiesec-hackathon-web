/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState } from 'react';

import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api';

import { useGetEventsQuery } from '~/api/events/api';
import promotionsApi from '~/api/promotions/api';
import { nightMode } from '~/features/map/components/night-mode-props';
import { Qrcode } from '~/features/qrcode';

const containerStyle = {
  width: '400px',
  height: '400px',
};

const initialCenter = {
  lat: 51.09101,
  lng: 71.400222,
};

export const MapFilter = React.memo(({ id, value }: { id: string; value?: string }) => {
  const { data } = useGetEventsQuery(value || '');
  const {
    data: deals = { promotions: [] },
    isSuccess,
    isFetching,
  } = promotionsApi.endpoints.getPromotions.useQuery({ jerryId: 'jerry3' });

  const selectedChoco = deals?.promotions.find((item) => item.id === id);

  const jerrys = JSON.parse(localStorage.getItem('jerry') || '{}');
  console.log(jerrys);

  const selectedData = data?.events.find((item) => item.id === id);

  const [map, setMap] = useState<null | google.maps.Map>(null);

  const [markerPosition, setMarkerPosition] = useState(initialCenter);
  const [destinationName, setDestinationName] = useState<string>('');

  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  const [distance, setDistance] = useState<string | undefined>('');
  const [duration, setDuration] = useState<string | undefined>('');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlHw8ADaNMCZM4ArVpBpAWFk99N9cJ8Bo',
    libraries: ['places'],
  });

  const handleMapLoad = (m: google.maps.Map) => {
    setMap(m);
  };

  const createRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer();
    setDirectionsRenderer(renderer);
    directionsService
      .route({
        origin: `${jerrys?.Latitude}, ${jerrys?.Longitude}`,
        destination: selectedData ? `${selectedData?.address}` : `${selectedChoco?.address}`,
        travelMode: google.maps.TravelMode.WALKING,
      })
      .then((res) => {
        renderer.setOptions({
          directions: res,
          suppressMarkers: true,
          map,
          polylineOptions: { strokeColor: 'yellow' },
        });

        setDistance(res.routes[0].legs[0].distance?.text);
        setDuration(res.routes[0].legs[0].duration?.text);
      });
  };

  const [showQR, setShowQR] = useState<boolean>(false);

  React.useLayoutEffect(() => {
    if (map) {
      createRoute();
    }
  }, [map]);

  if (!isLoaded) {
    return <CircularProgress />;
  }

  return (
    <>
      {!showQR
      && (
        <Box sx={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 2,
        }}
        >
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
          </GoogleMap>
          <Box sx={{ alignSelf: 'center', mt: 2 }}>
            <Button variant="contained" color="info" onClick={() => setShowQR(true)}>
              Хотите получить маршрут на телефон?
            </Button>
          </Box>
        </Box>
      )}
      {showQR
        && (
        <Box sx={{
          display: 'flex', justifyContent: 'center', flexDirection: 'column', mt: 1,
        }}
        >
          <Typography variant="h6" sx={{ color: 'white', mb: 2 }}>
            Ваш маршрут построен:
          </Typography>
          <Qrcode
            url={`https://www.google.com/maps/search/?api=1&query=${data?.events[0].latitude},${data?.events[0].longitude}`}
          />
        </Box>
        )}
    </>
  );
});
