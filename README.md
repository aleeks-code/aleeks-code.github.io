# Portfolio

Personal developer portfolio. Static Next.js site deployed to GitHub Pages.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Checks

```bash
npm run lint
npm run typecheck
npm test
```

## Build

```bash
npm run build
```

Static output is written to `out/`. To preview the static build locally:

```bash
npm run serve
```

(`next start` does not work here — the site is a static export, not a running Next.js server.)

## Deployment

Pushes to `main` and pull requests both run lint/typecheck/test/build via
`.github/workflows/deploy.yml`. Only a push to `main` actually deploys —
pull requests get full validation without publishing anything.

One-time setup required before the first deploy works:

1. Create the GitHub repository named exactly `aleeks-code.github.io` and push
   this project to it (`git remote add origin <url>`, `git push -u origin main`).
2. In the repository's Settings → Pages, set **Source** to **GitHub Actions**.
3. Sign up at https://formspree.io, create a form, and copy its form ID.
4. Add that ID as a repository **variable** (not a secret — it ends up in
   public client-side JS either way) named `NEXT_PUBLIC_FORMSPREE_ID`
   (Settings → Secrets and variables → Actions → **Variables** tab → New
   repository variable), and also create a local `.env.local` (copy
   `.env.local.example`) for local dev.
5. Push to `main` — the site publishes to `https://aleeks-code.github.io`.

## Content

Update placeholder content in:
- `data/site.ts` (name, role, bio, email, social links, optional CV link)
- `data/projects.ts` (include real screenshots in `public/projects/`, and a
  concrete `role`/`impact` per project — a project without a stated outcome
  reads as generic)
- `data/skills.ts`
- `app/icon.svg` (placeholder favicon — swap for real initials or a logo)

Still open, not code-buildable by this project:
- A real Open Graph preview image at `public/og-image.png` (already
  referenced in `app/layout.tsx` metadata — just needs the actual file).
- A real CV file, then set `site.cvUrl` to it.
