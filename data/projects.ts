export interface Project {
  title: string;
  description: string;
  role?: string;
  impact?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageSrc: string;
}

export const projects: Project[] = [
  {
    title: 'Project One',
    description:
      'Placeholder description of project one. Replace with a real project summary.',
    role: 'Solo project',
    impact: 'Replace with a concrete outcome, e.g. reduced load time by 40%.',
    tags: ['TypeScript', 'React'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-1.svg',
  },
  {
    title: 'Project Two',
    description:
      'Placeholder description of project two. Replace with a real project summary.',
    role: 'Team project — led the frontend',
    impact: 'Replace with a concrete outcome, e.g. shipped to 1,000+ users.',
    tags: ['Next.js', 'Tailwind CSS'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-2.svg',
  },
  {
    title: 'Project Three',
    description:
      'Placeholder description of project three. Replace with a real project summary.',
    role: 'Solo project',
    impact: 'Replace with a concrete outcome.',
    tags: ['Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-3.svg',
  },
];
