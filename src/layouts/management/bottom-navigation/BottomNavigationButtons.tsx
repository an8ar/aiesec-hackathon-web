import React from 'react';

import { Box, IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

import { Iconify } from '../../../components/Iconify';

type IconButtonProps={
activeIcon: string,
defaultIcon:string,
route: string,
}
export function BottomNavigationButtons({ activeIcon, defaultIcon, route }:IconButtonProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === route;
  return (
    <Box>

      {isActive && (
        <IconButton sx={{ color: 'black' }}>
          <Iconify icon={activeIcon} />
        </IconButton>
      )}

      {!isActive && (
        <IconButton
          onClick={() => {
            navigate(route);
          }}
          sx={{ color: 'black' }}
        >
          <Iconify icon={defaultIcon} />
        </IconButton>
      )}
    </Box>
  );
}
