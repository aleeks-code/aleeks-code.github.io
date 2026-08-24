import { methodSteps } from '@/data/method';

export default function Method() {
  return (
    <section className="bg-navy">
      <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-24">
        <div className="grid grid-cols-1 items-end gap-6 sm:gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(260px,1fr)]">
          <h2 className="m-0 text-[clamp(30px,3.2vw,44px)] leading-[1.06] font-medium tracking-[-0.03em] text-white">
            Cosa succede quando decidi di lavorare con me.
          </h2>
          <p className="m-0 text-base leading-relaxed text-white/70">
            Quattro passaggi. Ti aggiorno a ogni fase e non vado avanti senza la tua conferma.
          </p>
        </div>

        <div className="relative mt-10 pt-6 sm:mt-16">
          <div className="absolute inset-x-0 top-0 h-px bg-white/22" />
          <div className="absolute top-0 left-0 h-[3px] w-1/4 bg-coral" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-9 lg:grid-cols-4">
            {methodSteps.map((step) => (
              <div key={step.number}>
                <div className="text-sm font-semibold tracking-[0.1em] text-accent tabular-nums">
                  {step.number}
                </div>
                <h3 className="mt-3 text-xl font-semibold tracking-[-0.015em] text-white">
                  {step.title}
                </h3>
                <p className="mt-2.5 text-[15.5px] leading-relaxed text-white/70">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
