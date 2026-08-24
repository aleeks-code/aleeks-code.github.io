export interface SkillGroup {
  category: string;
  tools: string[];
  note: string;
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Frontend',
    tools: ['JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS'],
    note: 'Interfacce e impaginazione di Bella Napoli e FitZone: struttura, tipografia e comportamento responsive.',
  },
  {
    category: 'Backend e integrazioni',
    tools: ['Node.js', 'Python'],
    note: 'Invio dei moduli di contatto e piccoli automatismi, come le richieste di prenotazione via email.',
  },
  {
    category: 'Workflow e pubblicazione',
    tools: ['Git', 'Docker', 'deployment e manutenzione'],
    note: 'Messa online, aggiornamenti e modifiche successive senza rifare il sito da zero.',
  },
];
