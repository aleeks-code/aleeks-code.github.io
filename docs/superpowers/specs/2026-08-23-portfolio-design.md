# Personal Developer Portfolio — Design Spec

**Date:** 2026-08-23 (v2 — revised after technical review)
**Status:** Approved for planning

## Overview

A single-page personal portfolio website for a software developer, showcasing projects, skills, and contact information. Statically generated and hosted for free on GitHub Pages at the root domain `aleeks-code.github.io`.

## Goals

- Present the owner's dev projects, skills, and background to visitors (recruiters, collaborators, clients).
- Ship as a fully static site (no backend to maintain).
- Be easy to update later: swapping placeholder content for real content should touch only data files, not components.
- Zero ongoing hosting cost.

## Non-Goals

- No CMS or admin UI — content is edited by hand in source files.
- No multi-page routing — everything lives on one scrollable page with anchor navigation.
- No blog (not selected in scoping).
- No server-side rendering or API routes (incompatible with GitHub Pages static hosting).

## Architecture

- **Framework:** Next.js 16 (App Router), TypeScript, React 19.
- **Rendering mode:** Static export (`output: 'export'` in `next.config.mjs`). `next build` produces a fully static `out/` directory — no Node server involved at runtime.
- **Config file is `next.config.mjs`, not `next.config.ts`:** Next 16 supports native TypeScript config files, but only without extra flags on Node ≥22.10; below that it needs an experimental flag. A plain `.mjs` file with a JSDoc type annotation gives the same type-checked editing experience without coupling the build to a specific Node version, which matters here because GitHub Actions' runner Node version is a separate knob from whatever the site owner has locally.
- **Cache Components stay off:** Next 16 ships an opt-in `cacheComponents` flag (new caching/PPR model). It has open bugs specifically interacting with `output: 'export'` (static-export path mismatches, incompatibility with route segment config). This app has no dynamic routes and no data fetching, so there is nothing for it to buy us — leave it at its default (off) and avoid that bug class entirely. Documented here so it reads as a decision, not an oversight.
- **Page shape:** Single page (`app/page.tsx`) that composes section components in order. Navigation uses in-page anchor links (`#projects`, `#skills`, `#contact`, etc.) with smooth scroll, not Next.js routing.
- **Images:** `images.unoptimized: true` in `next.config.mjs` (Next's built-in image optimizer requires a server, unavailable on static export/GitHub Pages) combined with `next/image` for its layout/loading benefits (explicit width/height, native lazy loading) even though optimization itself is disabled.

## Tech Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16 (App Router) + TypeScript + React 19 | Active LTS as of this writing; Next 14 is EOL and Next 15 leaves Maintenance LTS in ~2 months |
| Styling | Tailwind CSS v4 | CSS-first config (no `tailwind.config.ts`), fast to author, no hand-written CSS files per component |
| Fonts | `next/font` (Google Font, self-hosted at build time) | No external font request at runtime, works with static export |
| Linting | ESLint 9 (flat config, `eslint.config.mjs`) via `eslint-config-next` | `next lint` was removed in Next 16; ESLint CLI is now the supported path |
| Contact form backend | Formspree (external service, free tier) | GitHub Pages has no backend; Formspree accepts POST from static forms |
| Hosting | GitHub Pages (user site) | Free, matches repo `aleeks-code.github.io` |
| CI/Deploy | GitHub Actions (`actions/deploy-pages`) | Standard, in-repo, no manual deploy steps; runs on PRs too (build/lint/typecheck/test), deploys only from `main` |

## Project Structure

```
Portfolio/
  app/
    layout.tsx          # root layout, font setup, metadata, OG/Twitter tags
    page.tsx             # composes sections in order
    globals.css          # tailwind v4 import + @theme + base resets
    icon.svg              # favicon (Next App Router icon convention)
  components/
    Nav.tsx               # sticky anchor nav
    Hero.tsx              # name, tagline, CTA, optional CV link
    About.tsx             # short bio
    Projects.tsx           # maps data/projects.ts -> ProjectCard
    ProjectCard.tsx         # single project display (next/image)
    Skills.tsx              # maps data/skills.ts -> skill badges/groups
    Contact.tsx              # Formspree form, submit state handling
    Footer.tsx
  data/
    site.ts                # name, role, bio, email, socials, metadata, CV link
    projects.ts             # typed placeholder project entries (incl. role/impact)
    skills.ts                # typed placeholder skill entries
  public/
    projects/                # placeholder project images
  next.config.mjs             # output: 'export', images.unoptimized: true
  postcss.config.mjs           # @tailwindcss/postcss plugin
  eslint.config.mjs             # flat config, extends next/core-web-vitals + next/typescript
  tsconfig.json
  package.json
  .env.local.example             # documents NEXT_PUBLIC_FORMSPREE_ID
  .github/
    workflows/
      deploy.yml                  # lint+typecheck+test+build on push & PR; deploy only on push to main
```

There is no `tailwind.config.ts` — Tailwind v4 is configured directly in CSS via `@theme` in `app/globals.css`, and content scanning is automatic.

## Content / Data Model

Content lives in typed data files so future edits don't touch component code. This now covers **every** piece of site copy, not just projects/skills — name, role, bio, email, social links, and page metadata all come from `data/site.ts` so there is exactly one file to edit to rebrand the whole site.

`data/site.ts`:
```ts
export interface SiteInfo {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  cvUrl?: string; // optional; omit until a real CV file exists
}

export const site: SiteInfo = {
  // placeholder values, replaced by the site owner later
};
```

`data/projects.ts`:
```ts
export interface Project {
  title: string;
  description: string;
  role?: string;    // the owner's specific contribution, e.g. "Solo project" / "Led backend"
  impact?: string;   // a concrete outcome, e.g. "Cut build time from 4m to 40s"
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

`role` and `impact` are optional specifically so a real entry can be filled in without both being mandatory, but the placeholder projects should demonstrate the intended usage — a portfolio project without a stated outcome or personal contribution reads as generic, which is a real failure mode for this kind of site.

`Nav`, `Hero`, `About`, `Footer`, `Contact`, and `app/layout.tsx`'s metadata all read from `data/site.ts`. `Projects.tsx`/`Skills.tsx` render by mapping over their respective arrays. No hardcoded content in JSX beyond structural labels ("Projects", "Skills", "Contact").

## Styling

- Tailwind CSS v4, minimal/light theme: white or light-gray background, dark text, one accent color for links/CTAs/highlights.
- Mobile-first responsive layout; single-column on small screens, constrained max-width content column on desktop.
- Sans-serif font loaded via `next/font/google`, exposed to Tailwind as `--font-sans` in `@theme`.
- Every focusable interactive element (nav links, mobile menu button, CTA buttons, project links, form fields/submit button) gets a visible `focus-visible` ring — this is a static content site, keyboard navigation is the main accessibility surface that costs nothing to get right.
- Every section anchor target gets `scroll-mt-*` matching the sticky nav's height, so `scroll-behavior: smooth` navigation doesn't land with the heading hidden under the nav bar.

## Sections (in page order)

1. **Nav** — sticky top bar, links to each section anchor, mobile hamburger collapse.
2. **Hero** — name, role/tagline, primary CTA (scroll to Projects), optional "Download CV" link if `site.cvUrl` is set.
3. **About** — short bio paragraph, placeholder text.
4. **Projects** — grid/list of `ProjectCard`s from `data/projects.ts`, each showing role/impact when present.
5. **Skills** — grouped skill badges from `data/skills.ts`.
6. **Contact** — Formspree form plus a direct `mailto:` fallback link.
7. **Footer** — copyright, social links from `data/site.ts`.

## Contact Form

- Fields: name, email, message, plus a hidden honeypot field (`_gotcha`) for spam filtering — Formspree recognizes this field name natively and silently drops submissions that fill it.
- On submit: read field values, build a plain object, `fetch(POST)` to `https://formspree.io/f/${process.env.NEXT_PUBLIC_FORMSPREE_ID}` with a **JSON** body (`Content-Type: application/json`, `Accept: application/json`) — matches how Formspree's JSON API is documented and keeps the payload construction explicit instead of round-tripping through `FormData`.
- Before sending, guard on `NEXT_PUBLIC_FORMSPREE_ID` being unset: if missing, skip the network call and show a distinct configuration-error message. Without this guard a missing env var silently POSTs to `.../f/undefined` and surfaces as a generic failure, which is much harder to diagnose.
- Local component state (`useState`) tracks `idle | loading | success | error`. UI reflects each state: submit button disabled with "Sending…" text while loading (no spinner graphic — one extra state text is enough for this scope, not worth an animated element), a success message, or an error message. The status message region uses `aria-live="polite"` so screen reader users get the outcome without needing to refocus.
- A `mailto:` link (address from `data/site.ts`) sits below the form as an always-available fallback that doesn't depend on Formspree being configured or reachable.
- `NEXT_PUBLIC_FORMSPREE_ID` is a placeholder env var (documented in `.env.local.example`). The real Formspree form ID is created and filled in by the site owner after signing up at formspree.io — this is an explicit open item, not solved by this plan. Because it's a `NEXT_PUBLIC_*` variable it is inlined into the published JavaScript bundle at build time and is **not** a secret in any meaningful sense — see Deployment below for how it's configured in CI accordingly.

## Deployment

- GitHub repository: `aleeks-code.github.io` (GitHub *user site* — must be this exact name; publishes to the account's root domain, no `basePath` needed).
- `.github/workflows/deploy.yml` runs on push to `main` **and** on pull requests: `npm ci`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`. The deploy step (`actions/upload-pages-artifact` + `actions/deploy-pages`) is gated to only run on a push to `main`, so PRs get full validation without publishing anything.
- `NEXT_PUBLIC_FORMSPREE_ID` is passed into the build as a **repository variable** (`vars.NEXT_PUBLIC_FORMSPREE_ID`), not a secret — GitHub Actions distinguishes non-sensitive configuration (`vars` context) from secrets (`secrets` context), and since this value ends up in public client-side JS anyway, treating it as a secret would be misleading about what protection it actually gets.
- Repository's GitHub Pages source is set to "GitHub Actions" (done once, manually, in repo settings after first push — an open item since it requires an existing GitHub repo).

## Verification / Testing

The site is presentational with minimal branching logic, so a full test framework across every component is unnecessary (YAGNI) — this stays deliberately narrow rather than growing into a full suite. Verification consists of:

- `npm run lint` (ESLint 9 flat config) — no lint errors.
- `npm run typecheck` (`tsc --noEmit`) — type check passes.
- `npm run build` — static export completes without errors (this alone catches most real issues: broken imports, invalid static-export config, type errors in JSX).
- The Contact form's submit state machine (`idle/loading/success/error`) is the one piece of non-trivial logic in the app. It gets a focused test suite using React Testing Library covering: successful submission (success message shown), non-OK response (error message shown), a thrown/rejected `fetch` — a distinct code path from a non-OK response — (error message shown), the loading state being visible while the request is pending, and the missing-`NEXT_PUBLIC_FORMSPREE_ID` guard (distinct configuration-error message, no network call attempted).
- No E2E framework, no per-component test suite for the purely presentational sections (Nav, Hero, About, Projects, Skills, Footer) — not warranted for a static content site.

## Open Items (outside this plan's scope)

- Creating the actual GitHub repository `aleeks-code.github.io` and pushing the initial commit.
- Setting the repo's Pages source to "GitHub Actions" in repo settings.
- Signing up for Formspree, obtaining the real form ID, and adding it as the `NEXT_PUBLIC_FORMSPREE_ID` repository variable.
- Replacing placeholder content in `data/site.ts`, `data/projects.ts` (including real screenshots replacing the placeholder SVGs), `data/skills.ts` with real content.
- A real Open Graph preview image (`public/og-image.png` or similar) and wiring it into `app/layout.tsx`'s metadata — a design asset, not something this plan can generate.
- A real CV file and setting `site.cvUrl` to it, if desired.
- Custom domain (not requested — using default `aleeks-code.github.io`).
