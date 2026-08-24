'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '@/data/projects';

type View = 'desktop' | 'mobile';

function viewBtnClass(isActive: boolean) {
  return `min-h-11 min-w-11 px-4 py-3 text-sm font-semibold tracking-[0.06em] uppercase transition-colors duration-200 ${
    isActive ? 'bg-navy text-cream' : 'bg-transparent text-navy'
  }`;
}

export default function Projects() {
  const [active, setActive] = useState(0);
  const [view, setView] = useState<View>('desktop');
  const stopRefs = useRef<(HTMLDivElement | null)[]>([]);
  const activeProject = projects[active];

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number((entry.target as HTMLElement).dataset.stop);
            setActive(index);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    stopRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="progetti"
      className="relative scroll-mt-20 bg-navy md:h-[var(--projects-scroll-h)]"
      style={{ ['--projects-scroll-h' as string]: `${projects.length * 113.34}vh` }}
    >
      {/* invisible scroll-position markers driving the desktop showcase below */}
      <div className="pointer-events-none absolute inset-0 hidden md:block">
        {projects.map((project, i) => (
          <div
            key={project.title}
            ref={(el) => {
              stopRefs.current[i] = el;
            }}
            data-stop={i}
            style={{ height: `${100 / projects.length}%` }}
          />
        ))}
      </div>

      {/* desktop: sticky scrollytelling showcase */}
      <div className="sticky top-0 hidden h-screen min-h-[640px] grid-cols-[minmax(340px,41%)_1fr] md:grid">
        <div
          className="absolute top-0 left-0 z-10 h-[3px] bg-coral transition-[width] duration-450 ease-[cubic-bezier(.4,0,.2,1)]"
          style={{ width: `${(active + 1) * 88}px` }}
        />

        <div className="flex min-h-0 min-w-0 flex-col justify-between gap-5 overflow-hidden px-8 pt-10 pb-8 lg:px-12">
          <div>
            <div className="flex items-baseline justify-between gap-4">
              <h2 className="m-0 text-sm font-semibold tracking-[0.14em] text-white/65 uppercase">
                Lavori selezionati
              </h2>
              <span className="text-sm text-white/50 tabular-nums">
                0{projects.length} progetti
              </span>
            </div>
            <div className="mt-6">
              {projects.map((project, i) => {
                const isActive = active === i;
                return (
                  <button
                    key={project.title}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className="flex w-full items-baseline gap-4 border-b border-white/16 py-3 pl-4 text-left transition-[box-shadow,opacity] duration-300"
                    style={{
                      boxShadow: `inset 3px 0 0 ${isActive ? '#2B4BF2' : 'rgba(255,255,255,0)'}`,
                      opacity: isActive ? 1 : 0.55,
                    }}
                  >
                    <span
                      className={`text-[14px] font-semibold tabular-nums transition-colors duration-300 ${isActive ? 'text-accent' : 'text-white/40'}`}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="font-semibold text-white transition-[font-size] duration-300"
                      style={{ fontSize: isActive ? 'clamp(28px,3vw,40px)' : 'clamp(25px,2.6vw,34px)' }}
                    >
                      {project.title}
                    </span>
                    <span className="flex-1" />
                    <span
                      className={`text-[15px] whitespace-nowrap transition-colors duration-300 ${isActive ? 'text-white/80' : 'text-white/45'}`}
                    >
                      {project.sector}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-0 flex-[0_1_auto]">
            {projects.map((project, i) => (
              <div
                key={project.title}
                className="transition-[opacity,transform] duration-300"
                style={
                  active === i
                    ? { position: 'static', opacity: 1, transform: 'none' }
                    : {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        opacity: 0,
                        transform: 'translateY(8px)',
                        pointerEvents: 'none',
                      }
                }
              >
                <div className="flex items-center gap-2.5">
                  <span className="h-[3px] w-[18px] bg-coral" />
                  <span className="text-sm font-semibold tracking-[0.14em] text-white uppercase">
                    Progetto demo
                  </span>
                </div>
                <dl className="mt-3.5 grid grid-cols-[auto_1fr] gap-x-5 gap-y-2">
                  <dt className="text-sm text-white/50">Obiettivo</dt>
                  <dd className="m-0 text-base leading-tight text-white">
                    {project.detail.objective}
                  </dd>
                  <dt className="text-sm text-white/50">Scelta</dt>
                  <dd className="m-0 text-[15.5px] leading-snug text-white/80">
                    {project.detail.choice}
                  </dd>
                  <dt className="text-sm text-white/50">Interfaccia</dt>
                  <dd className="m-0 text-[15.5px] leading-snug text-white/80">
                    {project.detail.interfaceNote}
                  </dd>
                  <dt className="text-sm text-white/50">Tecnologie</dt>
                  <dd className="m-0 flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[11.5px] font-medium tracking-[0.01em] text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </dd>
                </dl>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-0 overflow-hidden border-l border-white/14 bg-cream-dark">
          {projects.map((project, i) => (
            <div
              key={project.title}
              className="absolute inset-0 box-border transition-[opacity,clip-path] duration-450 ease-[cubic-bezier(.4,0,.2,1)]"
              style={{
                display: view === 'mobile' ? 'flex' : 'block',
                alignItems: 'center',
                justifyContent: 'center',
                background: view === 'mobile' ? '#E7E1D6' : 'transparent',
                padding: view === 'mobile' ? '28px 0 130px' : 0,
                opacity: active === i ? 1 : 0,
                clipPath: active === i ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)',
                pointerEvents: active === i ? 'auto' : 'none',
              }}
            >
              {view === 'desktop' ? (
                <Image
                  src={project.imageDesktop}
                  alt={`${project.title} — schermata desktop`}
                  fill
                  sizes="60vw"
                  className="object-cover"
                />
              ) : (
                <div className="relative h-[min(62vh,600px)] w-[300px] overflow-hidden border border-navy">
                  <Image
                    src={project.imageMobile}
                    alt={`${project.title} — schermata mobile`}
                    fill
                    sizes="300px"
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          ))}

          <div
            role="group"
            aria-label="Formato dell’anteprima"
            className="absolute top-6 right-6 z-3 flex border border-navy bg-cream/95"
          >
            <button
              type="button"
              onClick={() => setView('desktop')}
              aria-pressed={view === 'desktop'}
              className={viewBtnClass(view === 'desktop')}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setView('mobile')}
              aria-pressed={view === 'mobile'}
              className={viewBtnClass(view === 'mobile')}
            >
              Mobile
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%] bg-gradient-to-t from-navy/45 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 bg-navy/95 px-6 py-5">
            <div className="relative min-h-[58px] flex-1">
              {projects.map((project, i) => (
                <p
                  key={project.title}
                  className="m-0 max-w-[46ch] text-[clamp(19px,1.7vw,25px)] leading-tight font-medium tracking-[-0.02em] text-white transition-[opacity,transform] duration-300"
                  style={
                    active === i
                      ? { position: 'static', opacity: 1, transform: 'none' }
                      : {
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          opacity: 0,
                          transform: 'translateY(8px)',
                          pointerEvents: 'none',
                        }
                  }
                >
                  {project.caption}
                </p>
              ))}
            </div>
            {activeProject.liveUrl && (
              <a
                href={activeProject.liveUrl}
                className="bg-white px-5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-navy transition-colors duration-200 hover:bg-brand hover:text-white"
              >
                Vedi progetto
              </a>
            )}
          </div>
        </div>
      </div>

      {/* mobile: tab-selectable card, not scroll-driven */}
      <div className="static block bg-navy px-6 py-14 sm:px-8 md:hidden">
        <div className="flex items-baseline justify-between">
          <span className="text-[13.5px] font-semibold tracking-[0.14em] text-white/65 uppercase">
            Lavori selezionati
          </span>
          <span className="text-sm text-white/50">0{projects.length} progetti</span>
        </div>
        <div role="tablist" aria-label="Progetti" className="mt-5 flex gap-2">
          {projects.map((project, i) => (
            <button
              key={project.title}
              type="button"
              role="tab"
              onClick={() => setActive(i)}
              aria-selected={active === i}
              className={`min-h-11 flex-1 border px-2 py-2.5 text-[13.5px] font-semibold transition-colors duration-200 ${
                active === i
                  ? 'border-white bg-white text-navy'
                  : 'border-white/30 bg-transparent text-white/75'
              }`}
            >
              {project.title}
            </button>
          ))}
        </div>

        <div className="relative mt-5 h-[300px] overflow-hidden bg-cream-dark">
          <Image
            src={view === 'desktop' ? activeProject.imageDesktop : activeProject.imageMobile}
            alt={`${activeProject.title} — schermata ${view === 'desktop' ? 'desktop' : 'mobile'}`}
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            role="group"
            aria-label="Formato dell’anteprima"
            className="absolute top-3 right-3 z-3 flex border border-navy bg-cream/95"
          >
            <button
              type="button"
              onClick={() => setView('desktop')}
              aria-pressed={view === 'desktop'}
              className={viewBtnClass(view === 'desktop')}
            >
              Desktop
            </button>
            <button
              type="button"
              onClick={() => setView('mobile')}
              aria-pressed={view === 'mobile'}
              className={viewBtnClass(view === 'mobile')}
            >
              Mobile
            </button>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center gap-2.5">
            <span className="h-[3px] w-4 bg-coral" />
            <span className="text-[13.5px] font-semibold tracking-[0.14em] text-white uppercase">
              Progetto demo
            </span>
          </div>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white">
            {activeProject.title}
          </h3>
          <p className="mt-2 text-[15.5px] leading-relaxed text-white/78">
            {activeProject.detail.objective}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {activeProject.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/20 bg-white/5 px-2.5 py-0.5 text-[11.5px] font-medium tracking-[0.01em] text-white/70"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {activeProject.liveUrl && (
          <a
            href={activeProject.liveUrl}
            className="mt-5 block min-h-13 box-border p-4 text-center text-base font-semibold text-navy bg-white"
          >
            Vedi progetto
          </a>
        )}
      </div>
    </section>
  );
}
