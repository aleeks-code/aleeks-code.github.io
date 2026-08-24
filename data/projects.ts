export interface ProjectDetail {
  objective: string;
  choice: string;
  interfaceNote: string;
}

export interface Project {
  title: string;
  sector: string;
  caption: string;
  detail: ProjectDetail;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageDesktop: string;
  imageMobile: string;
}

export const projects: Project[] = [
  {
    title: 'Bella Napoli',
    sector: 'Ristorazione',
    caption: 'Prenotazione e menu sempre a un dito di distanza, anche a tavola.',
    detail: {
      objective: 'Rendere menu, orari e prenotazione immediatamente accessibili.',
      choice:
        'Navigazione semplice, atmosfera calda e CTA di prenotazione sempre riconoscibile.',
      interfaceNote:
        'La prenotazione resta raggiungibile da ogni schermata, anche scorrendo il menu.',
    },
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    liveUrl: '/demo/ristorante',
    imageDesktop: 'https://placehold.co/1200x800/8b3a2b/f5ede4?text=Bella+Napoli',
    imageMobile: 'https://placehold.co/600x1200/8b3a2b/f5ede4?text=Bella+Napoli',
  },
  {
    title: 'FitZone',
    sector: 'Palestra',
    caption: 'Una sola azione ripetuta lungo la pagina: prenota la prova gratuita.',
    detail: {
      objective: 'Trasformare le visite in richieste per una prova gratuita.',
      choice:
        'Ritmo energico, struttura orientata all’azione e ripetizione controllata della CTA.',
      interfaceNote: 'Una sola azione a ogni cambio di sezione, con un form breve in chiusura.',
    },
    tags: ['Next.js', 'Tailwind CSS'],
    liveUrl: '/demo/palestra',
    imageDesktop: 'https://placehold.co/1200x800/0a0a0a/f5ede4?text=FitZone',
    imageMobile: 'https://placehold.co/600x1200/0a0a0a/f5ede4?text=FitZone',
  },
  {
    title: 'Studio Rossi & Associati',
    sector: 'Studio legale',
    caption: 'Gerarchia di sole parole: le aree di competenza prima di tutto.',
    detail: {
      objective: 'Comunicare autorevolezza e rendere consultabili le aree di competenza.',
      choice: 'Gerarchia tipografica sobria, navigazione chiara e contatto diretto.',
      interfaceNote: 'Aree di competenza in indice; i contatti restano a portata da ogni sezione.',
    },
    tags: ['Next.js', 'Tailwind CSS'],
    liveUrl: '/demo/studio',
    imageDesktop: 'https://placehold.co/1200x800/0f1b33/f5ede4?text=Studio+Rossi',
    imageMobile: 'https://placehold.co/600x1200/0f1b33/f5ede4?text=Studio+Rossi',
  },
];
