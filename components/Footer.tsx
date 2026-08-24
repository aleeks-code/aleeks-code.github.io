import { site } from '@/data/site';

const links = [
  { href: '#servizi', label: 'Servizi' },
  { href: '#progetti', label: 'Progetti' },
  { href: '#chi-sono', label: 'Chi sono' },
  { href: '#competenze', label: 'Competenze' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/18 bg-navy">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-6 px-6 py-10 sm:px-8 sm:py-14 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,1fr)] md:gap-16 lg:px-14">
        <div>
          <div className="text-lg font-semibold text-white">{site.name}</div>
          <div className="mt-1.5 text-[15.5px] text-white/60">{site.role}</div>
        </div>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
          >
            {site.email}
          </a>
          {site.githubUrl && (
            <a
              href={site.githubUrl}
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              GitHub
            </a>
          )}
          {site.instagramUrl && (
            <a
              href={site.instagramUrl}
              className="text-sm text-white/70 transition-colors duration-200 hover:text-white"
            >
              Instagram
            </a>
          )}
          <span className="flex-1" />
          <span className="text-sm text-white/45">
            © {year} {site.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
