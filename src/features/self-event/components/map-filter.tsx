/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-imports */
import React, { useState } from 'react';

import {
  Box, Button, CircularProgress, Typography,
} from '@mui/material';
import {
  GoogleMap, MarkerF, useLoadScript,
} from '@react-google-maps/api';

import { useGetSelfEventQuery } from '~/api/events/api';
import promotionsApi from '~/api/promotions/api';
import { JERRYS } from '~/constants/jerry';
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

export const MapFilter = React.memo(({
  id, value,
}: {id: string, value?: string}) => {
  const { data } = useGetSelfEventQuery(value || '');
  const {
    data: deals = { promotions: [] },
    isSuccess,
    isFetching,
  } = promotionsApi.endpoints.getPromotions.useQuery({ jerryId: 'jerry3' });
  const selectedChoco = deals?.promotions.find((item) => item.id === id);

  const jerrys = localStorage.getItem('jerry');

  const selectedData = data?.events.find((item) => item.id === id);

  const [map, setMap] = useState<null | google.maps.Map>(null);

  const [destinationName, setDestinationName] = useState<string>('');

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
  const fountJerrySxodim = JERRYS.find((item) => item.ID === value);
  const foundJerryChoco = JERRYS.find((item) => item.ID === selectedChoco?.id);

  const [markerPosition, setMarkerPosition] = useState({
    lat: fountJerrySxodim?.Latitude ? fountJerrySxodim?.Latitude : initialCenter.lat,
    lng: fountJerrySxodim?.Longitude ? fountJerrySxodim?.Longitude : initialCenter.lng,
  });

  const createRoute = () => {
    const directionsService = new google.maps.DirectionsService();
    const renderer = new google.maps.DirectionsRenderer();
    setDirectionsRenderer(renderer);
    directionsService.route({
      origin: fountJerrySxodim ? `${fountJerrySxodim?.Latitude}, ${fountJerrySxodim?.Longitude}` : `${foundJerryChoco?.Latitude}, ${foundJerryChoco?.Longitude}`,
      destination: selectedData ? `${selectedData?.address}` : `${selectedChoco?.address}`,
      travelMode: google.maps.TravelMode.WALKING,
    }).then((res) => {
      renderer.setOptions({
        directions: res, suppressMarkers: true, map, polylineOptions: { strokeColor: 'yellow' },
      });

      setDistance(res.routes[0].legs[0].distance?.text);
      setDuration(res.routes[0].legs[0].duration?.text);
    });
  };
  React.useLayoutEffect(() => {
    if (map) {
      console.log(data);
      createRoute();
    }
  }, [map]);

  if (!isLoaded) {
    return <CircularProgress />;
  }
  return (
    <Box sx={{
      width: '100%', height: '100%', p: 2,
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
      <Button
        variant="contained"
        style={{
          display: 'block', margin: '0 auto', marginTop: '10px',
        }}
        onClick={() => map?.panTo(initialCenter)}
      >
        Где я?
      </Button>
      <Box onClick={() => console.log(data?.events[0].latitude)}>
        <Typography>Показать маршрут на телефон</Typography>
        <Qrcode
          url={`https://www.google.com/maps/search/?api=1&query=${data?.events[0].latitude},${data?.events[0].longitude}}`}
        />
      </Box>

    </Box>
  );
});
