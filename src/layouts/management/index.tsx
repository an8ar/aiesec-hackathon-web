import React from 'react';

import { Box, styled } from '@mui/material';
import { Outlet } from 'react-router-dom';

import { BottomNavigation } from './bottom-navigation/bottom-navigation';
import { BOTTOM_NAVIGATION, HEADER } from './constants';
import { Header } from './header/Header';

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})(({ theme }) => ({
  flexGrow: 1,
  paddingBottom: BOTTOM_NAVIGATION.BOTTOM_NAVIGATION_HEIGHT,
  paddingTop: HEADER.HEADER_HEIGHT,
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
}));

type LayoutProps = {
    children?: React.ReactElement;
  };

export function ManagementLayout({ children }: LayoutProps) {
  return (
    <Box display="flex" flexDirection="column" sx={{ height: '100vh' }}>
      <Header />
      <MainStyle>{children || <Outlet />}</MainStyle>
      <BottomNavigation />
    </Box>
  );
}
