import { site } from '@/data/site';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">About</h2>
      <p className="mt-4 text-gray-600 leading-relaxed">{site.bio}</p>
    </section>
  );
}
