import React from 'react';

import { Container, IconButton, Box } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { useGetEventsQuery } from '~/api/events/api';
import { CardSkeleton, SearchBar } from '~/features/afisha';

import HeaderComponent from '../Header/Header.component';
import { Iconify } from '../Iconify';
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
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <Box>
          <IconButton onClick={() => navigate('/')}>
            <Iconify icon="material-symbols:arrow-back-ios-new" sx={{ width: 24, height: 24 }} />
          </IconButton>
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
