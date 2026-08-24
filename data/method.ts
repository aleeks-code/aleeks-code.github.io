export interface MethodStep {
  number: string;
  title: string;
  description: string;
}

export const methodSteps: MethodStep[] = [
  {
    number: '01',
    title: 'Confronto',
    description:
      'Ci parliamo: capisco cosa ti serve, chi sono i tuoi clienti e cosa deve fare il sito.',
  },
  {
    number: '02',
    title: 'Struttura',
    description:
      'Definiamo pagine e contenuti; ti mostro una bozza da approvare prima di scrivere codice.',
  },
  {
    number: '03',
    title: 'Sviluppo',
    description: 'Costruisco il sito e lo provo su desktop, tablet e telefono prima di mostrartelo.',
  },
  {
    number: '04',
    title: 'Pubblicazione e supporto',
    description: 'Pubblico il sito, ti spiego come gestirlo e resto disponibile per le modifiche.',
  },
];
