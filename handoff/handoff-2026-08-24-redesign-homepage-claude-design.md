# Portfolio Handoff — redesign homepage da mockup Claude Design + fix hero/header, sessione 2026-08-24

**Progetto**: `C:\Users\am28\Desktop\Portfolio` — repo git, remote `origin` → `https://github.com/aleeks-code/aleeks-code.github.io.git`, branch `main`, GitHub Pages (user site). Ogni push su `main` fa partire `.github/workflows/deploy.yml`: `npm ci` → lint → typecheck → test → build → deploy (deploy solo su push a `main`, le PR fermano prima). Nessun deploy manuale.
**Fonte di verità architetturale**: `docs/superpowers/specs/2026-08-23-portfolio-design.md` (spec originale, precedente a questa sessione) + `docs/superpowers/plans/2026-08-23-portfolio-website.md`. Decisioni lì dentro **non toccate** da questa sessione: Next 16 App Router + `output:'export'`, Tailwind v4 CSS-first (`@theme` in `globals.css`, niente `tailwind.config.ts`), contenuto nei `data/*.ts` (principio: rebrand tocca solo dati, non componenti), Formspree per il form contatti, `cacheComponents` volutamente off (bug noti con `output:'export'`).
**HEAD a fine sessione**: `73d3ce7`. Working tree pulito tranne 3 file untracked pre-esistenti (§6).

---

## 1. Contesto: da dove si parte

Il sito **prima** di questa sessione era un tema "developer" generico: font mono, navy `#0b1330`/brand `#2e5bff`, card progetti a gradiente, sezioni Hero/Services/About/Projects/Skills/Contact (commit `8e6c80f` e precedenti). L'utente aveva nel frattempo disegnato **in Claude Design** (lo strumento canvas, non questo repo) un redesign completo dell'homepage — progetto `bad6712a-9b63-45d0-b732-46df0d39654a` ("Design system e homepage desktop/mobile"), file `Portfolio Alex Munafo - Homepage.dc.html` (+ `image-slot.js`/`support.js`, runtime del canvas, **non** portati nel sito reale — sono scaffolding dello strumento di design).

Questa sessione: (a) letto il mockup via tool `DesignSync` (metodo `get_file`/`list_files`), (b) tradotto l'intero mockup in componenti React/Tailwind reali dentro questo repo, (c) iterato su bug reali trovati **dall'utente stesso guardando il sito live**, non da me.

**Nel progetto Claude Design ci sono altri file non ancora implementati**: `Portfolio Alex Munafo - 2a.dc.html`, `Portfolio Alex Munafo - Direzioni.dc.html`, `Portfolio Alex Munafo.dc.html`. Solo "Homepage" è stata implementata. Se l'utente chiede di questi, sono nello stesso progetto Claude Design, si rileggono con lo stesso metodo (`DesignSync` → `get_project`/`list_files`/`get_file`).

---

## 2. Chiuso in questa sessione (build+deploy verificati; verifica visiva finale spetta all'utente)

### 2.1 Redesign completo homepage — commit `4595a1a`
Riscritti tutti i componenti sezione per matchare il mockup 1:1 (palette cream `#F0EBE1`/navy `#0A1428`/brand `#2B4BF2`/coral `#E1442A`, font Familjen Grotesk + Instrument Serif italic per l'accento):

- **`components/Nav.tsx`**: sticky header, sottolineatura sezione attiva via `IntersectionObserver` (`rootMargin:'-50% 0px -50% 0px'`), hamburger mobile.
- **`components/Hero.tsx`**: headline con parola in corsivo serif, CTA primaria/secondaria, riga tagline separata.
- **`components/Projects.tsx`** (riscritto da zero, sostituisce il vecchio grid semplice): **due varianti nello stesso componente**, stato condiviso (`active`, `view`) — desktop = sezione sticky/scrollytelling alta `${projects.length * 113.34}vh` (calcolata dalla lunghezza dell'array, non hardcoded) con `IntersectionObserver` su 3 marker invisibili (`data-stop`) che pilotano l'indice attivo mentre si scrolla, più toggle "Desktop/Mobile" che cambia solo l'immagine mostrata (screenshot desktop vs mobile del progetto, non il layout della pagina); mobile = card con tab cliccabili (`md:hidden`), non scroll-driven. `ProjectCard.tsx` **eliminato** (sostituito).
- **`components/Services.tsx`**: accordion (una voce aperta alla volta), dati in `data/services.ts` (nuovo file).
- **`components/About.tsx`**: aggiornato copy + lista 3 principi.
- **`components/Method.tsx`** (**nuovo**, sezione non esisteva prima): 4 step, dati in `data/method.ts` (nuovo file).
- **`components/Skills.tsx`**: da badge a tabella per categoria (Frontend/Backend/Workflow), `data/skills.ts` ristrutturato (era `Skill[]` piatto, ora `SkillGroup[]` con `tools[]`+`note`).
- **`components/Contact.tsx`**: **logica Formspree reale mantenuta** (idle/sending/success/error/config-error, honeypot `_gotcha`, guardia su `NEXT_PUBLIC_FORMSPREE_ID` mancante) — il mockup usava un `setTimeout` finto, qui è rimasto il `fetch` vero. Aggiunto: campo "Tipo di progetto" (select), validazione email lato client prima dell'invio (regex, blocca il fetch se non valida, messaggio inline + `aria-invalid`). **`noValidate` sul `<form>` è necessario** — senza, la validazione nativa del browser su `type="email"` blocca il submit prima che il nostro JS lo veda (bug reale incontrato: test con email invalida restava appeso, causa `<input type="email">` che intercetta il submit).
- **`components/Footer.tsx`**: aggiornato link/copy.
- **`components/Reveal.tsx` eliminato**: il mockup vieta esplicitamente il fade-up generico ("si muove solo ciò che cambia stato"), nessun componente lo usa più dopo il redesign.
- **Contenuti spostati nei `data/*.ts`**: `site.ts` esteso (hero/about/contact copy come campi tipati, non stringhe in JSX), `projects.ts` esteso (`sector`, `caption`, `detail:{objective,choice,interfaceNote}`, `imageDesktop`/`imageMobile`).
- **Immagini**: i 9 slot (3 progetti × desktop+mobile = 6, + 3 dettaglio servizi) usano placeholder `placehold.co` — **richiesto esplicitamente dall'utente** ("cerca dei placeholder online"), non è un ripiego mio. `next.config.mjs` → `images.remotePatterns` aggiunto per `placehold.co`.
- **Test**: `components/Contact.test.tsx` aggiornato (copy nuova: "richiesta inviata" non più "grazie... messaggio") + nuovo test per la validazione email inline.

### 2.2 Favicon + fix hero/header — commit `4bc52c3`, `8fc2709`, `73d3ce7`

- **Favicon/manifest** (`4bc52c3`): i favicon in `public/` erano **già identici byte-per-byte** ad `am-favicon-pack.zip` (verificato via `md5sum`) — nulla da correggere lì. Mancava solo `android-chrome-192x192.png` (copiato in `public/`) e un web manifest che lo referenzi: `app/manifest.ts` (Next metadata route). **Attenzione se si tocca questo file**: serve `export const dynamic = 'force-static'`, altrimenti `next build` fallisce con `output:'export'` (errore reale incontrato: "dynamic/revalidate not configured on route /manifest.webmanifest"). Bonus fix nello stesso commit: `app/layout.tsx` aveva `site.role.toLowerCase()` nella meta description, che abbassava anche "Mantova" (nome proprio) — tolto `.toLowerCase()`.
- **Hero troppo corto → sezione Progetti "mescolata" con l'hero** (`4bc52c3`): bug segnalato dall'utente con screenshot, non trovato da me a priori. Causa: Hero alto solo ~516px; la sezione Progetti è `position:sticky` e alta `100vh` **non appena il suo bordo superiore supera l'header** — non esiste uno stato "parzialmente rivelato", è tutto-o-niente. Con hero così corto, su schermi normali il pannello scuro sbucava già pieno con zero o pochissimo scroll, sembrando due sezioni sovrapposte. **Fix**: `Hero.tsx` → `md:min-h-[calc(100svh-84px)]` + `md:flex md:flex-col md:justify-center` sulla `<section>` (84px = altezza header). Solo desktop (`md:`), il mobile non ha questo pattern sticky quindi non serve.
- **Riempire lo spazio vuoto dell'hero** (`8fc2709`, su richiesta utente "molto spoglio"): aggiunto (a) pattern a puntini sottile su tutto lo sfondo hero (`radial-gradient` inline, 26px grid, alpha 0.09), (b) logo "AM" gigante (`public/am-mark.png`, estratto da `am-favicon-master.png` dentro `am-favicon-pack.zip`) a opacità 10% in basso a destra, come firma discreta del brand. **Bug CSS reale incontrato e fixato**: gli elementi `-z-10` erano invisibili anche a opacità 100% — causa: `position:relative` **da solo, senza un valore di `z-index` esplicito, non crea un nuovo stacking context**; i figli con z-index negativo "scappavano" verso lo stacking context dell'antenato, dove lo sfondo della sezione Hero (che essendo essa stessa `position:relative` con `z-index:auto` dipinge allo step "positioned z-index:auto", **sopra** allo step "negative z-index descendants") finiva per coprirli del tutto. **Fix**: `isolate` (= `isolation:isolate`) sulla `<section>` dell'Hero. **Promemoria per il futuro**: se un layer decorativo con z-index negativo dentro un genitore `position:relative`/`sticky` risulta invisibile anche a opacità 1, controllare per primo se il genitore ha `isolate` o uno z-index esplicito — bug facile da reintrodurre se si aggiungono altri layer decorativi ad altre sezioni. Nello stesso commit: passaggio da `<img>` a `next/image` per il logo (avviso ESLint `no-img-element`), con `width={1254} height={1254}` + `h-auto` per preservare l'aspect ratio con una larghezza responsive via classe.
- **Header "molto noioso"** (`73d3ce7`, su richiesta utente): aggiunta l'icona "AM" (34px, `next/image`) accanto al wordmark nel lockup condiviso desktop/mobile — prima il logo compariva **solo** nel favicon, mai sulla pagina stessa. "Parliamone" da bordo navy a riempimento `bg-brand` pieno (matcha il CTA primario dell'hero, dà gerarchia visiva). Aggiunto `hover:text-brand` sui link nav (prima gli inattivi non avevano nessun feedback hover).

### 2.3 Metodo di verifica usato questa sessione (utile da ripetere)

Nessun tool browser nativo disponibile. Playwright **non è dipendenza del repo** — installato ad-hoc in uno scratchpad temporaneo (`npm install playwright` con `PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1`, i browser erano già in cache locale in `~/AppData/Local/ms-playwright`), mai toccato `node_modules`/`package.json` del repo reale. Usato per: screenshot desktop/mobile/tablet, click su bottoni (progetti/servizi/toggle), submit form, e — quando un cambiamento sembrava non avere effetto — ispezione diretta di `getBoundingClientRect()`/`getComputedStyle()` via `page.evaluate()` invece di continuare a tirare a indovinare da screenshot (così sono stati isolati sia il bug hero/progetti sia il bug z-index/isolate).

Per i bug segnalati dall'utente: screenshot più recente in `~/Pictures/Screenshots/` (Windows), trovato con `ls -lat` — **non aspettarsi che l'utente lo alleghi esplicitamente**, chiede genericamente "guarda l'ultimo screenshot".

Prima di ogni commit: `git status --short` — `next dev` rigenera sempre `next-env.d.ts` (punta a `.next/dev/types/...` invece di `.next/types/...`); va sempre fatto `git checkout -- next-env.d.ts` prima di stageare, altrimenti finisce in ogni commit come rumore.

Sequenza di verifica ripetuta ad ogni round, sempre in quest'ordine: `npx tsc --noEmit` → `npx eslint .` → `npx jest` → `npx next build` → (se serve verifica visiva) dev server + Playwright → commit → **conferma esplicita dell'utente** → `git push origin main` → `gh run watch <id> --exit-status`.

---

## 3. Aperto / prossimo passo naturale

1. **Screenshot reali dei 3 progetti demo**: i 9 slot immagine sono placeholder `placehold.co`. Quando ci sono screenshot veri, si sostituiscono i campi `imageDesktop`/`imageMobile` in `data/projects.ts` e `image` in `data/services.ts`. Se si passa a file locali sotto `public/`, si può togliere il `remotePatterns` per `placehold.co` da `next.config.mjs`.
2. **Verifica visiva umana finale**: fatta da me solo via Playwright (screenshot statici + interazioni scriptate). Mai vista la pagina live scrollata con calma da un umano sul proprio monitor/zoom reale, a parte i 2 screenshot che l'utente ha condiviso (che infatti hanno fatto emergere entrambi i bug reali di questa sessione). Vale la pena un altro giro con occhi umani su: accordion servizi, tabella competenze, sezione Metodo, form contatti, footer — sezioni mai segnalate come problematiche ma anche mai confermate esplicitamente ok.
3. **Altri artboard Claude Design non ancora implementati**: `2a.dc.html`, `Direzioni.dc.html`, `Portfolio Alex Munafo.dc.html` nello stesso progetto (`bad6712a-...`) — se l'utente li nomina, si rileggono da lì.
4. **`am-favicon-pack.zip`** resta untracked alla root del repo (non mio, non toccato) — i suoi contenuti utili sono già tutti integrati in `public/`. Non cancellato: non è un file mio, decisione dell'utente se rimuoverlo.
5. **`AGENTS.md`/`CLAUDE.md`** untracked alla root — auto-generati da `next dev` stesso (`AGENTS.md` lo dichiara nel proprio testo: riscritto da `node_modules/next/dist/server/lib/generate-agent-files.js` ad ogni `next dev`). Non toccati questa sessione. Se una sessione futura li vede come diff ricorrente, la nota nel file stesso dice che committarli tiene pulito l'albero (rimuoverli dal diff li ricrea soltanto).

**Non aperto, verificato chiuso**: `NEXT_PUBLIC_FORMSPREE_ID` è configurato sia in locale (`.env.local`) sia come GitHub Actions repo variable (`xvkpndyq`, impostata il 2026-08-23, prima di questa sessione) — il form contatti in produzione è funzionante, non in stato `config-error`.

---

## 4. Vincoli di processo osservati questa sessione

- **Mai pushato senza conferma esplicita dell'utente**, ogni singola volta, anche dopo che le volte precedenti erano state approvate — l'autorizzazione non si estende automaticamente al giro successivo.
- **Niente `git add -A`**: file specifici per nome ad ogni commit, per non trascinare dentro `AGENTS.md`/`CLAUDE.md`/`am-favicon-pack.zip` (non miei) o `next-env.d.ts` (rumore di `next dev`).
- Contenuto testuale sempre nei `data/*.ts`, mai stringhe hardcoded nei componenti (principio esplicito dello spec originale, rispettato durante tutto il redesign).
- Decisioni di design con reale ambiguità (gestione dei 9 placeholder immagine) chieste esplicitamente all'utente prima di procedere, non decise a caso.

## 5. Riferimenti (non duplicare, leggere alla fonte)

- `docs/superpowers/specs/2026-08-23-portfolio-design.md`, `docs/superpowers/plans/2026-08-23-portfolio-website.md` — architettura/decisioni originali, invariate.
- Progetto Claude Design: id `bad6712a-9b63-45d0-b732-46df0d39654a` ("Design system e homepage desktop/mobile"), file `Portfolio Alex Munafo - Homepage.dc.html` (implementato), + 3 file non implementati (§1).
- Commit chiave di questa sessione: `4595a1a` (redesign completo), `4bc52c3` (hero height + favicon/manifest), `8fc2709` (texture hero + fix isolate), `73d3ce7` (header logo + CTA).

---

## Suggested skills (per il prossimo agente)

- **`superpowers:systematic-debugging`** — i due bug reali di questa sessione (sticky-reveal invisibile senza scroll, z-index negativo coperto senza `isolate`) sono stati risolti isolando le variabili una alla volta (`getBoundingClientRect`/`getComputedStyle` via Playwright, non tirando a indovinare dallo screenshot) — stesso approccio se emerge un altro "non si vede/non funziona ma sembra tutto corretto".
- **`frontend-design:frontend-design`** — se l'utente chiede altri ritocchi estetici (è già successo due volte in questa sessione, "spoglio"/"noioso"): la palette/type-system è ormai fissata (cream/navy/brand/coral, Familjen Grotesk + Instrument Serif corsivo, logo AM come firma) — riusare quei token, non inventarne di nuovi senza motivo.
- **`ponytail:ponytail`** — riuso rigoroso già osservato (logo riusato dal favicon invece di un nuovo asset, placeholder online su richiesta esplicita invece di generare asset finti); continuare così.
- **`superpowers:verification-before-completion`** — build+lint+test+typecheck locali prima di ogni commit, poi `gh run watch` fino a `success` prima di dire "è live" — mantenere, ha già catturato un build error reale (`app/manifest.ts` senza `force-static`).
- **`caveman:caveman`** — stile di conversazione in uso in questa sessione, mantenere se l'utente non dice altro.
