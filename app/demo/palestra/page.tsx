import type { Metadata } from 'next';
import Link from 'next/link';
import { Archivo_Black } from 'next/font/google';

const archivoBlack = Archivo_Black({ subsets: ['latin'], weight: '400' });

export const metadata: Metadata = {
  title: 'FitZone — Progetto dimostrativo',
  description:
    'Landing page dimostrativa per una palestra, creata da Alex Munafò per il proprio portfolio.',
};

const corsi = ['Functional Training', 'Pesi Liberi', 'Cardio HIIT', 'Yoga'];

const valori = [
  { titolo: 'Trainer certificati', descrizione: 'Un team qualificato che segue ogni allievo.' },
  { titolo: 'Sale attrezzate', descrizione: 'Macchinari moderni per ogni tipo di allenamento.' },
  { titolo: 'Community attiva', descrizione: 'Un ambiente che motiva a non mollare mai.' },
];

export default function PalestraDemo() {
  return (
    <div className="bg-[#0a0a0a] text-white">
      <header className="px-4 py-24 text-center">
        <p className="font-mono text-xs font-semibold uppercase tracking-widest text-[#c6ff3d]">
          Palestra
        </p>
        <h1 className={`${archivoBlack.className} mt-3 text-6xl uppercase sm:text-7xl`}>
          FitZone
        </h1>
        <p className="mt-4 text-lg text-white/70">Allenati come un professionista.</p>
        <a
          href="#corsi"
          className="mt-8 inline-block rounded-md bg-[#c6ff3d] px-8 py-3 font-bold uppercase tracking-wide text-black transition-colors duration-200 hover:bg-[#a9e021] focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-[#c6ff3d] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          Prova gratuita
        </a>
      </header>

      <main>
        <section id="corsi" className="scroll-mt-8 border-t border-white/10 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className={`${archivoBlack.className} text-3xl uppercase`}>Corsi</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {corsi.map((corso) => (
                <div
                  key={corso}
                  className="rounded-lg border border-white/10 bg-white/5 p-6 transition-colors duration-200 hover:border-[#c6ff3d]"
                >
                  <span className={`${archivoBlack.className} text-xl uppercase`}>{corso}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className={`${archivoBlack.className} text-3xl uppercase`}>
              Perché scegliere FitZone
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {valori.map((valore) => (
                <div key={valore.titolo}>
                  <h3 className="font-semibold text-[#c6ff3d]">{valore.titolo}</h3>
                  <p className="mt-2 text-sm text-white/70">{valore.descrizione}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/10 px-4 py-16 text-center">
          <h2 className={`${archivoBlack.className} text-2xl uppercase`}>Orari & Contatti</h2>
          <p className="mt-4 text-white/70">
            Lun–Ven 07:00–22:00, Sab–Dom 09:00–13:00
            <br />
            Via dello Sport 5 — 000 000 0000
          </p>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs text-white/50">
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
