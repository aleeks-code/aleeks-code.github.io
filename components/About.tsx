import { site } from '@/data/site';

export default function About() {
  return (
    <section id="chi-sono" className="scroll-mt-20 border-t border-navy bg-cream">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-8 px-6 py-16 sm:gap-16 sm:px-8 sm:py-24 md:grid-cols-[minmax(0,1.35fr)_minmax(280px,1fr)] lg:px-14 lg:py-28">
        <h2 className="m-0 max-w-[22ch] text-[clamp(30px,3.5vw,50px)] leading-[1.08] font-medium tracking-[-0.03em]">
          {site.aboutHeading}
          <span className="font-serif font-normal italic">{site.aboutHeadingAccent}</span>
          {site.aboutHeadingRest}
        </h2>

        <div className="border-t-2 border-navy pt-2.5">
          <p className="mt-5 text-[17px] leading-relaxed text-ink">{site.bio}</p>
          <dl className="mt-8 grid">
            {site.principles.map((principle) => (
              <div
                key={principle.label}
                className="flex gap-4.5 border-b border-border-muted py-4 last:border-b-0"
              >
                <dt className="text-[16.5px] font-semibold tracking-[-0.01em] text-brand">
                  {principle.label}
                </dt>
                <dd className="m-0 text-[16.5px] leading-snug text-ink">{principle.detail}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
