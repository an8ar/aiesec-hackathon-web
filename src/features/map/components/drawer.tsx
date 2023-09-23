import React from 'react';

import { RightDrawer } from '~/components/right-drawer';

import { Map } from './map';

interface DrawerProps{
    onOpen: ()=>void,
    onClose: ()=> void
    open: boolean
}
export function MapDrawer({ onClose, onOpen, open }:DrawerProps) {
  return (
    <RightDrawer
      onClose={onClose}
      onOpen={onOpen}
      open={open}
    >
      <Map />

    </RightDrawer>
  );
}

// children, onClose, onOpen, ...drawerProps
