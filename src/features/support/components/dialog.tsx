import React, { useState } from 'react';

import {
  Box,
  Button, Dialog, DialogContent, DialogTitle, Skeleton, Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import promotionsApi from '~/api/promotions/api';
import { TypingAnimation } from '~/components/typing-animation';
import { useAppSelector } from '~/store';

type Props={
    open: boolean;
    onClose: VoidFunction;
}

export function SupportDialog({ open, onClose }:Props) {
  const { t } = useTranslation();
  const [questionAsked, setIsQuestionAsked] = useState<boolean>(false);

  const { jerry: jerrySelect } = useAppSelector((state) => state.jerrySlice);

  const { data, isLoading, isSuccess } = promotionsApi.endpoints.getSupportAnswer.useQuery(
    { jerryId: jerrySelect?.ID as string },
    { skip: !questionAsked },
  );

  const handleClose = () => {
    onClose();
    setIsQuestionAsked(false);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="lg">
      <DialogTitle>{t('whereToGo')}</DialogTitle>
      <DialogContent sx={{
        display: 'flex',
        width: 500,
        height: 500,
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
      >
        <Box sx={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1,
        }}
        >
          {!questionAsked
          && (
          <>
            <Typography variant="h6">
              {t('doNotKnow')}
            </Typography>
            <Typography variant="h6">
              {t('Jerry')}
            </Typography>
            <img
              src="support.jpg"
              height={300}
              width={300}
              alt="Support"
            />
            <Button color="info" variant="contained" onClick={() => setIsQuestionAsked(true)}>
              {
              t('askJerry')
              }
            </Button>
          </>
          )}
          {questionAsked
          && (
          <>
            {isLoading && (
            <Box width="100%" sx={{ mt: 2, gap: 2 }}>
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '500' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
              <Skeleton variant="text" sx={{ fontSize: '1rem', width: '100%' }} />
            </Box>
            )}
            {isSuccess && (<TypingAnimation message={data.message} />)}
          </>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}
