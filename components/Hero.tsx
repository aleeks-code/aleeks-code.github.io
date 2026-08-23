import { site } from '@/data/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-20 relative overflow-hidden px-4 py-24 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black_40%,transparent_100%)]"
      />
      <div className="mx-auto max-w-4xl">
        <p className="font-mono text-sm font-medium uppercase tracking-widest text-blue-600">
          {site.role}
        </p>
        <h1 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">{site.name}</h1>
        <p className="mt-4 text-lg text-slate-600">{site.tagline}</p>
        <div className="mt-8 flex justify-center gap-4">
          <a
            href="#projects"
            className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            View my projects
          </a>
          {site.cvUrl && (
            <a
              href={site.cvUrl}
              className="inline-block rounded-md border border-slate-300 px-6 py-3 text-slate-700 transition-colors duration-200 hover:bg-slate-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
              Download CV
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
