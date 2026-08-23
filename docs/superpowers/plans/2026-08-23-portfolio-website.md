# Personal Developer Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static, single-page Next.js developer portfolio with placeholder content, a working Formspree contact form, and a GitHub Actions workflow that deploys it to GitHub Pages.

**Architecture:** Next.js 14 (App Router) + TypeScript, statically exported (`output: 'export'`) to plain HTML/CSS/JS. One page composed of section components (Nav, Hero, About, Projects, Skills, Contact, Footer) reading placeholder content from typed data files. Tailwind CSS for styling. GitHub Actions builds and publishes `out/` to GitHub Pages on every push to `main`.

**Tech Stack:** Next.js 14, React 18, TypeScript 5, Tailwind CSS 3, Jest + React Testing Library (Contact form only), GitHub Actions (`actions/deploy-pages`), Formspree (external form backend).

**Spec:** `docs/superpowers/specs/2026-08-23-portfolio-design.md`

## Global Constraints

- Static export only: `output: 'export'` in `next.config.mjs`, `images.unoptimized: true` — no API routes, no SSR, no server-side image optimization.
- Single page, anchor-based navigation — no multi-route pages, no blog, no CMS.
- Content lives in `data/projects.ts` and `data/skills.ts` (typed arrays) — components must not hardcode project/skill content.
- Styling via Tailwind CSS only — no separate hand-written CSS files per component.
- Contact form posts to Formspree at `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}`; the real form ID is a placeholder filled in later by the site owner (open item, not part of this plan).
- GitHub repo must be named exactly `aleeks-code.github.io` (user site, root domain, no `basePath`). Deploy workflow triggers on push to `main`.
- Testing scope is intentionally narrow: only the Contact form's submit state machine gets automated tests (React Testing Library). No test framework/suite for presentational components — matches the spec's YAGNI stance.
- Import alias `@/*` resolves to the project root (e.g. `@/data/projects`, `@/components/Nav`).

---

### Task 1: Project Scaffold — Next.js + TypeScript + Tailwind, static export

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.mjs`
- Create: `tailwind.config.ts`
- Create: `postcss.config.mjs`
- Create: `.eslintrc.json`
- Create: `.gitignore`
- Create: `next-env.d.ts`
- Create: `app/layout.tsx`
- Create: `app/globals.css`
- Create: `app/page.tsx`

**Interfaces:**
- Consumes: nothing (first task)
- Produces: a buildable Next.js App Router skeleton — `app/layout.tsx` (minimal root layout, replaced fully in Task 2), `app/page.tsx` (placeholder, replaced fully in Task 9), `next.config.mjs` with static export configured, Tailwind wired into `app/globals.css`, `@/*` import alias in `tsconfig.json`, `npm run build` / `npm run typecheck` scripts.

- [ ] **Step 1: Create `package.json`**

```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0"
  },
  "devDependencies": {
    "@types/node": "^20.14.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^8.57.0",
    "eslint-config-next": "^14.2.0",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.0"
  }
}
```

- [ ] **Step 2: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: Create `next.config.mjs`**

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

- [ ] **Step 4: Create `tailwind.config.ts`**

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 5: Create `postcss.config.mjs`**

```js
/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
```

- [ ] **Step 6: Create `.eslintrc.json`**

```json
{
  "extends": "next/core-web-vitals"
}
```

- [ ] **Step 7: Create `.gitignore`**

```
node_modules
.next
out
.env*.local
*.log
.DS_Store
```

- [ ] **Step 8: Create `next-env.d.ts`**

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
```

- [ ] **Step 9: Create `app/layout.tsx` (minimal — replaced in Task 2)**

```tsx
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 10: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- [ ] **Step 11: Create `app/page.tsx` (placeholder — replaced in Task 9)**

```tsx
export default function Home() {
  return <main>Portfolio scaffold OK</main>;
}
```

- [ ] **Step 12: Install dependencies**

Run: `npm install`
Expected: installs without errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 13: Verify the static build works**

Run: `npm run build`
Expected: `Compiled successfully`, and `out/index.html` exists after the build.

- [ ] **Step 14: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.mjs tailwind.config.ts postcss.config.mjs .eslintrc.json .gitignore next-env.d.ts app/
git commit -m "chore: scaffold Next.js portfolio with static export"
```

---

### Task 2: Root Layout, Global Styles, Font

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Consumes: `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts` from Task 1
- Produces: final root layout with metadata, self-hosted `Inter` font wired through Tailwind's `font-sans`, light-theme base body styles. All later section components render inside this layout via `app/page.tsx`.

- [ ] **Step 1: Extend `tailwind.config.ts` with the font family**

Add `fontFamily` under `theme.extend`:

```ts
import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 2: Update `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}
```

- [ ] **Step 3: Update `app/layout.tsx`**

```tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Your Name — Developer Portfolio',
  description:
    'Portfolio of Your Name, software developer. Projects, skills, and contact.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-white text-gray-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/globals.css tailwind.config.ts
git commit -m "feat: add root layout, font, and base styles"
```

---

### Task 3: Content Data Model

**Files:**
- Create: `data/projects.ts`
- Create: `data/skills.ts`
- Create: `public/projects/placeholder-1.svg`
- Create: `public/projects/placeholder-2.svg`
- Create: `public/projects/placeholder-3.svg`

**Interfaces:**
- Consumes: nothing
- Produces: `Project` interface + `projects: Project[]` from `@/data/projects`; `Skill` interface + `skills: Skill[]` from `@/data/skills`. Used by Task 6 (`Projects`/`ProjectCard`) and Task 7 (`Skills`).

- [ ] **Step 1: Create `data/projects.ts`**

```ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageSrc: string;
}

export const projects: Project[] = [
  {
    title: 'Project One',
    description:
      'Placeholder description of project one. Replace with a real project summary.',
    tags: ['TypeScript', 'React'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-1.svg',
  },
  {
    title: 'Project Two',
    description:
      'Placeholder description of project two. Replace with a real project summary.',
    tags: ['Next.js', 'Tailwind CSS'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-2.svg',
  },
  {
    title: 'Project Three',
    description:
      'Placeholder description of project three. Replace with a real project summary.',
    tags: ['Node.js', 'PostgreSQL'],
    repoUrl: 'https://github.com/aleeks-code',
    imageSrc: '/projects/placeholder-3.svg',
  },
];
```

- [ ] **Step 2: Create placeholder project images**

Create `public/projects/placeholder-1.svg`, `public/projects/placeholder-2.svg`, `public/projects/placeholder-3.svg` — same content in all three:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
  <rect width="600" height="400" fill="#e5e7eb"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="#6b7280">Project Image Placeholder</text>
</svg>
```

- [ ] **Step 3: Create `data/skills.ts`**

```ts
export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
}

export const skills: Skill[] = [
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'Python', category: 'language' },
  { name: 'React', category: 'framework' },
  { name: 'Next.js', category: 'framework' },
  { name: 'Node.js', category: 'framework' },
  { name: 'Tailwind CSS', category: 'framework' },
  { name: 'Git', category: 'tool' },
  { name: 'Docker', category: 'tool' },
];
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck`
Expected: no type errors.

- [ ] **Step 5: Commit**

```bash
git add data/ public/projects/
git commit -m "feat: add placeholder content data for projects and skills"
```

---

### Task 4: Nav Component

**Files:**
- Create: `components/Nav.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `Nav` (default export, no props) — sticky header with anchor links to `#about`, `#projects`, `#skills`, `#contact`, and a mobile menu toggle. Used by Task 9's `app/page.tsx`.

- [ ] **Step 1: Create `components/Nav.tsx`**

```tsx
'use client';

import { useState } from 'react';

const links = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-200">
      <nav className="mx-auto max-w-4xl flex items-center justify-between px-4 py-4">
        <a href="#top" className="font-semibold text-gray-900">
          Your Name
        </a>
        <button
          type="button"
          className="sm:hidden text-gray-700"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
        <ul className="hidden sm:flex gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-gray-600 hover:text-blue-600">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      {open && (
        <ul className="sm:hidden flex flex-col gap-2 px-4 pb-4">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="block text-gray-600 hover:text-blue-600"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Nav.tsx
git commit -m "feat: add Nav component with mobile menu"
```

---

### Task 5: Hero and About Components

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/About.tsx`

**Interfaces:**
- Consumes: nothing
- Produces: `Hero` (default export, no props, contains `id="top"`), `About` (default export, no props, contains `id="about"`). Used by Task 9's `app/page.tsx`.

- [ ] **Step 1: Create `components/Hero.tsx`**

```tsx
export default function Hero() {
  return (
    <section id="top" className="mx-auto max-w-4xl px-4 py-24 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Your Name</h1>
      <p className="mt-4 text-lg text-gray-600">
        Software developer building things for the web.
      </p>
      <a
        href="#projects"
        className="mt-8 inline-block rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
      >
        View my projects
      </a>
    </section>
  );
}
```

- [ ] **Step 2: Create `components/About.tsx`**

```tsx
export default function About() {
  return (
    <section id="about" className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">About</h2>
      <p className="mt-4 text-gray-600 leading-relaxed">
        Placeholder bio. Replace this paragraph with a short description of your
        background, what you work on, and what you are looking for.
      </p>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/Hero.tsx components/About.tsx
git commit -m "feat: add Hero and About components"
```

---

### Task 6: ProjectCard and Projects Section

**Files:**
- Create: `components/ProjectCard.tsx`
- Create: `components/Projects.tsx`

**Interfaces:**
- Consumes: `Project` type and `projects` array from `@/data/projects` (Task 3)
- Produces: `ProjectCard` (default export, props `{ project: Project }`), `Projects` (default export, no props, contains `id="projects"`, renders one `ProjectCard` per entry in `projects`). Used by Task 9's `app/page.tsx`.

- [ ] **Step 1: Create `components/ProjectCard.tsx`**

```tsx
import type { Project } from '@/data/projects';

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="rounded-lg border border-gray-200 overflow-hidden">
      <img
        src={project.imageSrc}
        alt={`${project.title} preview`}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-gray-900">{project.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{project.description}</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="text-xs bg-gray-100 text-gray-700 rounded px-2 py-1"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex gap-4 text-sm">
          {project.repoUrl && (
            <a href={project.repoUrl} className="text-blue-600 hover:underline">
              Code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} className="text-blue-600 hover:underline">
              Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
```

- [ ] **Step 2: Create `components/Projects.tsx`**

```tsx
import { projects } from '@/data/projects';
import ProjectCard from '@/components/ProjectCard';

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">Projects</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 4: Commit**

```bash
git add components/ProjectCard.tsx components/Projects.tsx
git commit -m "feat: add Projects section rendering project data"
```

---

### Task 7: Skills Section

**Files:**
- Create: `components/Skills.tsx`

**Interfaces:**
- Consumes: `Skill` type and `skills` array from `@/data/skills` (Task 3)
- Produces: `Skills` (default export, no props, contains `id="skills"`). Used by Task 9's `app/page.tsx`.

- [ ] **Step 1: Create `components/Skills.tsx`**

```tsx
import { skills } from '@/data/skills';

const categoryLabels: Record<string, string> = {
  language: 'Languages',
  framework: 'Frameworks & Libraries',
  tool: 'Tools',
  other: 'Other',
};

export default function Skills() {
  const categories = Array.from(new Set(skills.map((skill) => skill.category)));

  return (
    <section id="skills" className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">Skills</h2>
      <div className="mt-6 space-y-6">
        {categories.map((category) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              {categoryLabels[category] ?? category}
            </h3>
            <ul className="mt-2 flex flex-wrap gap-2">
              {skills
                .filter((skill) => skill.category === category)
                .map((skill) => (
                  <li
                    key={skill.name}
                    className="text-sm bg-gray-100 text-gray-800 rounded-full px-3 py-1"
                  >
                    {skill.name}
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both succeed with no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Skills.tsx
git commit -m "feat: add Skills section rendering skill data"
```

---

### Task 8: Contact Form (TDD)

**Files:**
- Create: `jest.config.js`
- Create: `jest.setup.ts`
- Modify: `package.json`
- Create: `components/Contact.tsx`
- Test: `components/Contact.test.tsx`

**Interfaces:**
- Consumes: `process.env.NEXT_PUBLIC_FORMSPREE_ID` (placeholder env var, real value supplied later — see spec Open Items)
- Produces: `Contact` (default export, no props, contains `id="contact"`, submit state machine `idle | loading | success | error`). Used by Task 9's `app/page.tsx`.

- [ ] **Step 1: Add test tooling to `package.json`**

Add to `scripts`:

```json
"test": "jest"
```

Add to `devDependencies`:

```json
"@testing-library/jest-dom": "^6.4.6",
"@testing-library/react": "^16.0.0",
"@types/jest": "^29.5.12",
"jest": "^29.7.0",
"jest-environment-jsdom": "^29.7.0"
```

- [ ] **Step 2: Create `jest.config.js`**

```js
const nextJest = require('next/jest');

const createJestConfig = nextJest({ dir: './' });

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
};

module.exports = createJestConfig(customJestConfig);
```

- [ ] **Step 3: Create `jest.setup.ts`**

```ts
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Install new dependencies**

Run: `npm install`
Expected: installs without errors.

- [ ] **Step 5: Write the failing test — `components/Contact.test.tsx`**

```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Contact from './Contact';

describe('Contact', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function fillAndSubmit() {
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Jane Doe' },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'jane@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Hello there' },
    });
    fireEvent.click(screen.getByRole('button', { name: /send/i }));
  }

  it('shows a success message after a successful submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/thanks.*message/i)).toBeInTheDocument()
    );
  });

  it('shows an error message when the submission fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: false });
    render(<Contact />);

    fillAndSubmit();

    await waitFor(() =>
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument()
    );
  });
});
```

- [ ] **Step 6: Run test, verify it fails**

Run: `npm test -- Contact.test.tsx`
Expected: FAIL — `Cannot find module './Contact'` (component does not exist yet).

- [ ] **Step 7: Write minimal implementation — `components/Contact.tsx`**

```tsx
'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'loading' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID;
    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
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
    <section id="contact" className="mx-auto max-w-4xl px-4 py-16">
      <h2 className="text-2xl font-semibold text-gray-900">Contact</h2>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={4}
            className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="rounded-md bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {status === 'loading' ? 'Sending...' : 'Send'}
        </button>
        {status === 'success' && (
          <p className="text-green-600">
            Thanks for your message! I will get back to you soon.
          </p>
        )}
        {status === 'error' && (
          <p className="text-red-600">
            Something went wrong. Please try again or email me directly.
          </p>
        )}
      </form>
    </section>
  );
}
```

- [ ] **Step 8: Run test, verify it passes**

Run: `npm test -- Contact.test.tsx`
Expected: PASS — both tests green.

- [ ] **Step 9: Verify the rest of the project still builds**

Run: `npm run typecheck && npm run build`
Expected: both succeed with no errors.

- [ ] **Step 10: Commit**

```bash
git add jest.config.js jest.setup.ts package.json package-lock.json components/Contact.tsx components/Contact.test.tsx
git commit -m "feat: add Contact form with tested submit state machine"
```

---

### Task 9: Footer and Page Assembly

**Files:**
- Create: `components/Footer.tsx`
- Modify: `app/page.tsx`

**Interfaces:**
- Consumes: `Nav` (Task 4), `Hero`/`About` (Task 5), `Projects` (Task 6), `Skills` (Task 7), `Contact` (Task 8)
- Produces: final `app/page.tsx` composing every section in order; `Footer` (default export, no props).

- [ ] **Step 1: Create `components/Footer.tsx`**

```tsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 py-8">
      <div className="mx-auto max-w-4xl px-4 flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
        <p>&copy; {year} Your Name. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="https://github.com/aleeks-code" className="hover:text-gray-700">
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/your-profile"
            className="hover:text-gray-700"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Replace `app/page.tsx` with the full composition**

```tsx
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm test && npm run build`
Expected: all three succeed — type check clean, Contact tests pass, static export builds.

- [ ] **Step 4: Manual check**

Run: `npm run dev`, open `http://localhost:3000`.
Expected: page shows Nav, Hero, About, Projects (3 placeholder cards), Skills (grouped badges), Contact form, Footer, in that order; anchor links scroll to the right section; mobile width (<640px) collapses Nav into the Menu toggle.

- [ ] **Step 5: Commit**

```bash
git add components/Footer.tsx app/page.tsx
git commit -m "feat: assemble full portfolio page with all sections"
```

---

### Task 10: GitHub Actions Deployment

**Files:**
- Create: `.github/workflows/deploy.yml`
- Create: `.env.local.example`
- Create: `README.md`

**Interfaces:**
- Consumes: `npm run build` (Task 1), `NEXT_PUBLIC_FORMSPREE_ID` env var (Task 8)
- Produces: CI workflow that builds and publishes `out/` to GitHub Pages on push to `main`.

- [ ] **Step 1: Rename the local branch to `main`**

Run: `git branch -M main`
Expected: `git branch` shows `* main`.

- [ ] **Step 2: Create `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_FORMSPREE_ID: ${{ secrets.NEXT_PUBLIC_FORMSPREE_ID }}

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Create `.env.local.example`**

```
NEXT_PUBLIC_FORMSPREE_ID=your-formspree-form-id
```

- [ ] **Step 4: Create `README.md`**

```markdown
# Portfolio

Personal developer portfolio. Static Next.js site deployed to GitHub Pages.

## Development

\`\`\`bash
npm install
npm run dev
\`\`\`

Open http://localhost:3000.

## Testing

\`\`\`bash
npm test
\`\`\`

## Build

\`\`\`bash
npm run build
\`\`\`

Static output is written to `out/`.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and
publishes to GitHub Pages automatically.

One-time setup required before the first deploy works:

1. Create the GitHub repository named exactly `aleeks-code.github.io` and push
   this project to it (`git remote add origin <url>`, `git push -u origin main`).
2. In the repository's Settings → Pages, set **Source** to **GitHub Actions**.
3. Sign up at https://formspree.io, create a form, and copy its form ID.
4. Add that ID as a repository secret named `NEXT_PUBLIC_FORMSPREE_ID`
   (Settings → Secrets and variables → Actions → New repository secret), and
   also create a local `.env.local` (copy `.env.local.example`) for local dev.
5. Push to `main` — the site publishes to `https://aleeks-code.github.io`.

## Content

Update placeholder content in:
- `data/projects.ts`
- `data/skills.ts`
- `components/About.tsx` (bio)
- `components/Footer.tsx` (social links)
- `components/Hero.tsx` / `app/layout.tsx` (display name)
```

- [ ] **Step 5: Verify**

Run: `npm run typecheck && npm test && npm run build`
Expected: all three succeed.

- [ ] **Step 6: Commit**

```bash
git add .github/workflows/deploy.yml .env.local.example README.md
git commit -m "chore: add GitHub Pages deploy workflow and setup docs"
```
