import React from 'react';

import { ManagementLayout } from '~/layouts/management';

import { RestaurantsList } from './restaurants-list';

export function Restaurants() {
  return (
    <ManagementLayout>
      <RestaurantsList />
    </ManagementLayout>
  );
}
