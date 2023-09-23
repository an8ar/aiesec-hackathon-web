import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import { Map } from '~/features/map';

export function MapPage() {
  return (
    <Page title="Homepage">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Map />
      </Container>
    </Page>
  );
}
