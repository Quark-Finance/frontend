import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wallet, User, ArrowRight, TrendingUp, ShieldAlert } from 'lucide-react'
import { ShortAddressLink } from '@/components/ShortAddressLink'

interface VaultCardProps {
  vaultId: string
  vaultName: string
  managerAddress: string
  totalValue: number
  totalShares: number
  apy: number
  risk: 'Low' | 'Medium' | 'High'
}

export function VaultCard({
  vaultId,
  vaultName,
  managerAddress,
  totalValue,
  totalShares,
  apy,
  risk,
}: VaultCardProps) {
  const getRiskColor = (risk: 'Low' | 'Medium' | 'High') => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <Card className="w-full hover:shadow-lg transition-all duration-300 group">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-semibold mb-1">{vaultName}</CardTitle>
            <Badge variant="outline" className="mb-2">{vaultId}</Badge>
          </div>
          <Badge className={`${getRiskColor(risk)}`}>{risk} Risk</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <Wallet className="w-4 h-4 mr-1" /> Total Value:
            </span>
            <span className="font-semibold">${totalValue.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <User className="w-4 h-4 mr-1" /> Total Shares:
            </span>
            <span className="font-semibold">{totalShares.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="w-4 h-4 mr-1" /> APY:
            </span>
            <span className="font-semibold text-green-600">{apy.toFixed(2)}%</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="w-4 h-4 mr-1" />
            Manager: <ShortAddressLink address={managerAddress} chain="Unichain" className="ml-1 text-primary" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/vaults/${vaultId}`} passHref className="w-full">
          <Button variant="default" className="w-full group-hover:bg-primary/90 transition-colors">
            View Details <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}