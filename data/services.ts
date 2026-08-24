export interface Service {
  code: string;
  title: string;
  summary: string;
  comprende: string;
  perChi: string;
  risolve: string;
  image: string;
  imageAlt: string;
}

export const services: Service[] = [
  {
    code: 'SV',
    title: 'Siti vetrina',
    summary: 'Chi ti cerca trova un sito ordinato e capisce subito cosa offri.',
    comprende:
      'Struttura e testi impaginati, pagine servizi e contatti, impostazione di base per la ricerca locale.',
    perChi: 'Attività con una sede e un pubblico locale: ristoranti, negozi, studi, laboratori.',
    risolve:
      'Informazioni sparse tra social, volantini e recensioni, senza un posto che le tenga insieme.',
    image: 'https://placehold.co/560x340/e7e1d6/3a4457?text=Sito+vetrina',
    imageAlt: 'Dettaglio di un sito vetrina',
  },
  {
    code: 'LP',
    title: 'Landing page',
    summary: 'Una pagina sola, costruita intorno a una richiesta precisa.',
    comprende: 'Una pagina con un solo obiettivo, form breve e versione mobile curata per prima.',
    perChi: 'Promozioni, aperture, nuovi servizi, corsi con iscrizione o prenotazione.',
    risolve:
      'Campagne che portano visite ma non richieste, perché la pagina chiede troppe cose insieme.',
    image: 'https://placehold.co/560x340/e7e1d6/3a4457?text=Landing+page',
    imageAlt: 'Dettaglio di una landing page',
  },
  {
    code: 'MA',
    title: 'Manutenzione e assistenza',
    summary: 'Aggiornamenti e modifiche senza dover cercare ogni volta qualcuno.',
    comprende:
      'Aggiornamenti tecnici, modifiche ai contenuti, controlli periodici e copie di sicurezza.',
    perChi: 'Chi ha già un sito e nessuno che lo segua con continuità.',
    risolve: 'Siti fermi da anni, orari sbagliati e pagine che si rompono senza preavviso.',
    image: 'https://placehold.co/560x340/e7e1d6/3a4457?text=Manutenzione',
    imageAlt: 'Dettaglio di una pagina aggiornata',
  },
];
