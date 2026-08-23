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
    title: 'Progetto Uno',
    description:
      'Descrizione segnaposto del primo progetto. Da sostituire con un caso reale.',
    role: 'Progetto personale',
    impact: 'Sostituisci con un risultato concreto, es. tempo di caricamento ridotto del 40%.',
    tags: ['TypeScript', 'React'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-1.svg',
  },
  {
    title: 'Progetto Due',
    description:
      'Descrizione segnaposto del secondo progetto. Da sostituire con un caso reale.',
    role: 'Progetto di gruppo — frontend',
    impact: 'Sostituisci con un risultato concreto, es. oltre 1.000 utenti raggiunti.',
    tags: ['Next.js', 'Tailwind CSS'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-2.svg',
  },
  {
    title: 'Progetto Tre',
    description:
      'Descrizione segnaposto del terzo progetto. Da sostituire con un caso reale.',
    role: 'Progetto personale',
    impact: 'Sostituisci con un risultato concreto.',
    tags: ['Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-3.svg',
  },
];
