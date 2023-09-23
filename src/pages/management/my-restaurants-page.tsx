import React from 'react';

import { Page } from '~/components/Page';
import { Restaurants } from '~/features/management';

export function MyRestaurantsPage() {
  return (
    <Page title="My Restaurants">
      <Restaurants />
    </Page>
  );
}
