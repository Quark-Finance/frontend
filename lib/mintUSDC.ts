import { createPublicClient, createWalletClient, http } from 'viem';
import { arbitrumSepolia } from 'viem/chains';
import { encodeFunctionData } from 'viem/utils';

// Public client for interacting with Arbitrum Sepolia
const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

// Contract details
const contractAddress = "0x7F9a3050a572CF5198B7f61e6d9203B532072692";
const contractABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
    ],
  },
];

// Function to mint USDC (now it receives the wallet info as arguments)
export const mintUSDC = async (amount: number, accountAddress: string, signer: any) => {
  try {
    // Create wallet client using viem
    const walletClient = createWalletClient({
      chain: arbitrumSepolia,
      transport: http(),  // Use the provider from the signer object
      account: accountAddress as `0x${string}`,
    });
    
    const [account] = await walletClient.getAddresses();

    // Send the transaction using viem
    const tx = await walletClient.writeContract({
        address: contractAddress,
        abi:  contractABI,
        functionName: 'mint',
        args: [accountAddress as `0x${string}`, BigInt(amount)],  // Pass the connected wallet address and amount
        account // Explicitly passing the account here
      });

    console.log('Transaction hash:', tx);

    // Optionally, wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Minting failed:', error);
  }
};
