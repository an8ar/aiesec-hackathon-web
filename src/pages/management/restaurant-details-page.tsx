import React from 'react';

import { Page } from '~/components/Page';
import { RestaurantDetails } from '~/features/management';

export function RestaurantDetailsPage() {
  return (
    <Page title="Restaurant Details">
      <RestaurantDetails />
    </Page>
  );
}
