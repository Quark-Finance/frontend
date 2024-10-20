import { createPublicClient, http } from 'viem';
import { unichainSepolia } from 'viem/chains';

const erc20ABI = [
    {
      name: 'balanceOf',
      type: 'function',
      stateMutability: 'view',
      inputs: [{ name: 'account', type: 'address' }],
      outputs: [{ name: '', type: 'uint256' }],
    },
    {
      name: 'totalSupply',
      type: 'function',
      stateMutability: 'view',
      inputs: [],
      outputs: [{ name: '', type: 'uint256' }],
    },
    {
        name: 'totalValueLocked',
        type: 'function',
        stateMutability: 'view',
        inputs: [],
        outputs: [{ name: '', type: 'uint256' }],
      },
  ];

// Initialize the public client with the correct network
const publicClient = createPublicClient({
  chain: unichainSepolia,
  transport: http(),
});

export async function getBalance(accountAddress: `0x${string}`, tokenAddress: `0x${string}`) {
  try {
    const balance = await publicClient.readContract({
      address: tokenAddress,
      abi: erc20ABI,
      functionName: 'balanceOf',
      args: [accountAddress], // The address whose balance you're checking
    });
    console.log('Balance:', balance); // ERC-20 balance is returned as a BigInt
    return balance
  } catch (error) {
    console.error('Failed to read balance:', error);
  }
}

export async function getTotalSupply(tokenAddress: `0x${string}`) {
    try {
      const totalSupply = await publicClient.readContract({
        address: tokenAddress,
        abi: erc20ABI,
        functionName: 'totalSupply',
      });
    console.log('Total Supply:', totalSupply); // Total supply is returned as a BigInt
    return totalSupply;
    } catch (error) {
      console.error('Failed to read total supply:', error);
    }
  }

  export async function getTotalValue(vaultAddress: `0x${string}`) {
    try {
      const totalValue = await publicClient.readContract({
        address: vaultAddress,
        abi: erc20ABI,
        functionName: 'totalSupply',
      });
    console.log('Total Supply:', totalValue); // Total supply is returned as a BigInt
    return totalValue;
    } catch (error) {
      console.error('Failed to read total supply:', error);
    }
  }