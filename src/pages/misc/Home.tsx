import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import Camera from '~/components/SOS/Webcam/Webcam';
import { BottomButtons, Dashboard } from '~/features/dashboard';
import { SupportDialog } from '~/features/support';

export function HomePage() {
  const [open, setOpen] = React.useState(false);

  const [openSupport, setOpenSupport] = React.useState(false);

  const handleClickOpen = () => setOpen(true);
  return (
    <Page title="Homepage">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Dashboard />
        <Camera open={open} setOpen={setOpen} />
        <SupportDialog open={openSupport} onClose={() => setOpenSupport(false)} />
        <BottomButtons
          handleClickOpen={
          handleClickOpen
        }
          handleOpenSupport={() => setOpenSupport(true)}
        />
      </Container>
    </Page>
  );
}
