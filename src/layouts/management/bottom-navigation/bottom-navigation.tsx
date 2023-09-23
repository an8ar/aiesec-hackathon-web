import React from 'react';

import {
  Box, styled,
} from '@mui/material';

import { useResponsive } from '~/hooks/useResponsive';

import { NAVIGATION_BUTTONS } from '../constants';
import { BottomNavigationButtons } from './BottomNavigationButtons';

export function BottomNavigation() {
  const isLaptop = useResponsive('up', 'sm');
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {!isLaptop
        ? (
          <BoxStyle>
            {NAVIGATION_BUTTONS.map((button) => (
              <BottomNavigationButtons
                activeIcon={button.activeIcon}
                defaultIcon={button.defaultIcon}
                route={button.route}
              />
            ))}
          </BoxStyle>
        )
        : null}
    </>
  );
}
const BoxStyle = styled(Box)(({ theme }) => ({
  position: 'fixed',
  height: 56,
  borderTop: '1px solid #E0E0E0',
  backgroundColor: 'white',
  zIndex: theme.zIndex.managementBottomNavigation,
  bottom: 0,
  left: 0,
  right: 0,
  marginBottom: 0,
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
}));
