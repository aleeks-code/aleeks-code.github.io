export interface SiteInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl?: string;
}

export const site: SiteInfo = {
  name: 'Your Name',
  role: 'Software Developer',
  tagline: 'Software developer building things for the web.',
  bio: 'Placeholder bio. Replace this paragraph with a short description of your background, what you work on, and what you are looking for.',
  email: 'you@example.com',
  githubUrl: 'https://github.com/aleeks-code',
  linkedinUrl: 'https://linkedin.com/in/your-profile',
};
