# Personal Developer Portfolio — Design Spec

**Date:** 2026-08-23
**Status:** Approved for planning

## Overview

A single-page personal portfolio website for a software developer, showcasing projects, skills, and contact information. Statically generated and hosted for free on GitHub Pages at the root domain `aleeks-code.github.io`.

## Goals

- Present the owner's dev projects, skills, and background to visitors (recruiters, collaborators, clients).
- Ship as a fully static site (no backend to maintain).
- Be easy to update later: swapping placeholder content for real projects/bio should touch only data files, not components.
- Zero ongoing hosting cost.

## Non-Goals

- No CMS or admin UI — content is edited by hand in source files.
- No multi-page routing — everything lives on one scrollable page with anchor navigation.
- No blog (not selected in scoping).
- No server-side rendering or API routes (incompatible with GitHub Pages static hosting).

## Architecture

- **Framework:** Next.js 14 (App Router), TypeScript.
- **Rendering mode:** Static export (`output: 'export'` in `next.config.ts`). `next build` produces a fully static `out/` directory — no Node server involved at runtime.
- **Page shape:** Single page (`app/page.tsx`) that composes section components in order. Navigation uses in-page anchor links (`#projects`, `#skills`, `#contact`, etc.) with smooth scroll, not Next.js routing.
- **Images:** `images.unoptimized: true` in `next.config.ts` (Next's built-in image optimizer requires a server, unavailable on static export/GitHub Pages).

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 14 (App Router) + TypeScript | User choice; static export supported |
| Styling | Tailwind CSS | Fast to author, no hand-written CSS files to maintain per component |
| Fonts | `next/font` (Google Font, self-hosted at build time) | No external font request at runtime, works with static export |
| Contact form backend | Formspree (external service, free tier) | GitHub Pages has no backend; Formspree accepts POST from static forms |
| Hosting | GitHub Pages (user site) | Free, matches repo `aleeks-code.github.io` |
| CI/Deploy | GitHub Actions (`actions/deploy-pages`) | Standard, in-repo, no manual deploy steps |

## Project Structure

```
Portfolio/
  app/
    layout.tsx          # root layout, font setup, metadata
    page.tsx             # composes sections in order
    globals.css          # tailwind directives + base resets
  components/
    Nav.tsx               # sticky anchor nav
    Hero.tsx              # name, tagline, CTA
    About.tsx             # short bio
    Projects.tsx           # maps data/projects.ts -> ProjectCard
    ProjectCard.tsx         # single project display
    Skills.tsx              # maps data/skills.ts -> skill badges/groups
    Contact.tsx              # Formspree form, submit state handling
    Footer.tsx
  data/
    projects.ts            # typed placeholder project entries
    skills.ts               # typed placeholder skill entries
  public/
    favicon.ico
    (placeholder images referenced by data/projects.ts)
  next.config.ts            # output: 'export', images.unoptimized: true
  tailwind.config.ts
  tsconfig.json
  package.json
  .env.local.example         # documents NEXT_PUBLIC_FORMSPREE_ID
  .github/
    workflows/
      deploy.yml              # build + deploy to GitHub Pages on push to main
```

## Content / Data Model

Content lives in typed data files so future edits don't touch component code.

`data/projects.ts`:
```ts
export interface Project {
  title: string;
  description: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageSrc: string; // path under /public
}

export const projects: Project[] = [
  // placeholder entries, replaced with real projects later
];
```

`data/skills.ts`:
```ts
export interface Skill {
  name: string;
  category: 'language' | 'framework' | 'tool' | 'other';
}

export const skills: Skill[] = [
  // placeholder entries
];
```

`Projects.tsx` and `Skills.tsx` render by mapping over these arrays — no hardcoded content in JSX.

## Styling

- Tailwind CSS, minimal/light theme: white or light-gray background, dark text, one accent color for links/CTAs/highlights.
- Mobile-first responsive layout; single-column on small screens, constrained max-width content column on desktop.
- Sans-serif font loaded via `next/font/google`.

## Sections (in page order)

1. **Nav** — sticky top bar, links to each section anchor, mobile hamburger collapse.
2. **Hero** — name, short tagline/role, primary CTA (e.g., scroll to Projects or Contact).
3. **About** — short bio paragraph, placeholder text.
4. **Projects** — grid/list of `ProjectCard`s from `data/projects.ts`.
5. **Skills** — grouped skill badges from `data/skills.ts`.
6. **Contact** — Formspree form.
7. **Footer** — copyright, social links (placeholder URLs).

## Contact Form

- Fields: name, email, message.
- On submit: `fetch(POST)` to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` with JSON body.
- Local component state (`useState`) tracks `idle | loading | success | error`; UI reflects each state (disabled button + spinner while loading, success message, error message with retry).
- `NEXT_PUBLIC_FORMSPREE_ID` is a placeholder env var (documented in `.env.local.example`). The real Formspree form ID is created and filled in by the site owner after signing up at formspree.io — this is an explicit open item, not solved by this plan.

## Deployment

- GitHub repository: `aleeks-code.github.io` (GitHub *user site* — must be this exact name; publishes to the account's root domain, no `basePath` needed).
- `.github/workflows/deploy.yml`: on push to `main`, run `npm ci`, `npm run build` (static export writes to `out/`), then deploy `out/` via `actions/upload-pages-artifact` + `actions/deploy-pages`.
- Repository's GitHub Pages source is set to "GitHub Actions" (done once, manually, in repo settings after first push — an open item since it requires an existing GitHub repo).

## Verification / Testing

The site is presentational with minimal branching logic, so a full test framework is unnecessary (YAGNI). Verification consists of:

- `tsc --noEmit` — type check passes.
- `next build` — static export completes without errors (this alone catches most real issues: broken imports, invalid static-export config, type errors in JSX).
- The Contact form's submit state machine (`idle/loading/success/error`) is the one piece of non-trivial logic in the app. It gets a focused test using React Testing Library: render the form, mock `fetch`, submit, assert the success state renders on a 200 response and the error state renders on a non-200/rejected response.
- No E2E framework, no per-component test suite — not warranted for a static content site.

## Open Items (outside this plan's scope)

- Creating the actual GitHub repository `aleeks-code.github.io` and pushing the initial commit.
- Setting the repo's Pages source to "GitHub Actions" in repo settings.
- Signing up for Formspree and obtaining the real form ID.
- Replacing placeholder content in `data/projects.ts`, `data/skills.ts`, About bio text, and social links with real content.
- Custom domain (not requested — using default `aleeks-code.github.io`).
