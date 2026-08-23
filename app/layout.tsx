import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500', '700'],
});

const title = `${site.name} — ${site.role}`;
const description = `Portfolio di ${site.name}, ${site.role.toLowerCase()}. Progetti, competenze e contatti.`;

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
    <html lang="it" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-white text-slate-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
