import React from 'react';

import { Box, useTheme, styled } from '@mui/material';
import { Link } from 'react-router-dom';

import { Iconify } from '~/components/Iconify';

import { DASHBOARD_HELP_NAVIGATION } from '../constants';

function HeaderIcon({ icon, path }: Record<'icon' | 'path', string>) {
  const theme = useTheme();

  return (
    <Link style={{ height: 24 }} to={path}>
      <Iconify color={theme.palette.grey[500]} icon={icon} width={24} height={24} />
    </Link>
  );
}

export function HeaderInfo() {
  return (
    <RootStyle>
      {DASHBOARD_HELP_NAVIGATION.map(({ icon, path, title }) => (
        <HeaderIcon icon={icon} path={path} key={title + path} />
      ))}
    </RootStyle>
  );
}

const RootStyle = styled(Box)(({ theme }) => ({
  gap: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
}));
