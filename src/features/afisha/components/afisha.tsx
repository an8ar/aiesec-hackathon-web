import React from 'react';

import { Box, Typography, IconButton } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import promotionsApi from '~/api/promotions/api';
import { Iconify } from '~/components/Iconify';

import CardList from './card-list';
import CardSkeleton from './card-skeleton';
import { SearchBar } from './search-bar';

export function Afisha() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const jerryId = searchParams.get('jerryId');

  const {
    data: deals = { promotions: [] },
    isSuccess,
    isFetching,
  } = promotionsApi.endpoints.getPromotions.useQuery(
    {
      jerryId: jerryId as string,
    },
    { skip: jerryId === null },
  );
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Box>
        <IconButton onClick={() => navigate('/')}>
          <Iconify icon="material-symbols:arrow-back-ios-new" sx={{ width: 24, height: 24 }} />
        </IconButton>
      </Box>
      <Box>
        <SearchBar />
        <Typography variant="h3" sx={{ color: 'white' }}>
          Акции рядом с вами
        </Typography>
        {isSuccess
      && <CardList promotions={deals?.promotions} />}
        {isFetching && <CardSkeleton />}

      </Box>
    </Box>
  );
}
