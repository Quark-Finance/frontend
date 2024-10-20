'use client'

import { useState, useEffect } from 'react'
import { VaultCard } from '@/components/VaultCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, SlidersHorizontal } from 'lucide-react'

interface Vault {
  vaultId: string
  vaultName: string
  managerAddress: string
  totalValue: number
  totalShares: number
  apy: number
  risk: 'Low' | 'Medium' | 'High'
}

// Mock data for demonstration
const mockVaults: Vault[] = [
  {
    vaultId: "VAULT-001",
    vaultName: "Alpha Growth Fund",
    managerAddress: "0x1234567890123456789012345678901234567890",
    totalValue: 10000000,
    totalShares: 1000000,
    apy: 8.5,
    risk: 'Medium'
  },
  {
    vaultId: "VAULT-002",
    vaultName: "Beta Stable Income",
    managerAddress: "0xabcdef1234567890abcdef1234567890abcdef12",
    totalValue: 5000000,
    totalShares: 500000,
    apy: 5.2,
    risk: 'Low'
  },
  {
    vaultId: "VAULT-003",
    vaultName: "Gamma High Yield",
    managerAddress: "0x9876543210987654321098765432109876543210",
    totalValue: 15000000,
    totalShares: 750000,
    apy: 12.8,
    risk: 'High'
  },
]

export default function VaultsPage() {
  const [vaults, setVaults] = useState<Vault[]>(mockVaults)
  const [searchTerm, setSearchTerm] = useState('')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState<'totalValue' | 'apy' | 'risk'>('totalValue')
  const [filterRisk, setFilterRisk] = useState<'All' | 'Low' | 'Medium' | 'High'>('All')

  const filteredAndSortedVaults = vaults
    .filter((vault) =>
      (vault.vaultName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vault.vaultId.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterRisk === 'All' || vault.risk === filterRisk)
    )
    .sort((a, b) => {
      if (sortBy === 'totalValue') return b.totalValue - a.totalValue
      if (sortBy === 'apy') return b.apy - a.apy
      if (sortBy === 'risk') {
        const riskOrder = { 'Low': 0, 'Medium': 1, 'High': 2 }
        return riskOrder[b.risk] - riskOrder[a.risk]
      }
      return 0
    })

  return (
    <div className="container mx-auto py-8 px-4 w-[85%]">
      <h1 className="text-4xl font-bold mb-8 text-primary">Vaults</h1>
      <div className="mb-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center">
        <div className="relative w-full sm:w-auto flex-grow">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vaults..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        <Select value={sortBy} onValueChange={(value: 'totalValue' | 'apy' | 'risk') => setSortBy(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalValue">Total Value</SelectItem>
            <SelectItem value="apy">APY</SelectItem>
            <SelectItem value="risk">Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterRisk} onValueChange={(value: 'All' | 'Low' | 'Medium' | 'High') => setFilterRisk(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by risk" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Risks</SelectItem>
            <SelectItem value="Low">Low Risk</SelectItem>
            <SelectItem value="Medium">Medium Risk</SelectItem>
            <SelectItem value="High">High Risk</SelectItem>
          </SelectContent>
        </Select>
        <Dialog>
          <DialogTrigger asChild>
            <Button><Plus className="mr-2 h-4 w-4" /> Create New Vault</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Vault</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <p>Vault creation form would go here.</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className="mb-4 flex justify-end">
        <Tabs value={view} onValueChange={(v: string) => setView(v as 'grid' | 'list')}>
          <TabsList>
            <TabsTrigger value="grid">Grid</TabsTrigger>
            <TabsTrigger value="list">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      {filteredAndSortedVaults.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No vaults found. Create a new vault or adjust your search.
        </p>
      ) : (
        <div className={view === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {filteredAndSortedVaults.map((vault) => (
            <VaultCard key={vault.vaultId} {...vault} />
          ))}
        </div>
      )}
    </div>
  )
}