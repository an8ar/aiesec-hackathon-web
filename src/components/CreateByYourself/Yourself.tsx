import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '../Header/Header.component';
import { Page } from '../Page';
import { Filter } from './Filter/Filter';

export function Yourself() {
  return (
    <Page title="Sxodim">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Filter />
      </Container>
    </Page>
  );
}
