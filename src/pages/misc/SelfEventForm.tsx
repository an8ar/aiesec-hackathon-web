import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import { Form } from '~/features/self-event';

export function SelfEventFormPage() {
  return (
    <Page title="SelfEventForm">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Form />
      </Container>
    </Page>
  );
}
