export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
}

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'React', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Tailwind CSS', category: 'framework' },
  { name: 'Git', category: 'tool' },
  { name: 'Docker', category: 'tool' },
];
