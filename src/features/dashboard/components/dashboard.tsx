import React from 'react';

import { Box } from '@mui/material';

import { Map } from '~/features/map';

import { ActionCards } from './action-cards';
import { AdvertisementCard } from './advertisement-card';

export function Dashboard() {
  return (
    <Box sx={{
      display: 'flex', flexDirection: 'column', height: '60vh', gap: 2,
    }}
    >
      <AdvertisementCard link="/advertisement.jpg" />
      <Box sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: 'repeat(2, 1fr)',
      }}
      >
        <ActionCards />
        <Map />
      </Box>
      <Box />
    </Box>
  );
}
