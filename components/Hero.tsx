import { site } from '@/data/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-20 relative overflow-hidden bg-navy px-4 py-28 text-center text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -right-24 -top-24 h-96 w-96 rotate-12 rounded-full bg-brand/20 blur-3xl" />
        <div className="absolute -left-16 bottom-0 h-64 w-64 -rotate-12 rounded-full bg-brand/10 blur-2xl" />
        <svg
          className="absolute right-0 top-0 h-full w-1/3 opacity-20"
          viewBox="0 0 200 400"
          preserveAspectRatio="none"
        >
          <polygon points="200,0 200,400 80,400" fill="url(#hero-cut)" />
          <defs>
            <linearGradient id="hero-cut" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2e5bff" />
              <stop offset="100%" stopColor="#0b1330" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-brand">
          {site.role}
        </p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl font-bold">{site.name}</h1>
        <p className="mt-4 text-lg text-slate-300">{site.tagline}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="inline-block rounded-md bg-brand px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-brand-dark focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
          >
            Guarda i miei progetti
          </a>
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              className="inline-block rounded-md border border-white/30 px-6 py-3 font-medium text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Scarica CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
