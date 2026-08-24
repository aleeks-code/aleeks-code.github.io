import type { Metadata } from 'next';
import { Familjen_Grotesk, Instrument_Serif } from 'next/font/google';
import { site } from '@/data/site';
import './globals.css';

const familjenGrotesk = Familjen_Grotesk({
  subsets: ['latin'],
  variable: '--font-familjen',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});
const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument-serif',
  weight: '400',
  style: ['normal', 'italic'],
});

const title = `${site.name} — ${site.role}`;
const description = `Portfolio di ${site.name}, ${site.role}. Progetti, competenze e contatti.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://aleeks-code.github.io'),
  title,
  description,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
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
    <html
      lang="it"
      className={`${familjenGrotesk.variable} ${instrumentSerif.variable}`}
    >
      <body className="bg-cream text-navy font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
