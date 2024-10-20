'use client';

import { useState, useEffect } from 'react';
import { VaultCard } from '@/components/VaultCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Search, Lock } from 'lucide-react';
import { Label } from '@/components/ui/label';

interface Vault {
  vaultId: string;
  vaultName: string;
  managerAddress: string;
  totalValue: number;
  totalShares: number;
  apy: number;
  risk: 'Low' | 'Medium' | 'High';
  managementPolicy: string;
  depositPolicy: string;
}

const mockVaults: Vault[] = [
  {
    vaultId: 'VAULT-001',
    vaultName: 'Alpha Growth Fund',
    managerAddress: '0x1234567890123456789012345678901234567890',
    totalValue: 10000000,
    totalShares: 1000000,
    apy: 8.5,
    risk: 'Medium',
    managementPolicy: 'Active Management',
    depositPolicy: 'Open Deposits',
  },
  {
    vaultId: 'VAULT-002',
    vaultName: 'Beta Stable Income',
    managerAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
    totalValue: 5000000,
    totalShares: 500000,
    apy: 5.2,
    risk: 'Low',
    managementPolicy: 'Passive Management',
    depositPolicy: 'Restricted Deposits',
  },
  {
    vaultId: 'VAULT-003',
    vaultName: 'Gamma High Yield',
    managerAddress: '0x9876543210987654321098765432109876543210',
    totalValue: 15000000,
    totalShares: 750000,
    apy: 12.8,
    risk: 'High',
    managementPolicy: 'Aggressive Management',
    depositPolicy: 'Closed Deposits',
  },
];

export default function VaultsPage() {
  const [vaults, setVaults] = useState<Vault[]>([]);
  const [isVaultsInitialized, setIsVaultsInitialized] = useState(false); // New state variable
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<'totalValue' | 'apy' | 'risk'>('totalValue');
  const [filterRisk, setFilterRisk] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newVault, setNewVault] = useState({
    vaultName: '',
    managementPolicy: '',
    depositPolicy: '',
  });

  // Mock user data - replace with actual user authentication in a real app
  const isManager = true; // Set to false to test non-manager view

  // Load vaults from localStorage or use mockVaults
  useEffect(() => {
    const storedVaults = localStorage.getItem('vaults');
    if (storedVaults && storedVaults !== 'undefined') {
      setVaults(JSON.parse(storedVaults));
    } else {
      setVaults(mockVaults);
    }
    setIsVaultsInitialized(true); // Vaults have been initialized
  }, []);

  // Save vaults to localStorage whenever they change, but only after initialization
  useEffect(() => {
    if (isVaultsInitialized) {
      localStorage.setItem('vaults', JSON.stringify(vaults));
    }
  }, [vaults, isVaultsInitialized]);

  const filteredAndSortedVaults = vaults
    .filter(
      (vault) =>
        (vault.vaultName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          vault.vaultId.toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filterRisk === 'All' || vault.risk === filterRisk)
    )
    .sort((a, b) => {
      if (sortBy === 'totalValue') return b.totalValue - a.totalValue;
      if (sortBy === 'apy') return b.apy - a.apy;
      if (sortBy === 'risk') {
        const riskOrder = { Low: 0, Medium: 1, High: 2 };
        return riskOrder[b.risk] - riskOrder[a.risk];
      }
      return 0;
    });

  const handleCreateVault = () => {
    console.log('Creating new vault:', newVault);
    const newVaultId = `VAULT-${(vaults.length + 1).toString().padStart(3, '0')}`;
    const createdVault: Vault = {
      vaultId: newVaultId,
      vaultName: newVault.vaultName,
      managerAddress: '0x' + '1'.repeat(40), // Mock address
      totalValue: Math.floor(Math.random() * 10000000), // Mock data
      totalShares: Math.floor(Math.random() * 1000000), // Mock data
      apy: parseFloat((Math.random() * 15).toFixed(2)), // Mock data
      risk: 'Medium', // Default risk for new vaults
      managementPolicy: newVault.managementPolicy,
      depositPolicy: newVault.depositPolicy,
    };
    const updatedVaults = [...vaults, createdVault];
    setVaults(updatedVaults);
    setIsCreateModalOpen(false);
    setNewVault({ vaultName: '', managementPolicy: '', depositPolicy: '' });
  };

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
        <Select
          value={sortBy}
          onValueChange={(value: 'totalValue' | 'apy' | 'risk') => setSortBy(value)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalValue">Total Value</SelectItem>
            <SelectItem value="apy">APY</SelectItem>
            <SelectItem value="risk">Risk</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={filterRisk}
          onValueChange={(value: 'All' | 'Low' | 'Medium' | 'High') => setFilterRisk(value)}
        >
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
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button disabled={!isManager}>
              {isManager ? (
                <>
                  <Plus className="mr-2 h-4 w-4" /> Create New Vault
                </>
              ) : (
                <>
                  <Lock className="mr-2 h-4 w-4" /> Create New Vault
                </>
              )}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Vault</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              {/* Name Input */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vaultName" className="text-right">
                  Name
                </Label>
                <Input
                  id="vaultName"
                  value={newVault.vaultName}
                  onChange={(e) => setNewVault({ ...newVault, vaultName: e.target.value })}
                  className="col-span-3"
                />
              </div>
              {/* Management Policy Select */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="managementPolicy" className="text-right">
                  Management Policy
                </Label>
                <Select
                  value={newVault.managementPolicy}
                  onValueChange={(value) =>
                    setNewVault({ ...newVault, managementPolicy: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select management policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active Management">Active Management</SelectItem>
                    <SelectItem value="Passive Management">Passive Management</SelectItem>
                    <SelectItem value="Aggressive Management">Aggressive Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* Deposit Policy Select */}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="depositPolicy" className="text-right">
                  Deposit Policy
                </Label>
                <Select
                  value={newVault.depositPolicy}
                  onValueChange={(value) =>
                    setNewVault({ ...newVault, depositPolicy: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select deposit policy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Open Deposits">Open Deposits</SelectItem>
                    <SelectItem value="Restricted Deposits">Restricted Deposits</SelectItem>
                    <SelectItem value="Closed Deposits">Closed Deposits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCreateVault} disabled={!newVault.vaultName}>
                Create Vault
              </Button>
            </DialogFooter>
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
        <div
          className={
            view === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'
          }
        >
          {filteredAndSortedVaults.map((vault) => (
            <VaultCard key={vault.vaultId} {...vault} />
          ))}
        </div>
      )}
    </div>
  );
}
