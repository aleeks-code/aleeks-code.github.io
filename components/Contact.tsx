'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import Reveal from '@/components/Reveal';

type Status = 'idle' | 'loading' | 'success' | 'error' | 'config-error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      setStatus('config-error');
      return;
    }

    if (formData.get('_gotcha')) {
      // Honeypot filled in by a bot — pretend success, send nothing.
      setStatus('success');
      form.reset();
      return;
    }

    setStatus('loading');

    const payload = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-4xl px-4 py-16">
      <Reveal>
      <h2 className="font-mono text-2xl font-semibold text-navy">
        <span className="text-brand">{'// '}</span>Contatti
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_gotcha">Lascia questo campo vuoto</label>
          <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Nome
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Messaggio
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-brand px-6 py-3 text-white transition-colors duration-200 hover:bg-brand-dark disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
        >
          {status === 'loading' ? 'Invio...' : 'Invia'}
        </button>
        <div aria-live="polite">
          {status === 'success' && (
            <p className="text-green-600">
              Grazie per il messaggio! Ti risponderò al più presto.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600">
              Qualcosa è andato storto. Riprova oppure scrivimi direttamente qui sotto.
            </p>
          )}
          {status === 'config-error' && (
            <p className="text-red-600">
              Il modulo di contatto non è ancora configurato. Scrivimi direttamente qui sotto.
            </p>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        Puoi anche scrivermi direttamente a{' '}
        <a
          href={`mailto:${site.email}`}
          className="text-brand hover:underline rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-brand"
        >
          {site.email}
        </a>
        .
      </p>
      </Reveal>
    </section>
  );
}
