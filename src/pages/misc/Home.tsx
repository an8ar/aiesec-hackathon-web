import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import Camera from '~/components/SOS/Webcam/Webcam';
import { BottomButtons, Dashboard } from '~/features/dashboard';

export function HomePage() {
  return (
    <Page title="Homepage">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Dashboard />
        <Camera />
        <div style={{ height: '100vh' }} />
        <BottomButtons />
      </Container>
    </Page>
  );
}
