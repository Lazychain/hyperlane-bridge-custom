import { http } from '@wagmi/core';
import { mainnet } from '@wagmi/core/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { APP_NAME } from '@/consts/app';
import { config } from '@/consts/config';


export const connectorConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId: config.walletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})




