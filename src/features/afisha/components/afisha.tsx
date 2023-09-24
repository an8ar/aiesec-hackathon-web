import React from 'react';

import { Box, Typography } from '@mui/material';

import promotionsApi from '~/api/promotions/api';

import CardList from './card-list';
import CardSkeleton from './card-skeleton';
import { SearchBar } from './search-bar';

export function Afisha() {
  const {
    data: deals = { promotions: [] },
    isSuccess,
    isFetching,
  } = promotionsApi.endpoints.getPromotions.useQuery({ jerryId: 'jerry3' });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <SearchBar />
      <Typography variant="h3" sx={{ color: 'white' }}>
        Акции рядом с вами
      </Typography>
      {isSuccess
      && <CardList promotions={deals?.promotions} />}
      {isFetching && <CardSkeleton />}
    </Box>
  );
}
