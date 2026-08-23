export interface SiteInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  cvUrl?: string;
}

export const site: SiteInfo = {
  name: 'Alex Munafò',
  role: 'Web Developer Junior',
  tagline: 'Aiuto le attività a costruire il loro spazio online.',
  bio: 'Realizzo siti vetrina, landing page e presenze online per attività commerciali che vogliono farsi trovare sul web. L’obiettivo è dare a ogni attività uno spazio digitale curato, semplice da gestire e pensato per portare clienti reali.',
  email: 'alexmunni@outlook.it',
  githubUrl: 'https://github.com/aleeks-code',
  instagramUrl: 'https://www.instagram.com/xdmunni/',
};
