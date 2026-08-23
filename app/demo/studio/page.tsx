import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Studio Rossi & Associati — Progetto dimostrativo',
  description:
    'Sito vetrina dimostrativo per uno studio professionale, creato da Alex Munafò per il proprio portfolio.',
};

const aree = [
  {
    titolo: 'Diritto commerciale',
    descrizione: 'Consulenza su contratti, società e rapporti tra imprese.',
  },
  {
    titolo: 'Consulenza fiscale',
    descrizione: 'Dichiarazioni, pianificazione fiscale e adempimenti periodici.',
  },
  {
    titolo: 'Contrattualistica',
    descrizione: 'Redazione e revisione di contratti su misura per la tua attività.',
  },
];

export default function StudioDemo() {
  return (
    <div className="bg-white text-[#0f1b33]">
      <header className="bg-[#0f1b33] px-4 py-24 text-center text-white">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#b08d3d]">
          Studio Professionale
        </p>
        <h1 className="font-display mt-3 text-4xl font-bold sm:text-5xl">
          Studio Rossi &amp; Associati
        </h1>
        <p className="mt-4 text-lg text-white/70">
          Consulenza legale e fiscale su misura per la tua attività.
        </p>
        <a
          href="mailto:info@studiorossi.example"
          className="mt-8 inline-block rounded-md bg-[#b08d3d] px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-[#8f7130] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#b08d3d] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f1b33]"
        >
          Richiedi una consulenza
        </a>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-4 py-16">
          <h2 className="font-display text-2xl font-semibold">Aree di competenza</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {aree.map((area) => (
              <div key={area.titolo} className="rounded-lg border border-slate-200 p-6">
                <h3 className="font-display font-semibold">{area.titolo}</h3>
                <p className="mt-2 text-sm text-slate-600">{area.descrizione}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display text-2xl font-semibold">Chi siamo</h2>
            <p className="mt-4 text-slate-600 leading-relaxed">
              Un team di professionisti al servizio di piccole e medie attività, con un approccio
              diretto e soluzioni su misura per ogni esigenza.
            </p>
          </div>
        </section>

        <section className="px-4 py-16 text-center">
          <h2 className="font-display text-2xl font-semibold">Contatti</h2>
          <p className="mt-4 text-slate-600">
            Via delle Leggi 20 — 000 000 0000
            <br />
            info@studiorossi.example
          </p>
        </section>
      </main>

      <footer className="border-t border-slate-200 px-4 py-8 text-center text-xs text-slate-500">
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
