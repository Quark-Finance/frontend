'use client';

import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Header } from '@/components/Header';

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const { user } = useDynamicContext();

  return (
    <>
      {user ? <Header /> : null}
      {children}
    </>
  );
}
