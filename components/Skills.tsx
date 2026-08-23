import { skills } from '@/data/skills';

const categoryLabels: Record<string, string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  tool: 'Tools',
  other: 'Other',
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
      <div className="mt-6 space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {categoryLabels[category] ?? category}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <li
                    key={skill.name}
                    className="text-sm bg-gray-100 text-gray-800 rounded-full px-3 py-1"
                  >
                    {skill.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
