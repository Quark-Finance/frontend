'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface Vault {
  id: string
  name: string
  usdcSupply: number
  borrowLimit: number
}

export default function QuarkLendPage() {
  const [vaults, setVaults] = useState<Vault[]>([])
  const [selectedVault, setSelectedVault] = useState<Vault | null>(null)
  const [isSupplyModalOpen, setIsSupplyModalOpen] = useState(false)
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false)
  const [amount, setAmount] = useState('')
  const [isSigning, setIsSigning] = useState(false)
  const [isConfirming, setIsConfirming] = useState(false)

  useEffect(() => {
    const storedVaults = localStorage.getItem('vaults')
    if (storedVaults) {
      const parsedVaults = JSON.parse(storedVaults)
      // Add USDC supply and borrow limit if not present
      const updatedVaults = parsedVaults.map((vault: any) => ({
        ...vault,
        usdcSupply: vault.usdcSupply || Math.floor(Math.random() * 1000000),
        borrowLimit: vault.borrowLimit || 60
      }))
      setVaults(updatedVaults)
    }
  }, [])

  const handleSign = (action: 'supply' | 'borrow') => {
    setIsSigning(true)
    // Simulate signing process
    setTimeout(() => {
      console.log(`Signing ${action} transaction for ${amount} USDC`)
      setIsSigning(false)
    }, 2000)
  }

  const handleConfirm = (action: 'supply' | 'borrow') => {
    setIsConfirming(true)
    // Simulate confirmation process
    setTimeout(() => {
      console.log(`Confirming ${action} of ${amount} USDC ${action === 'supply' ? 'to' : 'from'} vault ${selectedVault?.name}`)
      setIsConfirming(false)
      setAmount('')
      action === 'supply' ? setIsSupplyModalOpen(false) : setIsBorrowModalOpen(false)
    }, 2000)
  }

  return (
    <div className="container mx-auto py-8 px-4 w-[80%]">
      <h1 className="text-4xl font-bold mb-8 text-primary">QUARK Lend</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vaults.map((vault, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{vault.name || `Vault${index}`}</span>
                <Badge variant="secondary">#{vault.id || index}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">USDC Supply: <span className="font-semibold text-primary">${vault.usdcSupply.toLocaleString()}</span></p>
              <p className="mb-4">Borrow Limit: <span className="font-semibold text-primary">{vault.borrowLimit}%</span></p>
              <div className="flex space-x-2">
                <Dialog open={isSupplyModalOpen} onOpenChange={setIsSupplyModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedVault(vault)} className="flex-1">SUPPLY</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Supply USDC to {selectedVault?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="supply-amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="supply-amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="col-span-3"
                          disabled={isSigning || isConfirming}
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
                      <Button onClick={() => handleSign('supply')} disabled={isSigning || isConfirming || !amount}>
                        {isSigning ? 'Signing...' : 'Sign'}
                      </Button>
                      <Button onClick={() => handleConfirm('supply')} disabled={isSigning || isConfirming || !amount}>
                        {isConfirming ? 'Processing...' : 'Confirm Supply'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Dialog open={isBorrowModalOpen} onOpenChange={setIsBorrowModalOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedVault(vault)} variant="outline" className="flex-1">BORROW</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Borrow from {selectedVault?.name}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="borrow-amount" className="text-right">
                          Amount
                        </Label>
                        <Input
                          id="borrow-amount"
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="col-span-3"
                          disabled={isSigning || isConfirming}
                        />
                      </div>
                    </div>
                    <DialogFooter className="flex flex-col sm:flex-row sm:justify-end gap-2">
                      <Button onClick={() => handleSign('borrow')} disabled={isSigning || isConfirming || !amount}>
                        {isSigning ? 'Signing...' : 'Sign'}
                      </Button>
                      <Button onClick={() => handleConfirm('borrow')} disabled={isSigning || isConfirming || !amount}>
                        {isConfirming ? 'Processing...' : 'Confirm Borrow'}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}