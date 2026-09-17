import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Honeypot — Self-Evolving Honeypot Platform',
  description: 'DECEIVE • LEARN • DEFEND — Turn attacker behavior into actionable intelligence with adaptive deception.',
  keywords: ['cybersecurity', 'honeypot', 'deception technology', 'AI SOC', 'threat intelligence', 'adaptive defense'],
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-stone-50 text-stone-800 min-h-screen antialiased flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-400">
        <Sidebar />
        
        {/* Main layout container with desktop sidebar margin offset */}
        <div className="flex-1 flex flex-col lg:pl-[260px] transition-all duration-200">
          <Topbar />
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto pb-24 lg:pb-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
