import React from 'react';

import { Page } from '~/components/Page';
import { Map } from '~/features/map';

export function HomePage() {
  return (
    <Page title="Homepage">
      <h1>HomePage</h1>
      <Map />
    </Page>
  );
}
