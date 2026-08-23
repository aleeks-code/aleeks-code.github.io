export interface Project {
  title: string;
  description: string;
  role?: string;
  impact?: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  accentFrom: string;
  accentTo: string;
}

export const projects: Project[] = [
  {
    title: 'Bella Napoli',
    description:
      'Sito vetrina per un ristorante italiano: menu, prenotazioni e orari sempre aggiornati. Progetto dimostrativo.',
    role: 'Progetto demo',
    impact: 'Pensato per convertire chi cerca "ristorante vicino a me" in una prenotazione.',
    tags: ['Next.js', 'Tailwind CSS'],
    liveUrl: '/demo/ristorante',
    accentFrom: '#8b3a2b',
    accentTo: '#c9a227',
  },
  {
    title: 'FitZone',
    description:
      'Landing page per una palestra: corsi, orari e call-to-action per la prova gratuita. Progetto dimostrativo.',
    role: 'Progetto demo',
    impact: 'Stile energico pensato per convertire i visitatori in nuovi iscritti.',
    tags: ['Next.js', 'Tailwind CSS'],
    liveUrl: '/demo/palestra',
    accentFrom: '#0a0a0a',
    accentTo: '#2e2e2e',
  },
  {
    title: 'Studio Rossi & Associati',
    description:
      'Sito vetrina per uno studio professionale: aree di competenza e contatti diretti. Progetto dimostrativo.',
    role: 'Progetto demo',
    impact: 'Immagine sobria e affidabile per un’attività di consulenza.',
    tags: ['Next.js', 'Tailwind CSS'],
    liveUrl: '/demo/studio',
    accentFrom: '#0f1b33',
    accentTo: '#b08d3d',
  },
];
