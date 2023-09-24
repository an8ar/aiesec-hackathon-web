import React from 'react';

import {
  Card, CardMedia,
} from '@mui/material';

export function AdvertisementCard({ link }:{link: string}) {
  return (
    <Card
      sx={{
        borderRadius: '16px',
        cursor: 'pointer',
        ':hover': {
          opacity: 0.8,
        },
      }}
    >
      <CardMedia
        component="img"
        image={link}
        alt="Фото карточка"
        width="100%"
        height="300px"
        style={{ objectFit: 'cover' }}
      />
    </Card>

  );
}
