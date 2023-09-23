function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '';
const ROOTS_MANAGEMENT = '/management';
const ROOTS_TICKETS = 'tickets';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
};

export const PATH_MANAGEMENT = {
  root: ROOTS_MANAGEMENT,
  myRestaurants: path(ROOTS_MANAGEMENT, '/restaurants'),
  profile: path(ROOTS_MANAGEMENT, '/profile'),
  addRestaurant: path(ROOTS_MANAGEMENT, '/add'),
  restaurantDetails: (id: number) => path(ROOTS_MANAGEMENT, `/restaurants/${id}`),
  menu: (id:number) => path(ROOTS_MANAGEMENT, `restaurants/${id}/menu`),
  orders: (id:number) => path(ROOTS_MANAGEMENT, `restaurants/${id}/orders`),
  settings: (id:number) => path(ROOTS_MANAGEMENT, `restaurants/${id}/settings`),
  employees: (id:number) => path(ROOTS_MANAGEMENT, `restaurants/${id}/employees`),
};

export const PATH_PAGE = {
  home: '/',
  page403: '/403',
  page404: '/404',
  page500: '/500',
};

export const PATH_TICKETS = {
  root: ROOTS_TICKETS,
};
