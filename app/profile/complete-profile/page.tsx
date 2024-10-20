'use client';

import { useRouter } from 'next/navigation';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { Card, CardContent } from '@/components/ui/card';
import { UserCog, Users } from 'lucide-react';
import Image from 'next/image';

export default function CompleteProfile() {
  const { user } = useDynamicContext();
  const router = useRouter();

  if (!user) {
    router.push('/');
    return null;
  }

  const handleUserTypeSelection = (userType: 'manager' | 'investor') => {
    router.push(`/profile/complete-profile/${userType}`);
  };

  // change it later to send info to backend (for now just store in localstorage)
  const addUserToSystem = (userType: 'manager' | 'investor') => {
    const existingUser = localStorage.getItem(user.email as string);
    if (existingUser) {
      // router.push('/dashboard');
      window.location.href = '/dashboard';
    } else {
      const newUser = {
        userType,
      };
      localStorage.setItem(user.email as string, JSON.stringify(newUser));
      // router.push('/dashboard');
      window.location.href = '/dashboard';
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background/20 backdrop-blur-sm text-foreground p-4">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center mb-8">
          <Image
            src="/logo/quark_full_logo_svg.svg"
            alt="Quark Logo"
            width={300}
            height={300}
            className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          />
        </div>
        {/* <h1 className="text-4xl font-bold mb-12 text-center">Complete Your Profile</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Manager Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 bg-card/50 rounded-xl border border-primary/5 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary))]"
            // onClick={() => handleUserTypeSelection('manager')} // COMMENTED FOR NOW
            onClick={() => addUserToSystem('manager')} 
          >
            <CardContent className="flex flex-col items-center justify-center p-8 h-full">
              <UserCog className="w-24 h-24 mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Manager</h2>
              <p className="text-center text-muted-foreground">
                Manage assets and create investment strategies
              </p>
            </CardContent>
          </Card>

          {/* Investor Card */}
          <Card
            className="cursor-pointer transition-all duration-300 hover:scale-105 bg-card/50 rounded-xl border border-primary/5 hover:border-primary hover:shadow-[0_0_20px_hsl(var(--primary))]"
            onClick={() => handleUserTypeSelection('investor')}
          >
            <CardContent className="flex flex-col items-center justify-center p-8 h-full">
              <Users className="w-24 h-24 mb-4 text-primary" />
              <h2 className="text-2xl font-semibold mb-2">Investor</h2>
              <p className="text-center text-muted-foreground">
                Invest in various assets and track your portfolio
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
