import type { AssetList, Chain as CosmosChain } from '@chain-registry/v2-types';
import type { Chain as WagmiChain } from 'viem';

import { ChainName, chainMetadataToWagmiChain } from '@hyperlane-xyz/sdk';
import { ProtocolType } from '@hyperlane-xyz/utils';

import { getWarpContext } from '../../context/context';

// Metadata formatted for use in Wagmi config
export function getWagmiChainConfig(): WagmiChain[] {
  const evmChains = Object.values(getWarpContext().chains).filter(
    (c) => !c.protocol || c.protocol === ProtocolType.Ethereum,
  );
  return evmChains.map(chainMetadataToWagmiChain);
}

export function getCosmosKitConfig(): { chains: CosmosChain[]; assets: AssetList[] } {
  const cosmosChains = Object.values(getWarpContext().chains).filter(
    (c) => c.protocol === ProtocolType.Cosmos,
  );
  const chains = cosmosChains.map((c) => ({
    chainName: c.name,
    chainType: <const>'cosmos',
    status: <const>'live',
    networkType: c.isTestnet ? <const>'testnet' : <const>'mainnet',
    prettyName: c.displayName || c.name,
    chainId: c.chainId as string,
    bech32Prefix: c.bech32Prefix!,
    slip44: c.slip44!,
    apis: {
      rpc: [
        {
          address: c.rpcUrls[0].http,
          provider: c.displayName || c.name,
        },
      ],
      rest: c.restUrls
        ? [
          {
            address: c.restUrls[0].http,
            provider: c.displayName || c.name,
          },
        ]
        : [],
    },
    fees: {
      feeTokens: [
        {
          denom: 'token',
        },
      ],
    },
    staking: {
      stakingTokens: [
        {
          denom: 'stake',
        },
      ],
    },
  }));
  const assets = cosmosChains.map((c) => {
    if (!c.nativeToken) throw new Error(`Missing native token for ${c.name}`);
    return {
      chainName: c.name,
      typeAsset: <const>'cw20',
      assets: [
        {
          description: `The native token of ${c.displayName || c.name} chain.`,
          denomUnits: [
            {
              denom: 'token',
              exponent: c.nativeToken.decimals,
            },
          ],
          base: 'token',
          name: 'token',
          display: 'token',
          symbol: 'token',
          typeAsset: <const>'sdk.coin',
        },
        {
          description: `The native token of ${c.displayName || c.name} chain.`,
          denomUnits: [
            {
              denom: 'token',
              exponent: c.nativeToken.decimals,
            },
          ],
          base: 'stake',
          name: 'stake',
          display: 'stake',
          symbol: 'stake',
          typeAsset: <const>'sdk.coin',
        },
      ],
    };
  });

  return { chains, assets };
}

export function getCosmosChainNames(): ChainName[] {
  return Object.values(getWarpContext().chains)
    .filter((c) => c.protocol === ProtocolType.Cosmos)
    .map((c) => c.name);
}

