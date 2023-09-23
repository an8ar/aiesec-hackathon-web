import React from 'react';

import { Page } from '~/components/Page';
import { UserProfile } from '~/features/management';

export function ManagerProfilePage() {
  return (
    <Page title="Manager Profile">
      <UserProfile />
    </Page>
  );
}
