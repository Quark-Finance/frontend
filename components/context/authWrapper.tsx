'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Header } from '@/components/Header';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useDynamicContext();
  const existingUser = user ? localStorage.getItem(user.email as string) : null;

  return (
    <>
      {user && existingUser ? <Header /> : null}
      {children}
    </>
  );
}
