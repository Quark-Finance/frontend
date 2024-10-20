'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Asset {
  symbol: string
  amount: number
  chain: string
}

interface Chain {
  chain: string
  totalValue: number
  address: string
  assets: Asset[]
}

interface Vault {
  name: string
  vaultId: string
  managerAddress: string
  totalValue: number
  totalShares: number
  managementPolicy: string
  depositPolicy: string
  hubChain: Chain
  spokeChains: Chain[]
}

export function ManagerSection({ vault }: { vault: Vault }) {
  const [transferData, setTransferData] = useState({
    fromChain: '',
    toChain: '',
    amount: '',
    asset: '',
  });

  const [defiData, setDefiData] = useState({
    chain: '',
    protocol: '',
    func: '',
    input: '',
  });

  const handleTransfer = () => {
    console.log(`Transferring ${transferData.amount} ${transferData.asset} from ${transferData.fromChain} to ${transferData.toChain}`);
    // Implement transfer logic here
  }
  const handleDefiInteraction = () => {
    console.log('DeFi Interaction Data:', defiData);
    // Implement DeFi interaction logic here
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Asset Transfer Section */}
      <Card className="border border-primary/20 hover:border-primary transition-colors duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            Asset Transfer
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* From Chain */}
            <div>
              <Label htmlFor="fromChain">From Chain</Label>
              <Select
                value={transferData.fromChain}
                onValueChange={(value) =>
                  setTransferData({ ...transferData, fromChain: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  {/* Add more chains as needed */}
                </SelectContent>
              </Select>
            </div>
            {/* To Chain */}
            <div>
              <Label htmlFor="toChain">To Chain</Label>
              <Select
                value={transferData.toChain}
                onValueChange={(value) =>
                  setTransferData({ ...transferData, toChain: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  {/* Add more chains as needed */}
                </SelectContent>
              </Select>
            </div>
            {/* Asset */}
            <div>
              <Label htmlFor="asset">Asset</Label>
              <Input
                id="asset"
                placeholder="Enter asset symbol"
                value={transferData.asset}
                onChange={(e) =>
                  setTransferData({ ...transferData, asset: e.target.value })
                }
              />
            </div>
            {/* Amount */}
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                value={transferData.amount}
                onChange={(e) =>
                  setTransferData({ ...transferData, amount: e.target.value })
                }
              />
            </div>
            <Button onClick={handleTransfer}>Initiate Transfer</Button>
          </div>
        </CardContent>
      </Card>

      {/* DeFi Interactions Section */}
      <Card className="border border-primary/20 hover:border-primary transition-colors duration-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-primary">
            DeFi Interactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chain */}
            <div>
              <Label htmlFor="defiChain">Chain</Label>
              <Select
                value={defiData.chain}
                onValueChange={(value) =>
                  setDefiData({ ...defiData, chain: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ethereum">Ethereum</SelectItem>
                  <SelectItem value="Polygon">Polygon</SelectItem>
                  <SelectItem value="Arbitrum">Arbitrum</SelectItem>
                  {/* Add more chains as needed */}
                </SelectContent>
              </Select>
            </div>
            {/* Protocol */}
            <div>
              <Label htmlFor="protocol">Protocol</Label>
              <Input
                id="protocol"
                placeholder="Enter protocol name"
                value={defiData.protocol}
                onChange={(e) =>
                  setDefiData({ ...defiData, protocol: e.target.value })
                }
              />
            </div>
            {/* Function */}
            <div>
              <Label htmlFor="function">Function</Label>
              <Input
                id="function"
                placeholder="Enter function name"
                value={defiData.func}
                onChange={(e) =>
                  setDefiData({ ...defiData, func: e.target.value })
                }
              />
            </div>
            {/* Input */}
            <div>
              <Label htmlFor="input">Input</Label>
              <Input
                id="input"
                placeholder="Enter input data"
                value={defiData.input}
                onChange={(e) =>
                  setDefiData({ ...defiData, input: e.target.value })
                }
              />
            </div>
            <Button onClick={handleDefiInteraction}>Execute Interaction</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}