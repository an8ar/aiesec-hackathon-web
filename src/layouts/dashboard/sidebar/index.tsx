import React from 'react';

import { Drawer, DrawerProps, styled } from '@mui/material';

import { SidebarFooter } from './SidebarFooter';
import { SidebarHeader } from './SidebarHeader';
import SidebarNavigation from './SidebarNavigation';

type Props = {
  open: boolean;
  onCloseSidebar: VoidFunction;
};

export function DashboardSidebar({ open, onCloseSidebar }: Props) {
  // return <RootStyle open={open}>{user && user.first}</RootStyle>;
  return (
    <DrawerStyle open={open}>
      <SidebarHeader onCloseSidebar={onCloseSidebar} />
      <SidebarNavigation />
      <SidebarFooter />
    </DrawerStyle>
  );
}

const DrawerStyle = styled(Drawer)<DrawerProps>(({ theme }) => ({
  '.MuiDrawer-paper': {
    backgroundColor: theme.palette.grey[800],
    width: '100%',
    paddingLeft: theme.spacing(2.5),
    paddingRight: theme.spacing(2.5),
    paddingBottom: theme.spacing(5),
  },
  zIndex: theme.zIndex.dashboardSideBar,
}));
