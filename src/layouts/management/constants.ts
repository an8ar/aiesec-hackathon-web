import { PATH_MANAGEMENT } from '~/routes/paths';

export const NAVIGATION_BUTTONS = [
  {
    activeIcon: 'material-symbols:store-rounded',
    defaultIcon: 'material-symbols:store-outline-rounded',
    route: PATH_MANAGEMENT.myRestaurants,
  },
  {
    activeIcon: 'material-symbols:add-circle-rounded',
    defaultIcon: 'material-symbols:add-circle-outline-rounded',
    route: PATH_MANAGEMENT.addRestaurant,
  },
  {
    activeIcon: 'material-symbols:person-rounded',
    defaultIcon: 'material-symbols:person-outline-rounded',
    route: PATH_MANAGEMENT.profile,
  },
];

export const BOTTOM_NAVIGATION = {
  BOTTOM_NAVIGATION_HEIGHT: 56,
};
export const HEADER = {
  HEADER_HEIGHT: 56,
};
