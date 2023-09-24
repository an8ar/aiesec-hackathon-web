import React from 'react';

import { ChevronLeft } from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import promotionsApi from '~/api/promotions/api';

import CardList from './card-list';
import { CardSkeleton } from './card-skeleton';
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
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Typography
        sx={{
          textDecoration: 'underline', color: 'white', display: 'flex', mb: 0.5, cursor: 'pointer',
        }}
        variant="h6"
        onClick={() => navigate('/')}
      >
        <ChevronLeft />
        Назад
      </Typography>
      <Box>
        <SearchBar />
        <Typography variant="h3" sx={{ color: 'white', my: 1 }}>
          Акции рядом с вами
        </Typography>
        {isSuccess
      && <CardList promotions={deals?.promotions} />}
        {isFetching && <CardSkeleton />}

      </Box>
    </Box>
  );
}
