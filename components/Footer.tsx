import { site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy text-slate-300 py-8">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row justify-between gap-4 font-mono text-sm">
        <p>
          &copy; {year} {site.name}. Tutti i diritti riservati.
        </p>
        <div className="flex gap-4">
          {site.githubUrl && (
            <a
              href={site.githubUrl}
              className="transition-colors duration-200 hover:text-brand rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              GitHub
            </a>
          )}
          {site.instagramUrl && (
            <a
              href={site.instagramUrl}
              className="transition-colors duration-200 hover:text-brand rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              Instagram
            </a>
          )}
          {site.linkedinUrl && (
            <a
              href={site.linkedinUrl}
              className="transition-colors duration-200 hover:text-brand rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
