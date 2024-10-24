import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { WagmiProvider, http } from 'wagmi';

import { mainnet } from 'viem/chains';

import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { APP_NAME } from '@/consts/app';
import { config } from '@/consts/config';
import { PropsWithChildren } from 'react';
import { getWarpCore } from '@/context/context';
import { ProtocolType } from '@hyperlane-xyz/utils';
import { tryGetChainMetadata } from '@/features/chains/utils';

import { useMemo } from 'react';

const connectorConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId: config.walletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

const queryClient = new QueryClient();

export function EvmWalletContext(
  { children }: PropsWithChildren<unknown>) {
  const initialChain = useMemo(() => {
    const tokens = getWarpCore().tokens;
    const firstEvmToken = tokens.filter((token): boolean => token.protocol === ProtocolType.Ethereum)?.[0];
    return tryGetChainMetadata(firstEvmToken?.chainName)?.chainId as number;
  }, []);
  return (
    <WagmiProvider config={connectorConfig}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider initialChain={initialChain}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
