'use client';

import { useState, type ChangeEvent, type FormEvent } from 'react';
import { site } from '@/data/site';

type Status = 'idle' | 'sending' | 'success' | 'error' | 'config-error';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialFields = { nome: '', email: '', tipo: 'vetrina', messaggio: '' };

export default function Contact() {
  const [fields, setFields] = useState(initialFields);
  const [status, setStatus] = useState<Status>('idle');
  const [emailInvalid, setEmailInvalid] = useState(false);

  function updateField(key: keyof typeof initialFields) {
    return (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      setFields((prev) => ({ ...prev, [key]: event.target.value }));
      if (key === 'email') setEmailInvalid(false);
    };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!EMAIL_RE.test(fields.email)) {
      setEmailInvalid(true);
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    if (formData.get('_gotcha')) {
      // Honeypot filled in by a bot — pretend success, send nothing.
      setStatus('success');
      setFields(initialFields);
      return;
    }

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    if (!formId) {
      setStatus('config-error');
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(fields),
      });

      if (response.ok) {
        setStatus('success');
        setFields(initialFields);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const isSending = status === 'sending';
  const emailFieldClass = `w-full box-border bg-transparent border-0 border-b text-white font-[inherit] text-[17px] px-0.5 py-3 outline-none transition-colors duration-200 focus:border-accent ${
    emailInvalid ? 'border-coral border-b-2' : 'border-white/32'
  }`;

  return (
    <section id="contatti" className="scroll-mt-20 bg-navy">
      <div className="mx-auto max-w-[1240px] px-6 py-16 sm:px-8 sm:py-24 lg:px-14 lg:py-28">
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,1fr)] md:gap-16 lg:gap-22">
          <div>
            <h2 className="m-0 max-w-[16ch] text-[clamp(38px,4.6vw,68px)] leading-[0.98] font-medium tracking-[-0.035em] text-white">
              {site.contactHeading}
              <span className="font-serif font-normal italic">{site.contactHeadingAccent}</span>
            </h2>
            <p className="mt-6 max-w-[46ch] text-[17.5px] leading-relaxed text-white/72">
              {site.contactIntro}
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-8 inline-block text-[clamp(24px,2.9vw,40px)] leading-[1.1] font-medium tracking-[-0.03em] text-white border-b-2 border-white/35 pb-1.5 transition-colors duration-200 hover:text-accent hover:border-accent"
            >
              {site.email}
            </a>
            <div className="mt-7 flex gap-6.5">
              {site.githubUrl && (
                <a
                  href={site.githubUrl}
                  className="text-[15.5px] text-white/72 border-b border-white/28 pb-0.5 transition-colors duration-200 hover:text-white hover:border-white"
                >
                  GitHub ↗
                </a>
              )}
              {site.instagramUrl && (
                <a
                  href={site.instagramUrl}
                  className="text-[15.5px] text-white/72 border-b border-white/28 pb-0.5 transition-colors duration-200 hover:text-white hover:border-white"
                >
                  Instagram ↗
                </a>
              )}
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            noValidate
            className="flex flex-col gap-6 border-t-2 border-white/50 pt-7"
          >
            <div className="hidden" aria-hidden="true">
              <label htmlFor="c-gotcha">Lascia questo campo vuoto</label>
              <input id="c-gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <div>
              <label
                htmlFor="c-nome"
                className="mb-2.5 block text-sm font-semibold tracking-[0.1em] text-white/60 uppercase"
              >
                Nome
              </label>
              <input
                id="c-nome"
                name="nome"
                type="text"
                value={fields.nome}
                onChange={updateField('nome')}
                className="w-full box-border bg-transparent border-0 border-b border-white/32 text-white font-[inherit] text-[17px] px-0.5 py-3 outline-none transition-colors duration-200 focus:border-accent"
              />
            </div>

            <div>
              <label
                htmlFor="c-email"
                className="mb-2.5 block text-sm font-semibold tracking-[0.1em] text-white/60 uppercase"
              >
                Email
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                value={fields.email}
                onChange={updateField('email')}
                aria-invalid={emailInvalid}
                aria-describedby={emailInvalid ? 'c-email-err' : undefined}
                className={emailFieldClass}
              />
              {emailInvalid && (
                <p
                  id="c-email-err"
                  className="mt-2.5 flex items-center gap-2 text-[15px] text-[#FFB4A2]"
                >
                  <span aria-hidden="true" className="block h-0.5 w-4 bg-coral" />
                  Serve un indirizzo email valido per poterti rispondere.
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="c-tipo"
                className="mb-2.5 block text-sm font-semibold tracking-[0.1em] text-white/60 uppercase"
              >
                Tipo di progetto
              </label>
              <select
                id="c-tipo"
                name="tipo"
                value={fields.tipo}
                onChange={updateField('tipo')}
                className="w-full box-border bg-transparent border-0 border-b border-white/32 text-white font-[inherit] text-[17px] px-0.5 py-3 outline-none transition-colors duration-200 focus:border-accent"
              >
                <option value="vetrina" className="text-navy">
                  Sito vetrina
                </option>
                <option value="landing" className="text-navy">
                  Landing page
                </option>
                <option value="manutenzione" className="text-navy">
                  Manutenzione e assistenza
                </option>
                <option value="altro" className="text-navy">
                  Altro, ne parliamo
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="c-msg"
                className="mb-2.5 block text-sm font-semibold tracking-[0.1em] text-white/60 uppercase"
              >
                Messaggio
              </label>
              <textarea
                id="c-msg"
                name="messaggio"
                rows={4}
                value={fields.messaggio}
                onChange={updateField('messaggio')}
                className="w-full box-border resize-y bg-transparent border-0 border-b border-white/32 text-white font-[inherit] text-[17px] leading-relaxed px-0.5 py-3 outline-none transition-colors duration-200 focus:border-accent"
              />
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <button
                type="submit"
                disabled={isSending}
                className="min-h-13 border-0 px-6.5 py-4.5 font-[inherit] text-[17px] font-semibold text-white transition-colors duration-200 disabled:opacity-80"
                style={{
                  background: isSending ? '#1B39D6' : '#2B4BF2',
                  cursor: isSending ? 'progress' : 'pointer',
                }}
              >
                {isSending ? 'Invio in corso…' : 'Invia richiesta'}
              </button>
              <span className="text-sm text-white/50">Ti rispondo per email.</span>
            </div>

            <div aria-live="polite">
              {status === 'success' && (
                <p
                  role="status"
                  className="m-0 flex gap-3 border border-accent px-4.5 py-4 text-base leading-snug text-white"
                >
                  <span aria-hidden="true" className="text-accent">
                    ✓
                  </span>
                  Richiesta inviata. Ti rispondo all’indirizzo che hai indicato.
                </p>
              )}
              {status === 'error' && (
                <p className="m-0 text-[15px] text-[#FFB4A2]">
                  Qualcosa è andato storto. Riprova oppure scrivimi direttamente a{' '}
                  {site.email}.
                </p>
              )}
              {status === 'config-error' && (
                <p className="m-0 text-[15px] text-[#FFB4A2]">
                  Il modulo di contatto non è ancora configurato. Scrivimi direttamente a{' '}
                  {site.email}.
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
