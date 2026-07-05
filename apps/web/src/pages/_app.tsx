import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "../theme";
import { ErrorBoundary } from "../components/ErrorBoundary";
import AppLayout from "../components/shell/AppLayout";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../lib/data/queryClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </ChakraProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}
