import { site } from '@/data/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
        <p>
          &copy; {year} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href={site.githubUrl}
            className="hover:text-gray-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            GitHub
          </a>
          <a
            href={site.linkedinUrl}
            className="hover:text-gray-700 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
