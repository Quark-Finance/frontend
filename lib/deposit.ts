import { createPublicClient, createWalletClient, custom, http } from 'viem';
import { unichainSepolia } from 'viem/chains';

// const INFURA_API = process.env.NEXT_PUBLIC_INFURA_URL
// Public client for interacting with Unichain Sepolia
const publicClient = createPublicClient({
  chain: unichainSepolia,
  transport: http()  // Use the provider from the signer object
});

// Contract details
const erc20ContractAddress = "0x68A4AC5F5942744BCbd51482F9b81e9FA3408139";
const vaultABI = [
    {
      name: 'deposit',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [],
    },
  ];
  
const erc20ABI = [
    {
      name: 'approve',
      type: 'function',
      stateMutability: 'nonpayable',
      inputs: [
        { name: 'spender', type: 'address' },
        { name: 'amount', type: 'uint256' },
      ],
      outputs: [{ name: '', type: 'bool' }],
    },
  ];

// Function to mint USDC (now it receives the wallet info as arguments)
export const deposit = async (amount: number, accountAddress: string) => {
  try {
    // Create wallet client using viem
    const walletClient = createWalletClient({
      chain: unichainSepolia,
      transport: custom(window.ethereum!),  // Use the provider from the signer object
      account: accountAddress as `0x${string}`
    });
    
    const [account] = await walletClient.getAddresses();

    // Send the transaction using viem
    const tx = await walletClient.writeContract({
        address: erc20ContractAddress,
        abi:  vaultABI,
        functionName: 'deposit',
        args: [BigInt(amount)],  // Pass the connected wallet address and amount
        account // Explicitly passing the account here
      });

    console.log('Transaction hash:', tx);

    // Optionally, wait for transaction confirmation
    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    console.log('Transaction confirmed:', receipt);
  } catch (error) {
    console.error('Deposit failed:', error);
  }
};

// Function to mint USDC (now it receives the wallet info as arguments)
export const approval = async (amount: number, accountAddress: string) => {
    try {
      // Create wallet client using viem
      const walletClient = createWalletClient({
        chain: unichainSepolia,
        transport: custom(window.ethereum!),  // Use the provider from the signer object
        account: accountAddress as `0x${string}`
      });
      
      const [account] = await walletClient.getAddresses();
  
      // Send the transaction using viem
      const tx = await walletClient.writeContract({
          address: erc20ContractAddress,
          abi:  erc20ABI,
          functionName: 'approve',
          args: [accountAddress as `0x${string}`, BigInt(amount)],  // Pass the connected wallet address and amount
          account // Explicitly passing the account here
        });
  
      console.log('Transaction hash:', tx);
  
      // Optionally, wait for transaction confirmation
      const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
      console.log('Transaction confirmed:', receipt);
    } catch (error) {
      console.error('Deposit failed:', error);
    }
  };