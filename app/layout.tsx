import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/auth-context';
import { ThemeProvider } from '@/context/theme-context';
import { ProxyProvider } from '@/context/proxy-context';
import { Navbar } from '@/components/navbar';
import { VerificationModal } from '@/components/verification-modal';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Sam's Pr0xy — Fast Unblocked Web, Games & Puter",
  description: "Browse freely with Sam's Pr0xy powered by Scramjet, Puter, and Octave Music.",
  icons: {
    icon: '/samscat.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <ProxyProvider>
              <Navbar />
              <main className="pt-6 sm:pt-8 min-h-screen relative overflow-x-hidden">
                {children}
              </main>
              <VerificationModal />
              <Toaster />
            </ProxyProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
