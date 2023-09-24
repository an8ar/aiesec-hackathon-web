import React from 'react';

import NavigationIcon from '@mui/icons-material/Navigation';
import {
  Box, CardContent, Typography, Card,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export function MapCard() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Box sx={{ my: 1, width: '100%' }} onClick={() => navigate('map')}>
      <Card sx={{
        background: 'linear-gradient(to right, #6bb386, #384a4c)',
        px: 4,
        borderRadius: '16px',
        height: '100%',
        py: 4,
        width: '100%',
      }}
      >
        <Box sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 50,
          height: 50,
          borderRadius: '50%',
          background: 'linear-gradient(to right, #79f5f1, #2bf5c9)',
        }}
        >
          <NavigationIcon sx={{ color: 'white' }} />
        </Box>

        <CardContent sx={{ mt: 1, p: 0, width: '100%' }}>
          <Typography variant="h3" sx={{ color: 'white' }}>
            {t('card')}
          </Typography>
        </CardContent>
        <Box sx={{ w: 100, h: 100, bgcolor: 'lightcoral' }} />
      </Card>
    </Box>

  );
}
