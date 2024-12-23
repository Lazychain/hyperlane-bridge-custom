import { ChainNameOrId, ChainName } from '@hyperlane-xyz/sdk';
import { ProtocolType, toTitleCase } from '@hyperlane-xyz/utils';

import { getMultiProvider } from '../../context/context';

export function getChainDisplayName(chain: ChainName, shortName = false) {
  if (!chain) return 'Unknown';
  const metadata = tryGetChainMetadata(chain);
  if (!metadata) return 'Unknown';
  const displayName = shortName ? metadata.displayNameShort : metadata.displayName;
  return displayName || metadata.displayName || toTitleCase(metadata.name);
}

export function isPermissionlessChain(chain: ChainName) {
  if (!chain) return true;
  const metadata = tryGetChainMetadata(chain);
  return metadata?.protocol !== ProtocolType.Ethereum || metadata.deployer?.name.trim().toLowerCase();
}

export function hasPermissionlessChain(ids: ChainName[]) {
  return !ids.every((c) => !isPermissionlessChain(c));
}

export function getChainByRpcEndpoint(endpoint?: string) {
  if (!endpoint) return undefined;
  const allMetadata = Object.values(getMultiProvider().metadata);
  return allMetadata.find(
    (m) => !!m.rpcUrls.find((rpc) => rpc.http.toLowerCase().includes(endpoint.toLowerCase())),
  );
}

export function tryGetChainMetadata(chain: ChainNameOrId) {
  return getMultiProvider().tryGetChainMetadata(chain);
}

export function getChainMetadata(chain: ChainNameOrId) {
  return getMultiProvider().getChainMetadata(chain);
}

export function tryGetChainProtocol(chain: ChainNameOrId) {
  return tryGetChainMetadata(chain)?.protocol;
}

export function getChainProtocol(chain: ChainNameOrId) {
  return getChainMetadata(chain).protocol;
}

export function formatAddress(address: string): string {
  if (!address || typeof address !== 'string') {
    return '';
  }

  const prefix = address.slice(0, 8); // First 8 characters
  const suffix = address.slice(-4); // Last 4 characters

  return `${prefix}...${suffix}`;
}
