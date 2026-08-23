import { skills } from '@/data/skills';
import Reveal from '@/components/Reveal';

const categoryLabels: Record<string, string> = {
  language: 'Linguaggi',
  framework: 'Framework e Librerie',
  tool: 'Strumenti',
  other: 'Altro',
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="scroll-mt-20 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4 py-16">
        <Reveal>
          <h2 className="font-mono text-2xl font-semibold text-navy">
            <span className="text-brand">{'// '}</span>Competenze
          </h2>
          <div className="mt-6 space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-mono text-sm font-medium text-slate-500 uppercase tracking-wide">
                  {categoryLabels[category] ?? category}
                </h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {skills
                    .filter((skill) => skill.category === category)
                    .map((skill) => (
                      <li
                        key={skill.name}
                        className="text-sm bg-white text-slate-800 border border-slate-200 rounded-full px-3 py-1 transition-colors duration-200 hover:border-brand"
                      >
                        {skill.name}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
