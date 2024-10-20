'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, } from '@/components/ui/card';
import { Collapsible, CollapsibleContent, CollapsibleTrigger, } from '@/components/ui/collapsible';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Wallet, Users, PieChart, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { ShortAddressLink } from '@/components/ShortAddressLink';
import { ManagerSection } from './ManagerSection';
import Image from 'next/image';
import { approval, deposit } from '@/lib/deposit';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
// import { getTotalSupply } from '@/lib/getTotalShares';

interface Asset {
  symbol: string;
  amount: number;
  chain: string;
}

interface Chain {
  chain: string;
  totalValue: number;
  address: string;
  assets: Asset[];
}

interface Vault {
  name: string;
  vaultId: string;
  managerAddress: string;
  totalValue: number;
  totalShares: number;
  managementPolicy: string;
  depositPolicy: string;
  hubChain: Chain;
  spokeChains: Chain[];
}

// Mock data for the vault
const mockVault: Vault = {
  name: 'Alpha Growth Fund',
  vaultId: 'VAULT-001',
  managerAddress: '0x1234567890123456789012345678901234567890',
  totalValue: 10000000,
  totalShares: 1000000,
  managementPolicy: 'Active management with focus on high-growth tech stocks',
  depositPolicy: 'Open for deposits with 1% fee',
  hubChain: {
    chain: 'Unichain',
    totalValue: 7500000,
    address: '0xabcdef1234567890abcdef1234567890abcdef12',
    assets: [
      { symbol: 'ETH', amount: 1000, chain: 'Ethereum' },
      { symbol: 'USDC', amount: 5000000, chain: 'Ethereum' },
    ],
  },
  spokeChains: [
    {
      chain: 'Polygon',
      totalValue: 2500000,
      address: '0x9876543210987654321098765432109876543210',
      assets: [
        { symbol: 'MATIC', amount: 500000, chain: 'Polygon' },
        { symbol: 'USDT', amount: 2000000, chain: 'Polygon' },
      ],
    },
    {
      chain: 'Arbitrum',
      totalValue: 1500000,
      address: '0x1111222233334444555566667777888899990000',
      assets: [
        { symbol: 'ARB', amount: 100000, chain: 'Arbitrum' },
        { symbol: 'USDC', amount: 1000000, chain: 'Arbitrum' },
      ],
    },
    // Add more spoke chains if needed
  ],
};

function AssetBadge({ asset }: { asset: Asset }) {
  return (
    <Badge variant="outline" className="mr-2 mb-2 bg-secondary/10">
      <span className="font-bold mr-1">{asset.symbol}:</span>
      <span>{asset.amount.toLocaleString()}</span>
    </Badge>
  );
}

function ChainCard({
  chain,
  isHubChain = false,
}: {
  chain: Chain;
  isHubChain?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
      <Card
        className={`w-full hover:shadow-md transition-shadow duration-200 ${isHubChain ? 'border-2 border-primary bg-primary/10' : ''
          }`}
      >
        <CollapsibleTrigger asChild>
          <CardHeader className="flex flex-row items-center justify-between cursor-pointer">
            <div className="flex items-center space-x-4">
              <Image
                src={`/icons/chain/${chain.chain.toLowerCase()}.png`}
                alt={`${chain.chain} logo`}
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <CardTitle
                  className={`text-lg font-semibold ${isHubChain ? 'text-primary' : ''
                    }`}
                >
                  {chain.chain}
                </CardTitle>
                <CardDescription>
                  <ShortAddressLink
                    address={chain.address}
                    chain={chain.chain}
                    className="text-sm text-muted-foreground hover:text-primary"
                  />
                </CardDescription>
              </div>
            </div>
            {isOpen ? (
              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            )}
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent>
            <p className="mb-4 text-lg font-semibold">
              Total Value:{' '}
              <span className="text-primary">
                ${chain.totalValue.toLocaleString()}
              </span>
            </p>
            <Separator className="my-4" />
            <h4 className="font-semibold mb-2">Assets:</h4>
            <div className="flex flex-wrap">
              {chain.assets.map((asset, index) => (
                <AssetBadge key={index} asset={asset} />
              ))}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}

function DepositModal() {
  const [amount, setAmount] = useState(0);
  const [isApproving, setIsSigning] = useState(false);
  const [isDepositing, setIsDepositing] = useState(false);
  const { primaryWallet } = useDynamicContext(); 
  const accountAddress = primaryWallet!.address;
  
  const handleApproval = async () => {
    setIsSigning(true);
    try {
    console.log(`Approving deposit of ${amount}`);
    const tx = await approval(amount, accountAddress);
    setIsSigning(false);
    } catch(e) {
      console.log(e);
      return
    }
  };

  const handleDeposit = async () => {
    setIsDepositing(true);
    console.log(`Depositing ${amount} into the vault`);
    try {
    const tx = await deposit(amount, accountAddress);
    setAmount(0);
    setIsDepositing(false);
    } catch(e) {
      console.log(e);
      return
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Deposit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deposit into Vault</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Amount
            </label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter deposit amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value as any as number)}
              disabled={isApproving || isDepositing}
            />
          </div>
          <Button
            onClick={handleApproval}
            className="w-full"
            disabled={isApproving || isDepositing || !amount}
          >
            {isApproving ? 'Signing...' : 'Approve'}
          </Button>
          <Button
            onClick={handleDeposit}
            className="w-full"
            disabled={isApproving || isDepositing || !amount}
          >
            {isDepositing ? 'Processing...' : 'Confirm Deposit'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function IndividualVaultPage() {
  const router = useRouter();
  const { primaryWallet } = useDynamicContext(); 
  const accountAddress = primaryWallet!.address;
  // const totalShares = getTotalSupply(tokenAddress)
  // const userShares = await getBalance(accountAddress, tokenAddress); // Mock user shares, replace with actual user data
  // const valuePerShare = totalValue / totalShares;
  const valuePerShare = mockVault.totalValue / mockVault.totalShares;
  const userShares = 100000; // Mock user shares, replace with actual user data
  
  
  const userValue = userShares * valuePerShare;

  const isManager = true; // Mock manager status, replace with actual user data

  return (
    <div className="mx-auto py-8 px-4 w-full max-w-7xl space-y-12">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div className="flex items-center space-x-4">
          {/* Go Back Button */}
          <Button
            variant="ghost"
            size={'icon'}
            onClick={() => router.back()}
            className="p-0 h-auto w-auto"
          >
            <ArrowLeft className="h-6 w-6 text-primary" />
          </Button>
          <div>
            <h1 className="text-4xl font-bold text-primary">{mockVault.name}</h1>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="mr-2">
                {mockVault.vaultId}
              </Badge>
              <span className="text-sm text-muted-foreground">Manager:</span>
              <ShortAddressLink
                address={mockVault.managerAddress}
                chain={'Unichain'}
                className="ml-1 text-sm text-muted-foreground hover:text-primary"
              />
            </div>
          </div>
        </div>
        <DepositModal />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-primary/10 hover:bg-primary/20 transition-colors duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <Wallet className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${mockVault.totalValue.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/10 hover:bg-primary/20 transition-colors duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {mockVault.totalShares.toLocaleString()}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-primary/10 hover:bg-primary/20 transition-colors duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Value Per Share</CardTitle>
                <PieChart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  ${valuePerShare.toFixed(2)}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chain Distribution */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Chain Distribution</h2>
            {/* Hub Chain */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Hub Chain</h3>
              <ChainCard chain={mockVault.hubChain} isHubChain />
            </div>
            {/* Spoke Chains */}
            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-primary">Spoke Chains</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mockVault.spokeChains.map((chain, index) => (
                  <ChainCard key={index} chain={chain} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Side Column */}
        <div className="space-y-8">
          {/* Policies */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Policies</h2>
            <Card className="border border-primary/20 hover:border-primary transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">
                  Management Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{mockVault.managementPolicy}</p>
              </CardContent>
            </Card>
            <Card className="border border-primary/20 hover:border-primary transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">
                  Deposit Policy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{mockVault.depositPolicy}</p>
              </CardContent>
            </Card>
          </div>

          {/* Your Share */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Your Share</h2>
            <Card className="border border-primary/20 hover:border-primary transition-colors duration-200">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-primary">
                  Your Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p>
                    Your Shares:{' '}
                    <span className="font-semibold">
                      {userShares.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Your Value:{' '}
                    <span className="font-semibold text-primary">
                      ${userValue.toLocaleString()}
                    </span>
                  </p>
                  <p>
                    Percentage of Vault:{' '}
                    <span className="font-semibold">
                      {((userShares / mockVault.totalShares) * 100).toFixed(2)}%
                    </span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      {/* Manager Section (Only for Managers) */}
      {isManager && (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-primary">Manager Tools</h2>
          <ManagerSection vault={mockVault} />
        </div>
      )}
    </div>
  );
}
