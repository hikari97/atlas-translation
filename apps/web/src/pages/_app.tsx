import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider } from 'react-redux';
import { store } from '../lib/state/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/data/queryClient';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import AppLayout from '../components/shell/AppLayout';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isStandalone = router.pathname === '/' || router.pathname.startsWith('/auth/');

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraProvider value={defaultSystem}>
            {isStandalone ? (
              <Component {...pageProps} />
            ) : (
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            )}
          </ChakraProvider>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
}
