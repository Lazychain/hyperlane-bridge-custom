import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import '@hyperlane-xyz/widgets/styles.css';

import { ErrorBoundary } from '../components/errors/ErrorBoundary';
import { AppLayout } from '../components/layout/AppLayout';
import { CosmosWalletContext } from '../features/wallet/context/CosmosWalletContext';
import { EvmWalletContext } from '../features/wallet/context/EvmWalletContext';
import '../styles/fonts.css';
import '../styles/globals.css';
import { useIsSsr } from '../utils/ssr';

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  // Disable app SSR for now as it's not needed and
  // complicates graphql integration
  const isSsr = useIsSsr();
  if (isSsr) {
    return <div></div>;
  }

  return (

    <ErrorBoundary>
      <EvmWalletContext>
        <CosmosWalletContext>
          <QueryClientProvider client={reactQueryClient}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </QueryClientProvider>
          <ToastContainer transition={Zoom} position={'bottom-right'} limit={2} />
        </CosmosWalletContext>
      </EvmWalletContext>
    </ErrorBoundary>


  );
}
