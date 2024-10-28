import { http, createConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { APP_NAME } from '@/consts/app';
import { config } from '@/consts/config';
/*const config = createConfig({
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  }
})*/

const connectorConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId: config.walletConnectProjectId,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
})

export default connectorConfig;


