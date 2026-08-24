export interface SiteInfo {
  name: string;
  role: string;
  heroTitle: string;
  heroTitleAccent: string;
  heroLine1: string;
  heroLine2: string;
  tagline: string;
  bio: string;
  aboutHeading: string;
  aboutHeadingAccent: string;
  aboutHeadingRest: string;
  principles: { label: string; detail: string }[];
  contactHeading: string;
  contactHeadingAccent: string;
  contactIntro: string;
  email: string;
  githubUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  cvUrl?: string;
}

export const site: SiteInfo = {
  name: 'Alex Munafò',
  role: 'Web developer, Mantova',
  heroTitle: 'Costruisco siti web per attività ',
  heroTitleAccent: 'reali.',
  heroLine1: 'Chiari da usare.',
  heroLine2: 'Difficili da ignorare.',
  tagline:
    'Sono Alex Munafò, web developer a Mantova. Realizzo siti vetrina e landing page pensati per presentare meglio un’attività e trasformare le visite in contatti.',
  bio: 'Sono Alex Munafò, web developer a Mantova. Realizzo siti vetrina e landing page per attività e professionisti che vogliono presentarsi meglio online. Lavoro con attenzione alla chiarezza, alle prestazioni e alla semplicità di gestione.',
  aboutHeading: 'Un buon sito non deve soltanto essere ',
  aboutHeadingAccent: 'bello.',
  aboutHeadingRest: ' Deve rendere semplice capire chi sei, cosa offri e come contattarti.',
  principles: [
    { label: 'Chiarezza', detail: 'prima degli effetti.' },
    { label: 'Responsive', detail: 'dal telefono al desktop.' },
    { label: 'Supporto', detail: 'anche dopo la pubblicazione.' },
  ],
  contactHeading: 'Il prossimo sito potrebbe essere il ',
  contactHeadingAccent: 'tuo.',
  contactIntro:
    'Raccontami cosa vuoi realizzare, cosa non funziona nel tuo sito attuale oppure da quale idea vuoi partire.',
  email: 'alexmunni@outlook.it',
  githubUrl: 'https://github.com/aleeks-code',
  instagramUrl: 'https://www.instagram.com/xdmunni/',
};
