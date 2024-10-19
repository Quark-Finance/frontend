'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ChevronRight, ChevronLeft, X, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeColorToggle } from '@/components/ThemeColorToggle';
import { ThemeModeToggle } from '@/components/ThemeModeToggle';
import { navItems } from '@/lib/navItems';

type HeaderProps = {
  logo?: string;
  actions?: React.ReactNode;
};

export const Header = React.memo(function Header({ logo, actions }: HeaderProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <>
      <div
        className={cn(
          'fixed inset-y-0 left-0 z-40 transform transition-all duration-300 ease-in-out',
          isExpanded ? 'w-64' : 'w-16'
        )}
      >
        <div className="flex h-full flex-col border-r bg-background">
          {/* Header Section with Toggle Button */}
          <div className="flex items-center justify-between h-14 px-4 border-b">
            <Link href="/" className="flex items-center space-x-2">
              {logo && <Image src={logo} alt="Logo" width={32} height={32} />}
              {isExpanded && <span className="font-bold">MyApp</span>}
            </Link>
            {/* Toggle Button */}
            <Button
              variant="default"
              size="sm"
              // className="ml-2"
              onClick={toggleExpand}
              aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              {isExpanded ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
            </Button>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2 py-4 px-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center space-x-2 rounded-md px-3 py-2 text-sm font-medium',
                  pathname === item.href
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                )}
              >
                {item.icon}
                {isExpanded && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Footer Section */}
          <div className="border-t p-4 flex flex-col space-y-2">
            {/* Actions and Theme Toggles */}
            <div className={cn('flex flex-col space-y-2', isExpanded ? 'items-start' : 'items-center')}>
              {actions}
              {isExpanded ? (
                <div className="flex items-center space-x-2">
                  <ThemeColorToggle />
                  <ThemeModeToggle />
                </div>
              ) : (
                <ThemeModeToggle />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});