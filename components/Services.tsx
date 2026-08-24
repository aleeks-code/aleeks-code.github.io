'use client';

import { useState } from 'react';
import Image from 'next/image';
import { services } from '@/data/services';

export default function Services() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="servizi" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="grid grid-cols-1 items-end gap-6 pb-8 sm:gap-10 sm:pb-12 md:grid-cols-[minmax(0,1.5fr)_minmax(260px,1fr)]">
          <h2 className="m-0 text-[clamp(30px,3.6vw,52px)] leading-[1.04] font-medium tracking-[-0.03em]">
            Tre modi in cui posso lavorare sul tuo sito.
          </h2>
          <p className="m-0 text-base leading-relaxed text-ink">
            Apri una voce per vedere cosa comprende, per chi è pensata e quale problema risolve.
          </p>
        </div>

        <div className="border-t border-navy">
          {services.map((service, index) => {
            const isOpen = open === index;
            return (
              <div key={service.code} className="border-b border-border-muted">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 py-4.5 text-left transition-[transform,background-color] duration-300 hover:bg-cream-dark/60 sm:items-start sm:gap-8 sm:py-7"
                  style={{ transform: isOpen ? 'translateX(8px)' : 'none' }}
                >
                  <span
                    className="mt-0 rounded-[3px] border px-[7px] py-1 text-xs font-semibold tracking-[0.05em] transition-colors duration-200 sm:mt-2"
                    style={{
                      color: isOpen ? '#2B4BF2' : '#7A7263',
                      borderColor: isOpen ? '#2B4BF2' : '#C6BEB0',
                    }}
                  >
                    {service.code}
                  </span>
                  <span className="flex min-w-0 flex-1 flex-col gap-1.5">
                    <span className="text-[clamp(22px,2.8vw,38px)] leading-[1.05] font-medium tracking-[-0.03em]">
                      {service.title}
                    </span>
                    <span className="hidden text-base text-ink sm:inline">{service.summary}</span>
                  </span>
                  <span
                    className="flex-shrink-0 self-center text-2xl leading-none font-light transition-transform duration-300 sm:self-start"
                    style={{
                      color: isOpen ? '#2B4BF2' : '#0A1428',
                      transform: isOpen ? 'rotate(45deg)' : 'none',
                    }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-[max-height,opacity] duration-320 ease-[cubic-bezier(.4,0,.2,1)]"
                  style={{ maxHeight: isOpen ? '640px' : '0px', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-4 text-[15.5px] leading-relaxed text-ink sm:hidden">
                    {service.summary}
                  </p>
                  <div className="grid grid-cols-1 gap-6 pb-7 sm:grid-cols-3 sm:gap-8 lg:grid-cols-[1fr_1fr_1fr_280px]">
                    <div>
                      <h3 className="m-0 text-sm font-semibold tracking-[0.14em] text-[#7A7263] uppercase">
                        Comprende
                      </h3>
                      <p className="mt-3 text-base leading-relaxed">{service.comprende}</p>
                    </div>
                    <div>
                      <h3 className="m-0 text-sm font-semibold tracking-[0.14em] text-[#7A7263] uppercase">
                        Per chi
                      </h3>
                      <p className="mt-3 text-base leading-relaxed">{service.perChi}</p>
                    </div>
                    <div>
                      <h3 className="m-0 text-sm font-semibold tracking-[0.14em] text-[#7A7263] uppercase">
                        Risolve
                      </h3>
                      <p className="mt-3 text-base leading-relaxed">{service.risolve}</p>
                    </div>
                    <div className="relative h-[170px] bg-cream-dark">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
