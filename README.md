# BetterCalamba

A community-led, open-source portal designed to make the government of the **City of Calamba, Laguna** accessible, transparent, and user-friendly.

This project is a city-focused fork of [BetterGov.ph](https://bettergov.ph), adapted for Calambenos.

---

### Inspirations

BetterGov.PH https://github.com/bettergovph/bettergov
BetterSolano.org https://github.com/BetterSolano/bettersolano
Betterlocalgov https://github.com/iyanski/betterlocalgov

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
git clone https://github.com/BetterCalamba/bettercalamba
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

### Blocker (required before first production deploy)

- [ ] **Create Cloudflare D1 database** — create `bettercalamba-openlgu` in the Cloudflare dashboard and replace `TODO-create-new-d1-database` in `wrangler.jsonc` with the real `database_id`

### Branding

- [ ] **Replace BetterLB logo assets** — `public/logos/svg/` still contains 8 old `betterlb-*.svg` files with `data-municipality="Los Baños"`. Create/add BetterCalamba equivalents and remove the LB files
- [ ] **Update `public/sitemap.xml`** — all URLs still point to `bettergov.ph`; update to `bettercalamba.org`
- [ ] **Update `public/robots.txt`** — sitemap URL points to `bettergov.ph/sitemap.xml`; update to `bettercalamba.org/sitemap.xml`

### Data

- [ ] **Repopulate services data** — all service data was cleared to blank (`[]`) pending a clean re-import from the Citizens Charter. See the "Citizens Charter re-import" workflow below. Old data is preserved in `.backups/citizens-charter/`
- [ ] **Fix Los Baños office mappings in `scripts/merge_citizens_charter.py`** — the `map_office_division_to_slug()` function has Los Baños office names and slugs hardcoded (e.g. `"PHILIPPINE NATIONAL POLICE (PNP) - LOS BAÑOS MPS"`, `MUNICIPAL ...` offices, `"12th-sangguniang-bayan"`). When repopulating, either rewrite these for Calamba's offices or skip this script's mapping path and write the category JSONs directly
- [ ] **Fill ex-officio councilor slots** — `src/data/directory/legislative.json` has two `"To be confirmed"` entries for ABC President and SK Federation President; fill in when confirmed
- [ ] **Audit `src/data/websites.json`** — 3 entries (IRRI, LSPU, PHSA) have Los Baños addresses; decide if these belong in a Calamba portal or are LB carry-overs to remove
- [ ] **Audit `src/data/directory/departments.json`** — spot-check that department names and contacts are Calamba-specific and not LB carry-overs

#### Citizens Charter re-import workflow

1. Drop the source charter PDFs into `raw_data/citizencharters/pdfs/`
2. Get a Gemini API key from [Google AI Studio](https://aistudio.google.com) (the consumer Gemini Advanced subscription does **not** include API access — this is separate, free-tier is fine), then `export GEMINI_API_KEY="..."`
3. `pip install google-genai && python3 scripts/charter_pdf_to_md.py` — converts each PDF to a structured `.md` in `raw_data/citizencharters/`
4. Review/correct the `.md` files, then parse them into `src/data/services/categories/*.json`
5. `npm run merge:services` to regenerate `services.json` and `merged-services.json`

### Config / Integrations

- [ ] **Transparency procurement org ID** — `config/lgu.config.json` `externalDashboard` URL is missing the Calamba org ID at the end
- [ ] **Social links** — `discordUrl` and `facebookUrl` in `config/lgu.config.json` are empty; fill in when community pages are set up
- [ ] **Weather API key** — copy `.dev.vars.example` to `.dev.vars` and add an OpenWeatherMap API key for local dev (free key from openweathermap.org)

### Cleanup

- [ ] **Remove `src/pages/government/reference-implementation.tsx`** — template file from BetterLB, not a real Calamba page
- [ ] **Rename D1 binding** — `wrangler.jsonc` still uses `binding: "BETTERLB_DB"` for backwards compatibility; consider renaming to `BETTERCALAMBA_DB` once the new database is created (requires updating all `Functions` code that references the binding)

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

- **Website**: https://bettercalamba.org
- **GitHub Issues**: https://github.com/BetterCalamba/bettercalamba/issues
- **Contact**: volunteers@bettergov.ph
