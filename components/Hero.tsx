import { site } from '@/data/site';

export default function Hero() {
  return (
    <section id="top" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">{site.name}</h1>
      <p className="mt-4 text-lg text-gray-600">{site.tagline}</p>
      <div className="mt-8 flex justify-center gap-4">
        <a
          href="#projects"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          View my projects
        </a>
        {site.cvUrl && (
          <a
            href={site.cvUrl}
            className="inline-block rounded-md border border-gray-300 px-6 py-3 text-gray-700 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            Download CV
          </a>
        )}
      </div>
    </section>
  );
}
