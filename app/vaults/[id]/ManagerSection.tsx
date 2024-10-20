'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRightLeft } from 'lucide-react'

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
  const [fromChain, setFromChain] = useState('')
  const [toChain, setToChain] = useState('')
  const [asset, setAsset] = useState('')
  const [quantity, setQuantity] = useState('')

  const allChains = [vault.hubChain, ...vault.spokeChains]
  const allAssets = allChains.flatMap(chain => chain.assets)

  const handleTransfer = () => {
    console.log(`Transferring ${quantity} ${asset} from ${fromChain} to ${toChain}`)
    // Implement transfer logic here
  }

  return (
    <Card className="mt-8 border-primary/20 hover:border-primary transition-colors duration-200">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary flex items-center">
          <ArrowRightLeft className="mr-2" /> Asset Transfer
        </CardTitle>
        <CardDescription>Manager-only section for transferring assets between chains</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Select onValueChange={setFromChain}>
              <SelectTrigger>
                <SelectValue placeholder="From Chain" />
              </SelectTrigger>
              <SelectContent>
                {allChains.map(chain => (
                  <SelectItem key={chain.chain} value={chain.chain}>{chain.chain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={setAsset}>
              <SelectTrigger>
                <SelectValue placeholder="Asset" />
              </SelectTrigger>
              <SelectContent>
                {allAssets.map(asset => (
                  <SelectItem key={asset.symbol} value={asset.symbol}>{asset.symbol}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-4">
            <Select onValueChange={setToChain}>
              <SelectTrigger>
                <SelectValue placeholder="To Chain" />
              </SelectTrigger>
              <SelectContent>
                {allChains.map(chain => (
                  <SelectItem key={chain.chain} value={chain.chain}>{chain.chain}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>
        </div>
        <Button onClick={handleTransfer} className="mt-6 w-full bg-primary text-primary-foreground hover:bg-primary/90">
          Transfer Asset
        </Button>
      </CardContent>
    </Card>
  )
}