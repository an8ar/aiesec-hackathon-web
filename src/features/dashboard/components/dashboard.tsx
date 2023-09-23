import React, { useState } from 'react';

import { Box, Button } from '@mui/material';

import { MapCard, MapDrawer } from '~/features/map';
import { Qrcode } from '~/features/qrcode';

import { ActionCards } from './action-cards';
import { AdvertisementCard } from './advertisement-card';

export function Dashboard() {
  const [openDrawer, setOpenDrawer] = useState(false);
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
        <MapDrawer
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          onOpen={() => setOpenDrawer(true)}
        />
        <MapCard />
        <Button onClick={() => setOpenDrawer(true)}>
          Open Drawer
        </Button>
        <Qrcode url="https://www.google.com/" />
      </Box>
      <Box />
    </Box>
  );
}
