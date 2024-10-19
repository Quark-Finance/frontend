'use client';

import { DynamicContextProvider, ThemeData } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem';
import { mainnet } from 'viem/chains';

import { BitcoinWalletConnectors } from "@dynamic-labs/bitcoin";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { SolanaWalletConnectors } from "@dynamic-labs/solana";
import { StarknetWalletConnectors } from "@dynamic-labs/starknet";
import { FlowWalletConnectors } from "@dynamic-labs/flow";

import { useTheme } from "next-themes";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme() as { theme: ThemeData | undefined };

  return (
    <DynamicContextProvider
      theme={theme || 'dark'}
      settings={{
        environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ENV_ID as string,
        appName: "Quark",
        walletConnectors: [
          BitcoinWalletConnectors,
          EthereumWalletConnectors,
          SolanaWalletConnectors,
          FlowWalletConnectors,
          StarknetWalletConnectors,
        ],
        newToWeb3WalletChainMap: {
          primary_chain: 'flow',
          wallets: {
            flow: 'blocto',
            solana: 'glow',
          },
        },
        recommendedWallets: [
          { walletKey: "phantomevm", label: "Popular" },
          { walletKey: "okxwallet" },
        ],
      }}
    >
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <DynamicWagmiConnector>
            {/* Include any Dynamic components you need */}
            {/* <DynamicNav /> */}
            {/* <DynamicConnectButton>
              <div data-testid='exampleChild'>Connect a new wallet!</div>
            </DynamicConnectButton> */}
            {children}
          </DynamicWagmiConnector>
        </QueryClientProvider>
      </WagmiProvider>
    </DynamicContextProvider>
  );
}
