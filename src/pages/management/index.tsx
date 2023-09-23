import React from 'react';

import { Route } from 'react-router-dom';

import { lazyImport } from '~/utils/lazyImport';

const { ManagerProfilePage } = lazyImport(
  () => import('./manager-profile-page'),
  'ManagerProfilePage',
);
const { AddRestaurantPage } = lazyImport(
  () => import('./add-restaurant-page'),
  'AddRestaurantPage',
);
const { MyRestaurantsPage } = lazyImport(
  () => import('./my-restaurants-page'),
  'MyRestaurantsPage',
);
const { RestaurantDetailsPage } = lazyImport(
  () => import('./restaurant-details-page'),
  'RestaurantDetailsPage',
);

export const ManagementRoutes = [
  <Route path="/management/profile" element={<ManagerProfilePage />} key="profile" />,
  <Route path="/management/add" element={<AddRestaurantPage />} key="add" />,
  <Route path="/management/restaurants" element={<MyRestaurantsPage />} key="restaurants" />,
  <Route
    path="/management/restaurants/:id"
    element={<RestaurantDetailsPage />}
    key="restaurant-details"
  />,
];
