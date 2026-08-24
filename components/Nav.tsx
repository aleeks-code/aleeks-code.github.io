'use client';

import { useEffect, useState } from 'react';
import { site } from '@/data/site';

const links = [
  { href: '#servizi', label: 'Servizi', id: 'servizi' },
  { href: '#progetti', label: 'Progetti', id: 'progetti' },
  { href: '#chi-sono', label: 'Chi sono', id: 'chi-sono' },
  { href: '#competenze', label: 'Competenze', id: 'competenze' },
];

const observedIds = ['servizi', 'progetti', 'chi-sono', 'metodo', 'competenze', 'contatti'];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-50% 0px -50% 0px', threshold: 0 }
    );

    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  function isActive(id: string) {
    return active === id || (id === 'chi-sono' && active === 'metodo');
  }

  return (
    <header className="sticky top-0 z-30 border-b border-navy bg-cream">
      <div className="mx-auto flex h-[84px] max-w-[1240px] items-center justify-between gap-8 px-6 sm:px-8 lg:px-14">
        <a href="#top" className="flex flex-shrink-0 items-baseline gap-3">
          <span className="text-[22px] font-semibold tracking-tight">{site.name}</span>
          <span className="hidden text-[15px] text-ink sm:inline">{site.role}</span>
        </a>

        <nav className="hidden items-center gap-5 md:flex lg:gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="border-b-2 pb-[3px] text-[15px] tracking-[0.01em] text-navy transition-colors duration-200"
              style={{ borderBottomColor: isActive(link.id) ? '#2B4BF2' : 'transparent' }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contatti"
            className="border border-navy px-[17px] py-[10px] text-[14.5px] transition-colors duration-200 hover:bg-navy hover:text-cream"
          >
            Parliamone
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label="Apri il menu"
          className="flex h-11 w-11 flex-col items-end justify-center gap-[5px] md:hidden"
        >
          <span className="block h-[1.5px] w-[22px] bg-navy" />
          <span className="block h-[1.5px] w-[22px] bg-navy" />
          <span className="block h-[1.5px] w-[15px] bg-navy" />
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="bg-navy p-5 md:hidden">
          {links.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center justify-between border-b border-white/16 text-xl text-white last:border-b-0"
            >
              <span>{link.label}</span>
              <span className="text-sm text-accent">0{index + 1}</span>
            </a>
          ))}
          <a
            href="#contatti"
            onClick={() => setOpen(false)}
            className="mt-4 block bg-white p-[15px] text-center text-base font-semibold text-navy"
          >
            Parliamone
          </a>
        </div>
      )}
    </header>
  );
}
