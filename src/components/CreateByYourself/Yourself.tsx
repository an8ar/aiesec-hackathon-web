import React from 'react';

import { ChevronLeft } from '@mui/icons-material';
import { Container, Box, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetEventsQuery } from '~/api/events/api';
import { CardSkeleton, SearchBar } from '~/features/afisha';

import HeaderComponent from '../Header/Header.component';
import { Page } from '../Page';
import { CardList } from './Filter/CardList';

export function Yourself() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const jerryId = searchParams.get('jerryId');

  const {
    data = { events: [] }, isFetching, isError, isSuccess,
  } = useGetEventsQuery(jerryId as string, { skip: jerryId === null });
  return (
    <Page title="Sxodim">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column' }}>
        <HeaderComponent />
        <Box sx={{ mt: 2 }}>
          <Typography
            variant="h6"
            sx={{
              textDecoration: 'underline',
              color: 'white',
              display: 'flex',
              mb: 0.5,

              cursor: 'pointer',
            }}
            onClick={() => navigate('/')}
          >
            <ChevronLeft />
            Назад
          </Typography>
        </Box>
        <Box>
          <SearchBar />
          {isFetching && <CardSkeleton />}
          {isSuccess
        && <CardList eventsList={data.events} />}
        </Box>
      </Container>
    </Page>
  );
}
