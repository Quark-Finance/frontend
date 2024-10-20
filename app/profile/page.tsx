'use client';

import React, { useState } from 'react';
import { useDynamicContext, useUserWallets, } from '@dynamic-labs/sdk-react-core';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, } from '@/components/ui/card';
import { Copy, LogOut, Edit2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { shortenAddress } from '@/lib/shortenAddress';
import Image from 'next/image';

export default function ProfilePage() {
  const { setShowAuthFlow, user, handleLogOut, } = useDynamicContext();
  const userWallets = useUserWallets();
  const { toast } = useToast();

  const [expandedWallets, setExpandedWallets] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to clipboard',
      description: text,
    });
  };

  const handleManageAccounts = () => {
    setShowAuthFlow(true);
  };

  if (!user) {
    // If the user is not authenticated, show a message or redirect
    return (
      <div className="container mx-auto py-8 px-4 max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-primary mb-4">
          You are not logged in
        </h1>
        <Button onClick={() => setShowAuthFlow(true)}>Log In</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-primary">Your Profile</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account information and connected wallets.
          </p>
        </div>
        <Button variant="destructive" onClick={handleLogOut} className="mt-4 md:mt-0">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </div>

      {/* User Information */}
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>User Information</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setShowAuthFlow(true)}>
            <Edit2 className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">User ID</h3>
              <div className="flex items-center">
                <span className="break-all">{user.userId}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2"
                  onClick={() => handleCopy(user.userId as string)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Email</h3>
              <div>{user.email || 'Not Provided'}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">Alias</h3>
              <div>{user.alias || 'Not Provided'}</div>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground">New User</h3>
              <div>{user.newUser ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Wallets */}
      <Card className="mb-8">
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Connected Wallets</CardTitle>
          <Button variant="secondary" onClick={handleManageAccounts}>
            Manage Wallets
          </Button>
        </CardHeader>
        <CardContent>
          {userWallets && userWallets.length > 0 ? (
            <div className="space-y-4">
              {(expandedWallets ? userWallets : userWallets.slice(0, 3)).map(
                (wallet) => (
                  <div
                    key={wallet.address}
                    className="flex items-center justify-between p-4 bg-muted/10 rounded-md"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Image
                          src={`/icons/${wallet.key}.svg`}
                          alt={wallet.key}
                          width={8}
                          height={8}
                          className="h-8 w-8"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo/quark_logo_white.png';
                          }}
                        />
                      </div>
                      <div>
                        <div className="font-semibold">
                          {shortenAddress(wallet.address)}
                        </div>
                        <div className="text-sm text-muted-foreground capitalize">
                          {wallet.key} - {wallet.chain}
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(wallet.address)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                )
              )}
              {userWallets.length > 3 && (
                <Button
                  variant="link"
                  onClick={() => setExpandedWallets(!expandedWallets)}
                >
                  {expandedWallets ? 'Show Less' : 'Show All'}
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center text-muted-foreground">
              No wallets connected.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Link/Unlink Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Link/Unlink Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            You can link or unlink additional wallets to your account. Click the button
            below to manage your connected accounts.
          </p>
        </CardContent>
        <CardFooter>
          <Button onClick={handleManageAccounts}>Manage Accounts</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
