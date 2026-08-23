import Reveal from '@/components/Reveal';

const services = [
  {
    title: 'Siti Vetrina',
    description:
      'Un sito professionale che presenta la tua attività, i tuoi servizi e i tuoi contatti, pensato per farti trovare online.',
  },
  {
    title: 'Landing Page',
    description:
      'Pagine mirate a un obiettivo preciso — una promozione, un prodotto, una prenotazione — costruite per convertire i visitatori in clienti.',
  },
  {
    title: 'Manutenzione & Assistenza',
    description:
      'Aggiornamenti, piccole modifiche e supporto continuo, così il tuo sito resta sempre aggiornato senza pensieri.',
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <h2 className="font-mono text-2xl font-semibold text-navy">
        <span className="text-brand">{'// '}</span>Cosa faccio
      </h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {services.map((service, index) => (
          <Reveal key={service.title}>
            <div className="rounded-lg border border-slate-200 p-6 transition-shadow duration-200 hover:shadow-lg">
              <span className="font-mono text-sm text-brand">0{index + 1}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-navy">
                {service.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{service.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
