import Image from 'next/image';
import { site } from '@/data/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="relative isolate scroll-mt-20 overflow-hidden bg-cream md:flex md:min-h-[calc(100svh-84px)] md:flex-col md:justify-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          backgroundImage: 'radial-gradient(rgba(10,20,40,0.09) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
        }}
      />
      <Image
        src="/am-mark.png"
        alt=""
        aria-hidden="true"
        width={1254}
        height={1254}
        className="pointer-events-none absolute -right-16 -bottom-20 -z-10 hidden h-auto w-[46vw] max-w-[640px] min-w-[420px] opacity-10 md:block"
      />

      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-x-8 px-6 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20 md:w-full md:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.95fr)] md:gap-x-16 lg:px-14">
        <h1 className="order-1 m-0 max-w-[14ch] text-[clamp(40px,6.1vw,88px)] leading-[0.94] font-medium tracking-[-0.038em] md:col-start-1 md:row-start-1">
          {site.heroTitle}
          <span className="font-serif text-[1.02em] font-normal italic">
            {site.heroTitleAccent}
          </span>
        </h1>

        <div className="relative order-3 mt-7 border-t-2 border-navy pt-3 md:order-none md:col-start-2 md:row-start-1 md:mt-0">
          {/* decorative browser-window mockup — anchored above this column, never overlaps it regardless of viewport height */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-0 bottom-full mb-5 hidden w-[220px] -rotate-3 border border-navy/15 bg-cream-dark shadow-[0_24px_60px_-28px_rgba(10,20,40,0.4)] md:block lg:mb-6 lg:w-[260px]"
          >
            <div className="flex items-center gap-1.5 border-b border-navy/15 bg-cream-darker px-3 py-2">
              <span className="h-2 w-2 rounded-full bg-coral" />
              <span className="h-2 w-2 rounded-full bg-brand/55" />
              <span className="h-2 w-2 rounded-full bg-navy/25" />
            </div>
            <div className="space-y-2 p-3">
              <div className="flex items-center justify-between">
                <span className="h-1.5 w-8 rounded-full bg-navy/30" />
                <div className="flex gap-1">
                  <span className="h-1.5 w-5 rounded-full bg-navy/15" />
                  <span className="h-1.5 w-5 rounded-full bg-navy/15" />
                  <span className="h-1.5 w-5 rounded-full bg-navy/15" />
                </div>
              </div>
              <div className="h-12 rounded-sm bg-brand/12" />
              <div className="space-y-1">
                <span className="block h-1.5 w-full rounded-full bg-navy/12" />
                <span className="block h-1.5 w-4/5 rounded-full bg-navy/12" />
              </div>
              <span className="inline-block h-4 w-14 rounded-full bg-coral" />
            </div>
          </div>
          <p className="mt-4 text-[16.5px] leading-relaxed text-ink">{site.tagline}</p>
          <a
            href="#progetti"
            className="mt-7 flex items-center justify-between bg-brand px-[22px] py-5 text-lg font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:pl-8"
          >
            <span>Esplora i progetti</span>
            <span className="text-xl">→</span>
          </a>
          <a
            href="#contatti"
            className="mt-4 inline-flex items-center gap-2.5 border-b border-border-muted pb-1 text-[15.5px] text-ink transition-colors duration-200 hover:border-navy hover:text-navy"
          >
            <span>Raccontami la tua idea</span>
            <span>→</span>
          </a>
        </div>

        <div className="order-2 mt-7 md:order-none md:col-start-1 md:row-start-2 md:mt-11">
          <div className="text-[clamp(26px,2.6vw,36px)] leading-[1.06] font-semibold tracking-[-0.025em]">
            {site.heroLine1}
          </div>
          <div className="text-[clamp(26px,2.6vw,36px)] leading-[1.06] font-semibold tracking-[-0.025em] text-brand">
            {site.heroLine2}
          </div>
        </div>
      </div>
    </section>
  );
}
