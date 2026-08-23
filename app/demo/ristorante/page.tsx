import type { Metadata } from 'next';
import Link from 'next/link';
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Bella Napoli — Progetto dimostrativo',
  description:
    'Sito vetrina dimostrativo per un ristorante, creato da Alex Munafò per il proprio portfolio.',
};

const piatti = [
  {
    nome: 'Margherita DOP',
    descrizione: 'Pomodoro San Marzano, fior di latte, basilico fresco.',
    prezzo: '€8',
  },
  {
    nome: 'Tagliatelle al tartufo',
    descrizione: 'Pasta fresca, tartufo nero, burro e parmigiano.',
    prezzo: '€14',
  },
  {
    nome: 'Tiramisù della casa',
    descrizione: 'Ricetta tradizionale, preparato ogni giorno.',
    prezzo: '€6',
  },
];

export default function RistoranteDemo() {
  return (
    <div className={`${playfair.className} bg-[#fbf3e7] text-[#2e1a12]`}>
      <header className="px-4 py-24 text-center">
        <p className="font-sans text-xs font-semibold uppercase tracking-widest text-[#c9a227]">
          Ristorante Italiano
        </p>
        <h1 className="mt-3 text-5xl font-bold sm:text-6xl">Bella Napoli</h1>
        <p className="mt-4 font-sans text-lg text-[#5c4636]">
          Cucina italiana autentica nel cuore della città.
        </p>
        <a
          href="tel:+390000000000"
          className="mt-8 inline-block rounded-md bg-[#8b3a2b] px-6 py-3 font-sans font-medium text-white transition-colors duration-200 hover:bg-[#6f2e22] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#8b3a2b] focus-visible:ring-offset-2"
        >
          Prenota un tavolo
        </a>
      </header>

      <main>
        <section className="mx-auto max-w-3xl px-4 py-16">
          <p className="text-center font-sans leading-relaxed text-[#5c4636]">
            Da tre generazioni portiamo in tavola i sapori della vera cucina napoletana, con
            ingredienti freschi e ricette tramandate in famiglia.
          </p>
        </section>

        <section className="border-t border-[#e4d5bd] bg-white/40 px-4 py-16">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-semibold">Menu in evidenza</h2>
            <div className="mt-8 space-y-6">
              {piatti.map((piatto) => (
                <div
                  key={piatto.nome}
                  className="flex items-baseline justify-between gap-4 border-b border-[#e4d5bd] pb-4"
                >
                  <div>
                    <h3 className="text-lg font-semibold">{piatto.nome}</h3>
                    <p className="font-sans text-sm text-[#5c4636]">{piatto.descrizione}</p>
                  </div>
                  <span className="whitespace-nowrap font-sans font-semibold text-[#8b3a2b]">
                    {piatto.prezzo}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 text-center">
          <h2 className="text-2xl font-semibold">Orari & Contatti</h2>
          <p className="mt-4 font-sans text-[#5c4636]">
            Tutti i giorni, 12:00–15:00 e 19:00–23:00
            <br />
            Via Roma 12, Napoli — 000 000 0000
          </p>
        </section>
      </main>

      <footer className="border-t border-[#e4d5bd] px-4 py-8 text-center font-sans text-xs text-[#8b6b52]">
        <p>
          Progetto dimostrativo creato da{' '}
          <Link href="/" className="underline">
            Alex Munafò
          </Link>{' '}
          per il proprio portfolio — non è un&apos;attività reale.
        </p>
      </footer>
    </div>
  );
}
