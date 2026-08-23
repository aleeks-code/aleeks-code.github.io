'use client';

import { useState } from 'react';
import { site } from '@/data/site';

const links = [
  { href: '#services', label: 'Servizi' },
  { href: '#about', label: 'Chi sono' },
  { href: '#projects', label: 'Progetti' },
  { href: '#skills', label: 'Competenze' },
  { href: '#contact', label: 'Contatti' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-slate-200">
      <nav className="mx-auto max-w-4xl flex items-center justify-between px-4 py-4">
        <a
          href="#top"
          className="font-mono font-semibold text-navy rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {site.name}
        </a>
        <button
          type="button"
          className="sm:hidden font-mono text-sm text-slate-700 rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          aria-label="Apri o chiudi il menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'Chiudi' : 'Menu'}
        </button>
        <ul className="hidden sm:flex gap-6 font-mono text-sm uppercase tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-slate-600 transition-colors duration-200 hover:text-brand rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul id="mobile-menu" className="sm:hidden flex flex-col gap-2 px-4 pb-4 font-mono text-sm uppercase tracking-wide">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block text-slate-600 transition-colors duration-200 hover:text-brand rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
