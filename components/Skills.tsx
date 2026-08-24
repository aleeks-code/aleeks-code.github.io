import { skillGroups } from '@/data/skills';

export default function Skills() {
  return (
    <section id="competenze" className="scroll-mt-20 bg-cream">
      <div className="mx-auto max-w-[1240px] px-6 py-14 sm:px-8 sm:py-20 lg:px-14 lg:py-24">
        <div className="grid grid-cols-1 items-end gap-6 pb-7 sm:gap-10 sm:pb-11 md:grid-cols-[minmax(0,1.3fr)_minmax(260px,1fr)]">
          <h2 className="m-0 text-[clamp(30px,3.2vw,44px)] leading-[1.06] font-medium tracking-[-0.03em]">
            Con cosa lavoro, e dove l’ho usato.
          </h2>
          <p className="m-0 text-base leading-relaxed text-ink">
            Nessun livello dichiarato: contano i progetti in cui queste tecnologie hanno risolto
            un problema.
          </p>
        </div>

        <div className="border-t border-navy">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="grid grid-cols-1 gap-3 border-b border-border-muted py-6 sm:gap-8 md:grid-cols-[220px_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <h3 className="m-0 text-xl font-semibold tracking-[-0.02em]">{group.category}</h3>
              <p className="m-0 text-base leading-snug sm:text-[17px]">{group.tools.join(', ')}</p>
              <p className="m-0 text-sm leading-snug text-ink">{group.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
