import Image from 'next/image';
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-slate-200 overflow-hidden transition-shadow duration-200 hover:shadow-lg">
      <Image
        src={project.imageSrc}
        alt={`${project.title} preview`}
        width={600}
        height={400}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-slate-900">{project.title}</h3>
        {project.role && (
          <p className="mt-1 font-mono text-xs font-medium text-blue-600 uppercase tracking-wide">
            {project.role}
          </p>
        )}
        <p className="mt-2 text-sm text-slate-600">{project.description}</p>
        {project.impact && (
          <p className="mt-2 text-sm text-slate-800 font-medium">{project.impact}</p>
        )}
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="font-mono text-xs bg-slate-100 text-slate-700 rounded px-2 py-1"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              className="text-blue-600 hover:underline rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Codice
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              className="text-blue-600 hover:underline rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
            >
              Demo
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
