import { site } from '@/data/site';

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="font-mono text-2xl font-semibold text-slate-900">
          <span className="text-blue-600">{'// '}</span>Chi sono
        </h2>
        <p className="mt-4 max-w-2xl text-slate-600 leading-relaxed">{site.bio}</p>
      </div>
    </section>
  );
}
