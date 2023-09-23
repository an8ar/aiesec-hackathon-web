import React from 'react';

import { Outlet } from 'react-router-dom';

import { PATH_AUTH } from '~/routes/paths';

type Props = {
  redirectPath?: string;
  children?: React.ReactElement;
};

export function ProtectedRoute({
  redirectPath = PATH_AUTH.login,
  children,
}: Props) {
  return children || <Outlet />;
}
