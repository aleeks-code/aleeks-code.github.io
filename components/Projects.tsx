import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <h2 className="font-mono text-2xl font-semibold text-slate-900">
        <span className="text-blue-600">{'// '}</span>Progetti
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
