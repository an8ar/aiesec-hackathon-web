import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';

import SelfEventForm from './self-event-form';

export function SelfEvent() {
  const navigate = useNavigate();
  return (
    <Box>
      <IconButton onClick={() => navigate('/')}>
        <Iconify icon="material-symbols:arrow-back-ios-new" sx={{ width: 24, height: 24 }} />
      </IconButton>
      <Typography color="white" variant="h4"> Введите данные про мероприятие </Typography>
      <SelfEventForm />
    </Box>
  );
}
