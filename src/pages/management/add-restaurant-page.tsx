import React from 'react';

import { Page } from '~/components/Page';
import { AddRestaurants } from '~/features/management';

export function AddRestaurantPage() {
  return (
    <Page title="New Restaurant">
      <AddRestaurants />
    </Page>
  );
}
