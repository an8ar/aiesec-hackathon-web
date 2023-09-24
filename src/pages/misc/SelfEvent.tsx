import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import { SelfEvent } from '~/features/self-event';

export function SelfEventPage() {
  return (
    <Page title="SelfEvent">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <SelfEvent />
      </Container>
    </Page>
  );
}
