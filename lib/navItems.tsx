import React from 'react';
import { Home, Users, Settings, User, Store, BadgeDollarSign } from 'lucide-react';

export type NavItem = {
  label: string;
  href?: string;
  onClick?: string;
  icon: React.ReactNode;
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/', icon: <Home className="h-5 w-5" /> },
  { label: 'Forms', href: '/forms', icon: <Users className="h-5 w-5" /> },
  { label: 'Vaults', href: '/vaults', icon: <Store className="h-5 w-5" /> },
  { label: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
  { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  { label: 'Add USDC', onClick: 'mintUSDC', icon: <BadgeDollarSign className="h-5 w-5" /> },
];