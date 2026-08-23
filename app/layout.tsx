import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const title = `${site.name} — ${site.role}`;
const description = `Portfolio of ${site.name}, ${site.role.toLowerCase()}. Projects, skills, and contact.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://aleeks-code.github.io'),
  title,
  description,
  openGraph: {
    title,
    description,
    type: 'website',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
