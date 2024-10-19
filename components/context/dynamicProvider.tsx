"use client";

import { DynamicContextProvider, DynamicNav, DynamicConnectButton, ThemeData } from "@dynamic-labs/sdk-react-core";
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
import { useThemeContext } from "@/components/context/themeProvider";
import { useEffect, useState } from "react";

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function DynamicProvider({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme() as { theme: ThemeData | undefined };
  const { themeColor } = useThemeContext();

  useEffect(() => {
    if (!isMounted) {
      setIsMounted(true);
    }
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <DynamicContextProvider
      theme={theme || 'dark'}
      settings={{
        environmentId: "2db26563-e046-455a-954c-9adb2919a4e0",
        appName: "Dynamic Testing",
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
