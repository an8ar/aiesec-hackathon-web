import * as React from 'react';

import { Button, CircularProgress } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { SnackbarProvider } from 'notistack';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';

import i18n from '~/components/I18n';
import { store } from '~/store';
import ThemeProvider from '~/theme';

function ErrorFallback() {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </Button>
    </div>
  );
}

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <React.Suspense
      fallback={(
        <div className="flex items-center justify-center w-screen h-screen">
          <CircularProgress />
        </div>
      )}
    >
      <SnackbarProvider anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <HelmetProvider>
            <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <I18nextProvider i18n={i18n}>
                  <ThemeProvider>{children}</ThemeProvider>
                </I18nextProvider>
              </LocalizationProvider>
            </Provider>
          </HelmetProvider>
        </ErrorBoundary>
      </SnackbarProvider>
    </React.Suspense>
  );
}
