import React from 'react';

import HeaderComponent from '~/components/Header/Header.component';
import { Page } from '~/components/Page';
import { Map } from '~/features/map';

export function HomePage() {
  return (
    <Page title="Homepage">
      <div style={{
        padding: '10px 20px',
      }}
      >
        <HeaderComponent />
      </div>
      <Map />
    </Page>
  );
}
