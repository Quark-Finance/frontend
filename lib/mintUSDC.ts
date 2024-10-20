import { createPublicClient, createWalletClient, custom, http } from "viem";
import { unichainSepolia } from "viem/chains";
// import { encodeFunctionData } from 'viem/utils';

// Public client for interacting with Arbitrum Sepolia
const publicClient = createPublicClient({
  chain: unichainSepolia,
  transport: http("https://sepolia.unichain.org"), // Use the provider from the signer object
});

// Contract details
const contractAddress = "0xbd856Ea0F5Acc0C1aF74B2b829c71940722850EF";
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
export const mintUSDC = async (
  amount: number,
  accountAddress: string,
  signer: any,
) => {
  console.log(signer);
  try {
    // Create wallet client using viem
    const walletClient = createWalletClient({
      chain: unichainSepolia,
      transport: custom(window.ethereum!), // Use the provider from the signer object
      account: accountAddress as `0x${string}`,
    });

    const [account] = await walletClient.getAddresses();

    // Send the transaction using viem
    const tx = await walletClient.writeContract({
      address: contractAddress,
      abi: contractABI,
      functionName: "mint",
      args: [accountAddress as `0x${string}`, BigInt(amount)], // Pass the connected wallet address and amount
      account, // Explicitly passing the account here
    });

    console.log("Transaction hash:", tx);

    // Optionally, wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    console.log("Transaction confirmed:", receipt);
  } catch (error) {
    console.error("Minting failed:", error);
  }
};
