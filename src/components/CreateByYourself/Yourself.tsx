import React from 'react';

import { Container } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import { useGetEventsQuery } from '~/api/events/api';
import { SearchBar } from '~/features/afisha';

import HeaderComponent from '../Header/Header.component';
import { Page } from '../Page';
import { CardList } from './Filter/CardList';

export function Yourself() {
  const [searchParams, setSearchParams] = useSearchParams();

  const jerryId = searchParams.get('jerryId');

  const {
    data = { events: [] }, isLoading, isError, isSuccess,
  } = useGetEventsQuery(jerryId as string, { skip: jerryId === null });
  return (
    <Page title="Sxodim">
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <HeaderComponent />
        <SearchBar />
        {isSuccess
        && <CardList eventsList={data.events} />}
      </Container>
    </Page>
  );
}
