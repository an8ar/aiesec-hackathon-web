import React from 'react';

import { Container } from '@mui/material';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import TelCam from '~/components/SOS/TelCam/TelCam';
import Camera from '~/components/SOS/Webcam/Webcam';
import { BottomButtons, Dashboard } from '~/features/dashboard';
import { SupportDialog } from '~/features/support';

export function HomePage() {
  const [open, setOpen] = React.useState(false);

  const [openSupport, setOpenSupport] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const [openTelegram, setOpenTelegram] = React.useState(false);
  return (
    <Page title="Homepage">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Dashboard />
        <Camera open={open} setOpen={setOpen} />
        <TelCam open={openTelegram} setOpen={setOpenTelegram} />
        <SupportDialog open={openSupport} onClose={() => setOpenSupport(false)} />
        <div style={{ height: '100vh' }} />
        <BottomButtons
          handleClickOpen={
          handleClickOpen
        }
          setOpenTelegram={setOpenTelegram}
          handleOpenSupport={() => setOpenSupport(true)}
        />
      </Container>
    </Page>
  );
}
