'use client';

import { useState, type FormEvent } from 'react';
import { site } from '@/data/site';

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
      <h2 className="font-mono text-2xl font-semibold text-slate-900">
        <span className="text-blue-600">{'// '}</span>Contact
      </h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        <div className="hidden" aria-hidden="true">
          <label htmlFor="_gotcha">Leave this field empty</label>
          <input id="_gotcha" name="_gotcha" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
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
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-slate-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-blue-600 px-6 py-3 text-white transition-colors duration-200 hover:bg-blue-700 disabled:opacity-50 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
        <div aria-live="polite">
          {status === 'success' && (
            <p className="text-green-600">
              Thanks for your message! I will get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-600">
              Something went wrong. Please try again or email me directly below.
            </p>
          )}
          {status === 'config-error' && (
            <p className="text-red-600">
              The contact form isn&apos;t configured yet. Please email me directly below.
            </p>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-slate-600">
        You can also reach me directly at{' '}
        <a
          href={`mailto:${site.email}`}
          className="text-blue-600 hover:underline rounded focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          {site.email}
        </a>
        .
      </p>
    </section>
  );
}
