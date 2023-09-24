import React, { useState } from 'react';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface LocationSelectorProps {
  onLocationSelect: (locationData: { address: string; location: { lat: number;
     lng: number } }) => void;
}

const containerStyle = {
  width: '100%',
  height: '400px',
};

const initialCenter = {
  lat: 51.09101,
  lng: 71.400222,
};

export function LocationSelector({ onLocationSelect }: LocationSelectorProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number;
     lng: number } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAlHw8ADaNMCZM4ArVpBpAWFk99N9cJ8Bo',
    libraries: ['places'],
  });

  const handleMapClick = async (e: google.maps.MapMouseEvent) => {
    setSelectedLocation({
      lat: e?.latLng?.lat() ? e?.latLng?.lat() : 0,
      lng: e?.latLng?.lng() ? e?.latLng?.lng() : 0,
    });

    const geocoder = new window.google.maps.Geocoder();
    try {
      const results = await geocoder.geocode({ location: e.latLng });
      if (results && results.results[0]) {
        onLocationSelect({
          address: results.results[0].formatted_address,
          location: {
            lat: e?.latLng?.lat() ? e?.latLng?.lat() : 0,
            lng: e?.latLng?.lng() ? e?.latLng?.lng() : 0,
          },
        });
      }
    } catch (error) {
      console.error('Error geocoding:', error);
    }
  };

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={initialCenter}
      zoom={14}
      onClick={handleMapClick}
    >
      {selectedLocation && (
        <Marker position={selectedLocation} />
      )}
    </GoogleMap>
  );
}
