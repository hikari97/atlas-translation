import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../lib/state/store';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '../lib/data/queryClient';
import { ErrorBoundary } from '../components/ErrorBoundary';
import AppLayout from '../components/shell/AppLayout';
import { Provider as ChakraRootProvider } from '../components/ui/provider';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const isStandalone = router.pathname === '/'
    || router.pathname.startsWith('/auth/')
    || router.pathname === '/dashboard/images'
    || router.pathname.startsWith('/editor/');

  return (
    <ErrorBoundary>
      <ReduxProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <ChakraRootProvider defaultTheme="light" enableSystem={false} forcedTheme="light">
            {isStandalone ? (
              <Component {...pageProps} />
            ) : (
              <AppLayout>
                <Component {...pageProps} />
              </AppLayout>
            )}
          </ChakraRootProvider>
        </QueryClientProvider>
      </ReduxProvider>
    </ErrorBoundary>
  );
}
