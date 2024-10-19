import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import ThemeProvider from '@/components/context/themeProvider';
import DynamicProvider from '@/components/context/dynamicProvider';
import { AuthWrapper } from '@/components/context/authWrapper';
import Particles from '@/components/ui/particles';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Quark',
  description: 'The atomic engine for decentralized asset management',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="msapplication-TileColor" content="#0f0f0f" />
        <meta name="theme-color" content="#0f0f0f" />
      </head>
      <body>
        <NextThemesProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProvider>
            <DynamicProvider>
              {/* Main container with flex and centering */}
              <main
                className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen overflow-hidden`}
              >
                <Particles
                  className="absolute inset-0"
                  quantity={20}
                  ease={95}
                  refresh
                />
                {/* Background gradients container */}
                <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px]
          before:w-full before:-translate-x-[-500px] before:rounded-full
          before:bg-gradient-radial before:from-white before:to-transparent
          before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px]
          after:w-full after:translate-x-[-500px] after:bg-gradient-conic after:from-sky-200
          after:via-blue-200 after:blur-2xl after:content-['']
          before:dark:bg-gradient-to-br before:dark:from-transparent
          before:dark:to-primary before:dark:opacity-10 after:dark:from-sky-900
          after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px]
          sm:after:w-[240px] before:lg:h-[800px]">
                </div>
                {/* Content container */}
                <div className="relative z-10">
                  <AuthWrapper>{children}</AuthWrapper>
                </div>
              </main>
            </DynamicProvider>
          </ThemeProvider>
        </NextThemesProvider>
      </body>
    </html>
  );
}
