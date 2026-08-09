# BetterCalamba

A community-led, open-source portal designed to make the government of the **City of Calamba, Laguna** accessible, transparent, and user-friendly.

This project is a city-focused fork of [BetterGov.ph](https://bettergov.ph), adapted for Calambenos.

---

### Inspirations

BetterGov.PH <https://github.com/bettergovph/bettergov>
BetterSolano.org <https://github.com/BetterSolano/bettersolano>
Betterlocalgov <https://github.com/iyanski/betterlocalgov>

### Portal Features

BetterCalamba provides the City of Calamba with:

- **Public Services Directory**: Comprehensive guide to city services with requirements, fees, and step-by-step processes
- **Legislative Portal**: Access to ordinances, resolutions, and executive orders from the Sangguniang Panlungsod
- **Transparency Dashboard**: Financial data, procurement bids, and infrastructure projects
- **Government Directory**: Contact information for all city departments and officials
- **Multi-language Support**: English and Filipino translations

---

## Technical Stack

- **Frontend**: React 19, Vite, TypeScript (Strict mode)
- **Styling**: Tailwind CSS v4 (CSS variables, high-contrast tokens)
- **Design System**: @bettergov/kapwa (semantic tokens, component library)
- **Backend**: Cloudflare Pages Functions (TypeScript)
- **Deployment**: Wrangler 4.70.0 (pinned for compatibility)
- **Data**: Structured JSON (modular category-based architecture)
- **Search**: Meilisearch with Fuse.js fuzzy search
- **Localization**: i18next with English & Filipino support
- **Maps**: Leaflet for geospatial visualizations
- **Data Pipeline**: Python scripts for legislative document processing
- **Testing**: Playwright (E2E tests across multiple browsers)
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks

---

## Project Structure

```
bettercalamba/
├── e2e/                         # End-to-end tests
│   └── utils/                   # Test helpers and shared testing logic
├── functions/                   # Serverless / backend functions (Cloudflare Pages)
│   └── api/                     # API endpoints and handlers
├── pipeline/                    # Data processing pipeline (Python side)
│   ├── data/                    # Structured source documents
│   │   └── pdfs/                # Source legislative PDFs
│   │       ├── executive_orders/
│   │       ├── ordinances/
│   │       └── resolutions/
│   └── __pycache__/             # Python cache (auto-generated)
├── public/                      # Static public assets
│   ├── locales/                 # Translation files (en, fil)
│   └── logos/                   # Logo exports
├── scripts/                     # Automation, maintenance, and build scripts
├── src/                         # Main application source code
│   ├── components/              # Reusable UI components
│   │   ├── data-display/        # Tables, cards, and record viewers
│   │   ├── layout/              # Layout wrappers, grids, headers, footers
│   │   ├── navigation/          # Menus, navbars, breadcrumbs
│   │   ├── search/              # Search bars, filters, query UI
│   │   ├── ui/                  # Generic UI elements (buttons, modals, etc.)
│   │   └── widgets/             # Small reusable info widgets
│   ├── data/                    # Structured frontend data layer
│   │   ├── citizens-charter/    # Citizens charter service data
│   │   ├── directory/           # Government directory datasets
│   │   ├── services/            # Public service datasets
│   │   │   └── categories/      # Service classifications
│   │   └── transparency/        # Transparency and governance data
│   ├── hooks/                   # Custom reusable frontend hooks
│   ├── lib/                     # Utility libraries and helpers
│   └── pages/                   # Route-level pages (site sections)
│       ├── government/
│       ├── legislation/
│       ├── services/
│       ├── statistics/
│       └── transparency/
└── (root config files)          # package.json, build configs, .env files
```

---

## How to Run Locally

### 1. Clone and Install

```bash
git clone https://github.com/apajuan/bettercalamba
cd bettercalamba
npm install
```

### 2. Prepare Data

```bash
python3 scripts/merge_services.py
```

### 3. Start Development Server

```bash
npm run dev           # Frontend only (port 5173)
npm run functions:dev # Frontend + API functions (port 8788)
```

**Access the portal at:** `http://localhost:5173`

For full functionality (weather, search, legislation), use `functions:dev` and copy `.dev.vars.example` to `.dev.vars` with your API keys filled in.

### 4. Running Tests

```bash
npm run test:e2e   # End-to-end tests
npm run lint       # ESLint (zero warnings tolerance)
npm run format     # Prettier
```

### 5. Building for Production

```bash
npm run build
```

---

## Calamba City Government Structure

### Executive Branch

- **Mayor**: Roseller "Ross" H. Rizal
- **Vice Mayor**: Angelito "Totie" S. Lazaro Jr.

### Legislative Branch (Sangguniang Panlungsod)

Composed of the Vice Mayor (Presiding Officer), 13 regular City Councilors, and 2 ex-officio councilors (ABC President and SK Federation President).

### Calamba-Specific Data

| Data Type | Location | Description |
|-----------|----------|-------------|
| **Departments** | `src/data/directory/departments.json` | City departments and offices |
| **Barangays** | `src/data/directory/barangays.json` | 54 barangay profiles |
| **Executive** | `src/data/directory/executive.json` | Mayor, Vice Mayor |
| **Legislative** | `src/data/directory/legislative.json` | Sangguniang Panlungsod members |
| **Services** | `src/data/services/categories/*.json` | Public services by category |
| **Citizens Charter** | `src/data/citizens-charter/merged-services.json` | Service requirements, fees, and client steps |
| **Legislation** | Cloudflare D1 Database | Ordinances, resolutions, executive orders |

---

## Deployment

BetterCalamba deploys on **Cloudflare Pages** with:

- **Frontend**: Vite build deployed on push to `main`
- **Backend**: Cloudflare Pages Functions for `/api/*` endpoints
- **Database**: Cloudflare D1 (`bettercalamba-openlgu`) for legislative data
- **Search**: Meilisearch instance
- **KV Storage**: `WEATHER_KV` for weather data caching
- **Wrangler**: Version 4.70.0 (pinned — update both `package.json` and `.github/workflows/` together)

### Database Migrations (Cloudflare D1)

```bash
npm run db:migrate          # Apply pending migrations locally
npm run db:migrate:remote   # Apply to production (prompts for confirmation)
npm run db:migrate:status   # Show applied/pending migrations
npm run db:migrate:create   # Create new migration file
```

---

## Commit Convention

Conventional Commits are enforced via commitlint + Husky:

```
feat(services): add search filter by category
fix(navbar): correct mobile menu toggle
docs: update setup instructions
```

---

## TODO

> **Done — first production deploy is live.** Created the `bettercalamba-openlgu` D1 database and the `WEATHER_KV` namespace (both binding IDs were template leftovers pointing at an account we do not control), applied migrations `001`/`002`, and moved the Git integration from a Workers Build to a Pages project — `functions/` is 38 Pages Functions endpoints, which Workers static assets cannot route.

### Branding

- [ ] **Official Calamba City seal** — `public/calamba-seal.svg` is still a placeholder (a labeled circle, see the TODO comment inside the file). Drop in the real seal, and add `public/calamba-seal-white.svg` (all-white paths, for dark backgrounds / footer). Every branding path in `config/lgu.config.json` points at this one file
- [ ] **Regenerate the Open Graph image after the seal lands** — `public/logos/png/bettercalamba-blue.png` (1200×630) is composed from the placeholder seal by `scripts/make_og_image.py`. Re-run `python3 scripts/make_og_image.py` once the real seal is in place

> **Done:** removed the 19 orphaned BetterLB logo assets from `public/logos/` (nothing in the app referenced them); rewrote `public/sitemap.xml` from the real route table in `src/App.tsx` (40 Calamba URLs — the old file was 91 national `bettergov.ph` URLs, most of which would have 404'd); pointed `public/robots.txt` at `bettercalamba.org` and disallowed `/admin`; rewrote `public/llms.txt` for Calamba; fixed `index.html`, which advertised a nonexistent OG image as `image/jpeg` at 768×768, and added the missing `og:title` / `og:description` / `og:url` / `twitter:card` tags.

### Data

- [ ] **Review Flagged Data Issues** — check the [FLAGGED_DATA_ISSUES.md](FLAGGED_DATA_ISSUES.md) file generated by `clean_services.py` for overly long fields that require manual review.
- [ ] **Pansol hot spring resorts directory** — compile an official/city-vetted list of Pansol hot spring resorts and add it back to the Services section, to help residents and tourists avoid scam/fake-resort listings (a real problem people face). Source from the city tourism office / business permits, add to `src/data/`, then run `npm run merge:services`
- [ ] **"Kinurakot" DPWH projects list** — compile and include the list of "kinurakot" (allegedly corrupt/anomalous) DPWH projects for Calamba City, for transparency/accountability. Tied to the 2025 flood-control projects scandal. Decide where they surface (Transparency/infrastructure section), add the data to `src/data/`. Sources:
  - [DPWH Infrastructure Projects Portal](https://transparency.dpwh.gov.ph/) — official project records (contractor, cost, status); filter by Calamba
  - [Sumbong sa Pangulo](https://sumbongsapangulo.ph/) — government flood-control reporting portal (per-project irregularity reports)
  - [Flood control projects scandal — Wikipedia](https://en.wikipedia.org/wiki/Flood_control_projects_scandal_in_the_Philippines) — background/context
- [ ] **Homepage, search, and department pages read an empty dataset** — `src/data/citizens-charter/merged-services.json` is an empty array, but it is what `src/components/home/Hero.tsx`, `src/pages/Search.tsx`, and `src/pages/government/departments/[department].tsx` import. The real 276 services live in `src/data/services/services.json`, which only the `/services` directory reads. `merged-services.json` is regenerated by `merge_citizens_charter.py` from `src/data/citizens-charter/citizens-charter.json`, which also holds zero services. Decide which file is canonical and point all four consumers at it
- [ ] **City College of Calamba — dedicated page (decided: Option C)** — 21 services carry `officeSlug: "city-college-of-calamba"` with no matching entry in `src/data/directory/departments.json`, so `/government/departments/city-college-of-calamba` renders "Office Not Found". Every other `officeSlug` (19 of 20) resolves.

  **Do not add it to `departments.json` as a department.** CCC is a Local University/College (LUC): created by city ordinance under the Local Government Code, funded by Calamba, CHED-regulated but LGU-governed. It appears in the city's Citizen's Charter because RA 11032 covers LGU-operated entities, and the city site files it under Departments because the **Mayor sits as ex officio Chairman of its Board of Trustees** (currently Ross Rizal; college president is Dr. Ronald A. Gonzales). Administratively department-like, legally not a department.

  **Plan:** a first-class page at `/government/city-college` — college identity, president, the Mayor-as-chairman relationship, external link to [ccc.edu.ph](https://www.ccc.edu.ph/), and the 21 services grouped by their six internal offices (Registrar, Records Management, Student Affairs, Guidance, MIS). All 21 are student-facing academic transactions (enrollment, transcripts, grades, LOA, clearance) categorised `Education & Scholarship` — the audience is enrolled students, not the general public, which is why they do not belong in the civic-services department directory.

  Known contact data from the city site: `(049) 545-0160 / 545-0555 / 502-0677`, Old Municipal Site, Brgy. VII, Poblacion. Founding ordinance number still unconfirmed — `ccc.edu.ph` returned HTTP 503 and the Wikipedia entry is a stub; needs a primary Sangguniang Panlungsod source.

  Until this ships, the 404 stays live for all 21 services.
- [ ] **Normalise `officeDivision` spellings** — the same office appears under two spellings, e.g. `"CCC-Office of the College Registrar"` and `"CCC - Office of the College Registrar"` (no space vs. spaced). Any grouping by office will split the Registrar's services into two buckets. Fix in the parse/merge step, not by hand-editing generated data
- [ ] **Fill ex-officio councilor slots** — `src/data/directory/legislative.json` has two `"To be confirmed"` entries for ABC President and SK Federation President; fill in when confirmed
- [ ] **Populate `src/data/directory/departments.json` contact details** — the 24 office names and slugs are already Calamba-specific, but `address`, `trunkline`, `website`, `email`, and `department_head` are `null` on every entry. Source from the city's official directory

> **Resolved:** `src/data/websites.json` is the **national** directory of 723 Philippine government/institution sites inherited from BetterGov, not a Calamba-local list. The IRRI / LSPU / PHSA entries have Los Baños addresses because those institutions are physically there — they are legitimate national entries, not LB carry-overs. No action needed.

#### Citizens Charter re-import workflow

Reference for future re-imports. The current dataset (276 services across 10 categories) was imported this way in `c790930`; prior snapshots are preserved in `.backups/citizens-charter/`.

1. Drop the source charter PDFs into `raw_data/citizencharters/pdfs/`
2. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com) (the consumer Gemini Advanced subscription does **not** include API access — this is separate, free-tier is fine), then `export GEMINI_API_KEY="..."`
3. `pip install google-genai && python3 scripts/charter_pdf_to_md.py` — converts each PDF to a structured `.md` in `raw_data/citizencharters/`
4. Review/correct the `.md` files, then parse them into `src/data/services/categories/*.json`
5. `npm run merge:services` to regenerate `services.json` and `merged-services.json`

### Config / Integrations

- [ ] **Transparency procurement org ID** — `config/lgu.config.json` `externalDashboard` URL is missing the Calamba org ID at the end
- [ ] **Social links** — `discordUrl` and `facebookUrl` in `config/lgu.config.json` are empty; fill in when community pages are set up
- [ ] **Weather API key** — per-developer local setup: copy `.dev.vars.example` to `.dev.vars` and add an OpenWeatherMap API key (free key from openweathermap.org), then run `npm run functions:dev`. For production, set `OPENWEATHERMAP_API_KEY` as a Cloudflare Pages secret

### Section build-out

Services (`/services`) is the one section with real data behind it. These sections are wired into the router but still run on template or placeholder content:

- [ ] **Government directory** (`/government`) — elected officials, municipal committees, departments, barangays. Content-driven; data in `src/data/directory/`. Highest public-facing payoff.
- [ ] **Transparency** (`/transparency`) — financial, procurement, infrastructure (+ detail), bids
- [ ] **Statistics** (`/government/statistics`) — population, municipal-income, competitiveness
- [ ] **OpenLGU legislative** (`/openlgu`) — docs, officials, terms, sessions, persons. Separate pipeline from the Citizens Charter; backed by `functions/api/openlgu/`
- [ ] **Data widgets** (`/data`) — weather (needs `.dev.vars` key) and forex pages
- [ ] **Admin tooling** (`/admin`) — documents, person merge, deletion queue, error log, audit logs, review queue, reconcile, OpenLGU workbench (several TODO markers)
- [ ] **Standalone pages** — Home, About, Contact, Accessibility, Search, Ideas, Join-us, Sitemap, Contribute
- [ ] **BetterLB → Calamba localization audit** — a sweep of code, config, and public assets was done (see Branding + Cleanup); what remains is page **copy** review — walk each section's user-facing text for template phrasing that reads as generic BetterGov rather than Calamba

### Planned Features (frontpage expansion)

Prototype with Claude `frontend-design` first, review, then port into the real codebase using Kapwa semantic tokens.

> **Shipped:** the tourism section (`91e5182`) — `src/data/tourism/destinations.json` (12 destinations), `TourismHighlights` on the homepage with a details modal, and the `/tourism` all-destinations page. Gated by `config.features.tourism`.

- [ ] **Facebook news & interest pages** — curated feed/links to official and community Facebook pages linked to Calamba City. Decide between embedded Page plugin (iframe) vs. a lightweight curated link list (no third-party script/privacy cost). Store the page list in config or `src/data/`
- [ ] **Online transactions "quick dial" (homepage)** — a prominent panel of shortcuts to the city's online services: one-stop shops, online payment portals, permit/clearance portals, appointment booking. Data-driven list of `{ label, url, icon, description }`; opens external links safely (`rel="noopener noreferrer"`)

### Cleanup

- [ ] **`npm run build` does not currently compile** — `npm run build` runs `tsc` first, and `tsc -p tsconfig.app.json` reports **381 errors**: 142 across 41 source files and 239 in test files. Pre-existing and unrelated to the branding work; worth treating as its own cleanup pass. Two distinct causes:
  - **Test files (239)** — `tsconfig.app.json` uses `include: ["src"]`, which pulls `*.test.tsx` into the build, and the jest-dom matcher types are never registered, so every `toBeInTheDocument` / `toHaveTextContent` / `toHaveClass` fails. Fix by registering `@testing-library/jest-dom` types in `tsconfig.app.json` or excluding test files from the build config — this one change clears roughly two thirds of the total
  - **Source files (142)** — mostly `TS2339` (property does not exist, 60) and `TS7006` (implicit `any`, 23), concentrated in `src/pages/statistics/*` (44), `src/pages/government/*` (38), and `src/pages/admin/*` (16). Largely template pages whose data shapes drifted from their types
  - Note that the pre-commit hook only lints staged files and does not run `tsc`, which is how this accumulated unnoticed
- [ ] **Decide the fate of `scripts/generate-llms-txt.js`** — inherited from the BetterGov.ph national template. It hardcodes `bettergov.ph` and emits the national route structure (`/philippines/*`, `/travel/*`, `/government/executive/*`), none of which exist in this router, so running it overwrites the hand-maintained `public/llms.txt` with URLs that 404. It is not wired into any npm script and now carries a stale-warning header. Rewrite it against the Calamba routes or delete it
- [ ] **`docs/reference-implementation-patterns.md`** — a patterns doc written for "copying into new projects". Useful as an architecture reference, but it documents the now-deleted reference-implementation page and is framed as template export material. Keep as internal docs or delete

> **Done:** rewrote the Los Baños office mapping in `scripts/merge_citizens_charter.py` for Calamba's city offices — the new 54-entry table is derived from the `officeDivision` / `officeSlug` pairs already in `services.json` and reproduces all 276 services' slugs exactly. Also swept the remaining BetterLB carry-overs out of `ABOUT.md`, `ARCHITECTURE.md`, `CONTRIBUTING.md`, `docs/`, `functions/README.md`, `scripts/flag_sessions_for_review.py` (which pointed at the wrong remote D1 database), `start.sh` (hardcoded `/workspace/github/betterlb`), and doc comments in `src/lib/lguLabels.ts` and `src/components/ui/Card.tsx`. Removed the LB-era `services.backup_20260220_214048.json`. The `@betterlb/ui` package name is deliberately left alone.

> **Done:** renamed the D1 binding `BETTERLB_DB` → `BETTERCALAMBA_DB` across 41 files (`functions/types.ts`, all Functions endpoints, `scripts/migrate.sh`, `scripts/flag_sessions_for_review.py`, `wrangler.jsonc`, docs). Removed the template machinery — `scripts/setup-lgu.cjs` (the fork wizard), `FORKING.md`, `src/pages/government/reference-implementation.tsx` with its route in `src/App.tsx` and its e2e spec. Fixed `.github/workflows/deploy.yml`, which deployed to `--project-name=betterlb`.

---

## License and Data Sources

### Code License

Released under [Creative Commons CC0](https://creativecommons.org/publicdomain/zero/1.0/). Public domain — freely use, modify, and distribute without restriction.

### Data Attribution

| Data Source | Type | Attribution |
|-------------|------|-------------|
| **City Government of Calamba, Laguna** | Official government data, services directory | Public domain |
| **Philippine Government Procurement Portal (PhilGEPS)** | Procurement bids and awards | Republic of the Philippines |
| **Department of Budget and Management (DBM)** | Financial releases | Republic of the Philippines |
| **Department of Public Works and Highways (DPWH)** | Infrastructure projects | Republic of the Philippines |

Data is presented as-is and may not reflect the most current information. Always verify with official LGU sources.

---

## Contact and Support

- **Website**: <https://bettercalamba.org>
- **GitHub Issues**: <https://github.com/BetterCalamba/bettercalamba/issues>
- **Contact**: <volunteers@bettergov.ph>
