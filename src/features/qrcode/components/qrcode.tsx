import React from 'react';

import { Box } from '@mui/material';
import QRCode from 'react-qr-code';

interface QRProps {
  url: string
}

export function Qrcode({ url }:QRProps) {
  return (
    <Box>
      <QRCode
        size={80}
        value={url}
        viewBox="0 0 256 256"
      />
    </Box>
  );
}
