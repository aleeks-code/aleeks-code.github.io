import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';
import Reveal from '@/components/Reveal';

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <h2 className="font-mono text-2xl font-semibold text-navy">
        <span className="text-brand">{'// '}</span>Progetti
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((project, index) => (
          <Reveal key={project.title} className={index === 0 ? 'sm:col-span-2' : undefined}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
