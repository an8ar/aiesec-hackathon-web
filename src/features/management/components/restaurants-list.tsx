import React from 'react';

import { Box, styled, Typography } from '@mui/material';

import { RestaurantCard } from './restaurant-card';

export function RestaurantsList() {
  const Restaurants = [
    {
      name: 'Якитория',
      id: 1,
      address: 'г. Астана, Туран 38',
      description: 'Суши-бар «Yakitoriya Туран», кухня Японская',
    },
    {
      name: 'Якитория',
      id: 2,
      address: 'г. Астана, Туран 38',
      description: 'Суши-бар «Yakitoriya Туран», кухня Японская',
    },
    {
      name: 'Якитория',
      id: 3,
      address: 'г. Астана, Туран 38',
      description: 'Суши-бар «Yakitoriya Туран», кухня Японская',
    },
    {
      name: 'Якитория',
      id: 4,
      address: 'г. Астана, Туран 38',
      description: 'Суши-бар «Yakitoriya Туран», кухня Японская',
    },
    {
      name: 'Якитория',
      id: 5,
      address: 'г. Астана, Туран 38',
      description: 'Суши-бар «Yakitoriya Туран», кухня Японская',
    },
  ];
  // http://img1.feinfood.com/upload/hotel2/20200905/11fe752eeeab4f0da1e99d487bb0410c.jpg
  return (
    <BoxStyle>
      <Typography variant="h6" sx={{ marginBottom: 3 }}>
        Мои рестораны
      </Typography>
      <Box display="grid" gap={2}>
        {Restaurants.map((restaurant) => (
          <RestaurantCard
            name={restaurant.name}
            address={restaurant.address}
            description={restaurant.description}
            id={restaurant.id}
          />
        ))}
      </Box>
    </BoxStyle>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginTop: theme.spacing(3),
}));
