import { site } from '@/data/site';

export default function Hero() {
  return (
    <section
      id="top"
      className="scroll-mt-20 bg-cream md:flex md:min-h-[calc(100svh-84px)] md:flex-col md:justify-center"
    >
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-start gap-x-8 px-6 pt-12 pb-14 sm:px-8 sm:pt-16 sm:pb-20 md:w-full md:grid-cols-[minmax(0,1.55fr)_minmax(280px,0.95fr)] md:gap-x-16 lg:px-14">
        <h1 className="order-1 m-0 max-w-[14ch] text-[clamp(40px,6.1vw,88px)] leading-[0.94] font-medium tracking-[-0.038em] md:col-start-1 md:row-start-1">
          {site.heroTitle}
          <span className="font-serif text-[1.02em] font-normal italic">
            {site.heroTitleAccent}
          </span>
        </h1>

        <div className="order-3 mt-7 border-t-2 border-navy pt-3 md:order-none md:col-start-2 md:row-start-1 md:mt-0">
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
