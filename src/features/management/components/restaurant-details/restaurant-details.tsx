import React from 'react';

import {
  Avatar, Box, Typography, Button,
} from '@mui/material';
import styled from 'styled-components';

import { ManagementLayout } from '~/layouts/management';

export function RestaurantDetails() {
  return (
    <ManagementLayout>
      <BoxStyle>
        <Box display="flex" flexDirection="row">
          <Avatar
            // eslint-disable-next-line max-len
            src="http://img1.feinfood.com/upload/hotel2/20200905/11fe752eeeab4f0da1e99d487bb0410c.jpg"
            sx={{ height: 96, width: 96, mr: 2 }}
          />
          <Box display="flex" flexDirection="column">
            <Typography variant="h6">
              Яkитория
            </Typography>
            <Typography variant="caption" component="p" sx={{ color: 'grey.600' }}>
              г. Астана, Туран 38
            </Typography>
            <Button
              sx={{ mt: 1, px: 3, bgcolor: 'black' }}
              variant="contained"
              size="small"
            >
              Редактировать
            </Button>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          sx={{
            mt: 3,
            backgroundColor: 'white',
            width: '100%',
            borderRadius: 1,
            padding: 2,
          }}
        >
          <ImageStyle
            // eslint-disable-next-line max-len
            src="https://www.unitag.io/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ftemplate_classic.746b0922.png&w=3840&q=75"
            alt="QrCode"
            width="96px"
            height="96px"
            loading="lazy"
          />
          <Box>
            <Typography variant="body2" sx={{ mb: 1 }}>
              Нажмите на QR для того чтобы скачать
            </Typography>
            <Typography variant="caption" color="grey.600" component="p">
              Распечатайте скачанный QR в своем заведении
            </Typography>
          </Box>
        </Box>
        <Typography variant="h6" sx={{ mt: 3, mb: 3 }}>
          Управление рестораном
        </Typography>
        <Box />
      </BoxStyle>
    </ManagementLayout>
  );
} const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
}));
const ImageStyle = styled('img')(({ theme }) => ({
  borderRadius: theme.spacing(1),
  border: '1px solid black',
  marginRight: theme.spacing(2),
}));
