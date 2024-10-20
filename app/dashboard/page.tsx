'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ArrowDownRight, DollarSign, PieChart, Activity, Briefcase, TrendingUp, Wallet, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'

interface Vault {
  vaultId: string
  vaultName: string
  totalValue: number
  apy: number
}

interface LendingPosition {
  vaultId: string
  vaultName: string
  suppliedAmount: number
  borrowedAmount: number
}

interface Activity {
  id: string
  type: 'deposit' | 'withdraw' | 'borrow' | 'repay'
  amount: number
  vaultName: string
  timestamp: string
}

export default function DashboardPage() {
  const router = useRouter()
  const { user } = useDynamicContext()
  const [vaults, setVaults] = useState<Vault[]>([])
  const [lendingPositions, setLendingPositions] = useState<LendingPosition[]>([])
  const [recentActivity, setRecentActivity] = useState<Activity[]>([])

  useEffect(() => {
    // Mock data - replace with actual API calls in a real application
    setVaults([
      { vaultId: 'VAULT-001', vaultName: 'Alpha Growth Fund', totalValue: 10000000, apy: 8.5 },
      { vaultId: 'VAULT-002', vaultName: 'Beta Stable Income', totalValue: 5000000, apy: 5.2 },
    ])
    setLendingPositions([
      { vaultId: 'VAULT-001', vaultName: 'Alpha Growth Fund', suppliedAmount: 50000, borrowedAmount: 25000 },
      { vaultId: 'VAULT-002', vaultName: 'Beta Stable Income', suppliedAmount: 30000, borrowedAmount: 10000 },
    ])
    setRecentActivity([
      { id: '1', type: 'deposit', amount: 10000, vaultName: 'Alpha Growth Fund', timestamp: '2023-05-15T10:30:00Z' },
      { id: '2', type: 'borrow', amount: 5000, vaultName: 'Beta Stable Income', timestamp: '2023-05-14T14:45:00Z' },
      { id: '3', type: 'withdraw', amount: 2000, vaultName: 'Alpha Growth Fund', timestamp: '2023-05-13T09:15:00Z' },
    ])
  }, [])

  const totalPortfolioValue = vaults.reduce((sum, vault) => sum + vault.totalValue, 0)
  const totalSupplied = lendingPositions.reduce((sum, position) => sum + position.suppliedAmount, 0)
  const totalBorrowed = lendingPositions.reduce((sum, position) => sum + position.borrowedAmount, 0)

  if (!user) {
    router.push('/')
    return null
  }

  return (
    <div className="container mx-auto py-8 px-4 w-[85%]">
      <h1 className="text-4xl font-bold mb-8 text-primary">Dashboard</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPortfolioValue.toLocaleString()}</div>
            <p className="text-xs opacity-70">Across all vaults</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 hover:border-primary transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Supplied</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">${totalSupplied.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">In lending positions</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 hover:border-primary transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Borrowed</CardTitle>
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">${totalBorrowed.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Current loans</p>
          </CardContent>
        </Card>
        <Card className="border-primary/20 hover:border-primary transition-colors duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Vaults</CardTitle>
            <Briefcase className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{vaults.length}</div>
            <p className="text-xs text-muted-foreground">Managed portfolios</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Vaults and Lending */}
      <Tabs defaultValue="vaults" className="mb-8">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="vaults" className="text-lg">
            <Wallet className="w-4 h-4 mr-2" />
            Vaults
          </TabsTrigger>
          <TabsTrigger value="lending" className="text-lg">
            <TrendingUp className="w-4 h-4 mr-2" />
            Lending Positions
          </TabsTrigger>
        </TabsList>
        <TabsContent value="vaults">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vaults.map((vault) => (
              <Card key={vault.vaultId} className="border-primary/20 hover:border-primary transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    {vault.vaultName}
                    <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                      {vault.apy}% APY
                    </Badge>
                  </CardTitle>
                  <CardDescription>Vault ID: {vault.vaultId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">${vault.totalValue.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <Button variant="link" className="mt-4 p-0 h-auto text-primary" onClick={() => router.push(`/vaults/${vault.vaultId}`)}>
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="lending">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lendingPositions.map((position) => (
              <Card key={position.vaultId} className="border-primary/20 hover:border-primary transition-colors duration-200">
                <CardHeader>
                  <CardTitle>{position.vaultName}</CardTitle>
                  <CardDescription>Vault ID: {position.vaultId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-muted-foreground">Supplied</p>
                    <p className="font-bold text-green-500">${position.suppliedAmount.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-muted-foreground">Borrowed</p>
                    <p className="font-bold text-red-500">${position.borrowedAmount.toLocaleString()}</p>
                  </div>
                  {/* <Button variant="link" className="mt-4 p-0 h-auto text-primary" onClick={() => router.push(`/lend/${position.vaultId}`)}>
                    Manage Position <ArrowRight className="ml-2 h-4 w-4" />
                  </Button> */}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Recent Activity */}
      <Card className="border-primary/20 hover:border-primary transition-colors duration-200">
        <CardHeader>
          <CardTitle className="flex items-center text-primary">
            <Activity className="mr-2 h-5 w-5" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {recentActivity.map((activity) => (
              <li key={activity.id} className="flex justify-between items-center p-2 rounded-md hover:bg-primary/5 transition-colors duration-200">
                <div className="flex items-center">
                  {activity.type === 'deposit' && <ArrowUpRight className="h-4 w-4 text-green-500 mr-2" />}
                  {activity.type === 'withdraw' && <ArrowDownRight className="h-4 w-4 text-red-500 mr-2" />}
                  {activity.type === 'borrow' && <ArrowDownRight className="h-4 w-4 text-orange-500 mr-2" />}
                  {activity.type === 'repay' && <ArrowUpRight className="h-4 w-4 text-blue-500 mr-2" />}
                  <div>
                    <p className="font-semibold">{activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}</p>
                    <p className="text-sm text-muted-foreground">{activity.vaultName}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">${activity.amount.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">{new Date(activity.timestamp).toLocaleDateString()}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}