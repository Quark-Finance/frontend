'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeColorToggle } from '@/components/ThemeColorToggle';
import { ThemeModeToggle } from '@/components/ThemeModeToggle';
import { navItems } from '@/lib/navItems';
import { Button } from './ui/button';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core'; // Replace with the actual Dynamic functions
import { mintUSDC } from '@/lib/mintUSDC';  // Assuming mintUSDC uses viem

type HeaderProps = {
  actions?: React.ReactNode;
};

export const Header = React.memo(function Header({ actions }: HeaderProps) {
  const pathname = usePathname();
  const { primaryWallet } = useDynamicContext();  // Implement wallet fetching logic here

  const handleClick = async () => {
    try {

      if (!primaryWallet || !(await primaryWallet.isConnected())) {
        console.error('Wallet not connected.');
        return;
      }

      const accountAddress = primaryWallet.address;
      const signer = primaryWallet.connector; // Use connector, not hooks
      console.log('Network:', await primaryWallet.getNetwork());
      console.log('Balance:', await primaryWallet.getBalance());

      // Call mintUSDC and pass the account address and signer
      await mintUSDC(10, accountAddress, signer);  // Mint with 10 USDC
    } catch (error) {
      console.error('Error during minting:', error);
    }
  };

  const navItemsMemo = useMemo(() => {
    return navItems.map((item) => {
      if (item.href !== undefined) {
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
              pathname === item.href
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-accent hover:text-accent-foreground'
            )}
          >
            {item.icon}
            <span className="hidden group-hover:inline ml-2">{item.label}</span>
          </Link>
        );
      } else {
        return (
          <Button
            key={item.label} // Assuming `item.label` is unique and can be used as a key
            type="button"
            variant="outline"
            onClick={handleClick}  // Call the minting logic on button click
          >
            {item.icon}
            <span className="hidden group-hover:inline ml-2">{item.label}</span>
          </Button>
        );
      }
    });
  }, [navItems, pathname]);

  return (
    <div className="group fixed inset-y-0 left-0 z-40 transition-all duration-200 ease-in-out">
      <div
        className={cn(
          'flex h-full flex-col border-r bg-background transition-all duration-200 ease-in-out',
          'w-16 group-hover:w-64'
        )}
      >
        {/* Header Section */}
        <div className="flex items-center h-14 px-4 border-b">
          <Link href="/" className="flex items-center">
            {/* Logo when collapsed */}
            <div className="block group-hover:hidden">
              <Image
                priority
                src={'/logo/quark_logo_svg.svg'}
                alt="Logo"
                width={32}
                height={32}
                className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              />
            </div>
            {/* Logo when expanded */}
            <div className="hidden group-hover:flex items-center space-x-2">
              <Image
                priority
                src={'/logo/quark_full_logo_svg.svg'}
                alt="Logo"
                width={150}
                height={32}
                className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
              />
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-2 py-4 px-2">
          {navItemsMemo}
        </nav>

        {/* Footer Section */}
        <div className="border-t p-4 flex flex-col space-y-2">
          {/* Actions and Theme Toggles */}
          <div className={cn('flex flex-col space-y-2', 'items-center group-hover:items-start')}>
            {actions}
            {/* Expanded toggles */}
            <div className="hidden group-hover:flex items-center space-x-2">
              <ThemeColorToggle />
              <ThemeModeToggle />
            </div>
            {/* Collapsed toggle */}
            <div className="block group-hover:hidden">
              <ThemeModeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});