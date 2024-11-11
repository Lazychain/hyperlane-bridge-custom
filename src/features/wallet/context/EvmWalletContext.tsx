import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { PropsWithChildren, useMemo } from 'react';
import { getWarpCore } from '@/context/context';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { tryGetChainMetadata } from '@/features/chains/utils';
import { connectorConfig } from '../hooks/config';

const queryClient = new QueryClient();

export function EvmWalletContext(
  { children }: PropsWithChildren<unknown>) {

  const initialChain = useMemo(() => {
    const tokens = getWarpCore().tokens;
    const firstEvmToken = tokens.filter((token): boolean => token.protocol === ProtocolType.Ethereum)?.[0];
    const result = tryGetChainMetadata(firstEvmToken?.chainName);
    const chainName = result?.chainId as number;

    return chainName;
  }, []);

  return (
    <WagmiProvider config={connectorConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={initialChain} theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
