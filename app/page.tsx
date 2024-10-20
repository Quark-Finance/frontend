'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

import Meteors from '@/components/ui/meteors';

const TypingAnimation = ({ words }: { words: string[] }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const animateText = () => {
      const word = words[currentIndex % words.length];
      const shouldDelete = isDeleting ? 1 : -1;
      setCurrentWord((prev) => word.substring(0, prev.length - shouldDelete));

      if (!isDeleting && currentWord === word) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentWord === '') {
        setIsDeleting(false);
        setCurrentIndex((prev) => prev + 1);
      }
    };

    const timer = setTimeout(animateText, isDeleting ? 50 : 150);
    return () => clearTimeout(timer);
  }, [currentWord, currentIndex, isDeleting, words]);

  return <span className="text-primary">{currentWord}</span>;
};

export default function LandingPage() {
  const oneLiners = [
    'universal liquidity',
    'cross-chain DeFi',
    'seamless asset management',
  ];

  const { user, setShowAuthFlow } = useDynamicContext();
  const router = useRouter();

  const handleSignIn = () => {
    setShowAuthFlow(true);
  };

  const handleButtonClick = () => {
    if (user) {
      // If user is logged in, navigate to the vaults page
      router.push('/vaults');
    } else {
      // If not logged in, initiate the sign-in flow
      handleSignIn();
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-background/50 text-foreground">
      <Meteors number={10} />
      <div className="z-10 text-center">
        <div className="flex items-center justify-center mb-2">
          <Image
            src="/logo/quark_full_logo_svg.svg"
            alt="Quark Logo"
            width={300}
            height={300}
            className="dark:invert dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
          />
        </div>
        <h2 className="text-3xl mb-8">
          The atomic engine for <TypingAnimation words={oneLiners} />
        </h2>
        <button
          onClick={handleButtonClick}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-full text-lg font-semibold transition-colors"
        >
          {user ? 'Explore Our Vaults' : "Let's get started"}
        </button>
      </div>
    </div>
  );
}
