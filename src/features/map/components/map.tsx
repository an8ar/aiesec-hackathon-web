import React from 'react';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px',
};

export const Map = React.memo(() => {
  const center = {
    lat: 51.09101,
    lng: 71.400222,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAlHw8ADaNMCZM4ArVpBpAWFk99N9cJ8Bo',
  });

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
    >
      <Marker
        position={center}
      />

    </GoogleMap>
  ) : (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  );
});
