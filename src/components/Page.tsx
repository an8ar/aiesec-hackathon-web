import React from 'react';

import { Box } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { APPLICATION_NAME } from '~/config';

type Props = {
  children: React.ReactNode;
  meta?: React.ReactNode;
  title: string;
};

export function Page({ children, meta, title }: Props) {
  return (
    <>
      <Helmet>
        <title>{`${title} | ${APPLICATION_NAME}`}</title>
        {meta}
        <style>{'body { background-color: #F4F6F8; }'}</style>
      </Helmet>

      <Box>{children}</Box>
    </>
  );
}
