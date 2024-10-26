import { useMemo } from 'react';
import { toast } from 'react-toastify';

import { HexString, ProtocolType } from '@hyperlane-xyz/utils';

import { config } from '../../../consts/config';
import { logger } from '../../../utils/logger';
import { getChainProtocol, tryGetChainProtocol } from '../../chains/utils';

import {
  useCosmosAccount,
  useCosmosActiveChain,
  useCosmosConnectFn,
  useCosmosDisconnectFn,
  useCosmosTransactionFns,
} from './cosmos';
import {
  useEvmAccount,
  useEvmActiveChain,
  useEvmConnectFn,
  useEvmDisconnectFn,
  useEvmTransactionFns,
} from './evm';

import { AccountInfo, ActiveChainInfo, ChainTransactionFns } from './types';

export function useAccounts(): {
  accounts: Record<ProtocolType, AccountInfo>;
  readyAccounts: Array<AccountInfo>;
} {
  const evmAccountInfo = useEvmAccount();
  const cosmAccountInfo = useCosmosAccount();

  // Filtered ready accounts
  const readyAccounts = useMemo(
    () => [evmAccountInfo, cosmAccountInfo].filter((a) => a.isReady),
    [evmAccountInfo, cosmAccountInfo],
  );

  // Check if any of the ready accounts are blacklisted
  const readyAddresses = readyAccounts
    .map((a) => a.addresses)
    .flat()
    .map((a) => a.address.toLowerCase());
  if (readyAddresses.some((a) => config.addressBlacklist.includes(a))) {
    throw new Error('Wallet address is blacklisted');
  }

  return useMemo(
    () => ({
      accounts: {
        [ProtocolType.Ethereum]: evmAccountInfo,
        [ProtocolType.Cosmos]: cosmAccountInfo,
        
      },
      readyAccounts,
    }),
    [evmAccountInfo, cosmAccountInfo, readyAccounts],
  );
}

export function useAccountForChain(chainName?: ChainName): AccountInfo | undefined {
  const { accounts } = useAccounts();
  if (!chainName) return undefined;
  const protocol = tryGetChainProtocol(chainName);
  if (!protocol) return undefined;
  return accounts?.[protocol];
}

export function useAccountAddressForChain(chainName?: ChainName): Address | undefined {
  return getAccountAddressForChain(chainName, useAccounts().accounts);
}

export function getAccountAddressForChain(
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): Address | undefined {
  if (!chainName || !accounts) return undefined;
  const protocol = getChainProtocol(chainName);
  const account = accounts[protocol];
  if (protocol === ProtocolType.Cosmos) {
    return account?.addresses.find((a) => a.chainName === chainName)?.address;
  } else {
    // Use first because only cosmos has the notion of per-chain addresses
    return account?.addresses[0]?.address;
  }
}

export function getAccountAddressAndPubKey(
  chainName?: ChainName,
  accounts?: Record<ProtocolType, AccountInfo>,
): { address?: Address; publicKey?: Promise<HexString> } {
  const address = getAccountAddressForChain(chainName, accounts);
  if (!accounts || !chainName || !address) return {};
  const protocol = getChainProtocol(chainName);
  const publicKey = accounts[protocol]?.publicKey;
  return { address, publicKey };
}

export function useConnectFns(): Record<ProtocolType, () => void> {
  const onConnectEthereum = useEvmConnectFn();
  const onConnectCosmos = useCosmosConnectFn();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onConnectEthereum,
      [ProtocolType.Cosmos]: onConnectCosmos,
    }),
    [onConnectEthereum, onConnectCosmos],
  );
}

export function useDisconnectFns(): Record<ProtocolType, () => Promise<void>> {
  const disconnectEvm = useEvmDisconnectFn();
  const disconnectCosmos = useCosmosDisconnectFn();

  const onClickDisconnect =
    (env: ProtocolType, disconnectFn?: () => Promise<void> | void) => async () => {
      try {
        if (!disconnectFn) throw new Error('Disconnect function is null');
        await disconnectFn();
      } catch (error) {
        logger.error(`Error disconnecting from ${env} wallet`, error);
        toast.error('Could not disconnect wallet');
      }
    };

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: onClickDisconnect(ProtocolType.Ethereum, disconnectEvm),
      [ProtocolType.Cosmos]: onClickDisconnect(ProtocolType.Cosmos, disconnectCosmos),
    }),
    [disconnectEvm, disconnectCosmos],
  );
}

export function useActiveChains(): {
  chains: Record<ProtocolType, ActiveChainInfo>;
  readyChains: Array<ActiveChainInfo>;
} {
  const evmChain = useEvmActiveChain();
  const cosmChain = useCosmosActiveChain();

  const readyChains = useMemo(
    () => [evmChain, cosmChain].filter((c) => !!c.chainDisplayName),
    [evmChain, cosmChain],
  );

  return useMemo(
    () => ({
      chains: {
        [ProtocolType.Ethereum]: evmChain,
        [ProtocolType.Cosmos]: cosmChain,
      },
      readyChains,
    }),
    [evmChain, cosmChain, readyChains],
  );
}

export function useTransactionFns(): Record<ProtocolType, ChainTransactionFns> {
  const { switchNetwork: onSwitchEvmNetwork, sendTransaction: onSendEvmTx } =
    useEvmTransactionFns();

  const { switchNetwork: onSwitchCosmNetwork, sendTransaction: onSendCosmTx } =
    useCosmosTransactionFns();

  return useMemo(
    () => ({
      [ProtocolType.Ethereum]: { sendTransaction: onSendEvmTx, switchNetwork: onSwitchEvmNetwork },
      [ProtocolType.Cosmos]: { sendTransaction: onSendCosmTx, switchNetwork: onSwitchCosmNetwork },
      
    }),
    [
      onSendEvmTx,
      onSwitchEvmNetwork,
      onSendCosmTx,
      onSwitchCosmNetwork,
    ],
  );
}
