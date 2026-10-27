# Luke Shore — Programmer Portfolio & Blog

Personal portfolio, project showcase, and engineering blog for **Luke Shore** (Software Engineer & Game Engine Developer), built with Angular 19, standalone components, Angular Material, and responsive modern CSS. Hosted on GitHub Pages at [pheonixfirewingz.github.io](https://pheonixfirewingz.github.io).

---

## Features

- **Personal Portfolio Showcase:** Detailed technical overviews for game engines (*Discout / Square Smash*, *First Game Engine*, *Shadows*, *Storyteria*), graphics systems (*Software Renderer*, *OpenTTD Renderer Rewrite*), and low-level tools (*LibLunaScript*, *LibOS Web Server*, *Custom Sounds*).
- **Engineering Blog:** Long-form technical articles covering software rasterization, vertex mathematics, lighting algorithms, and custom tooling development.
- **Dynamic Profile & Bio:** Calculates and displays up-to-date career experience dynamically from birth year without static year hardcoding.
- **Fully Self-Contained Assets:** Zero external CDN image dependencies; all media, game screenshots, and CC0 public domain photography are hosted locally in `public/assets/`.
- **Responsive & Accessible UI:** Clean dark theme with Angular Material components and semantic ARIA labeling.

---

## Tech Stack

- **Framework:** Angular 19 (Standalone Components, Signals, Router)
- **UI Components:** Angular Material & Angular CDK
- **Testing:** Vitest with jsdom
- **Typography:** Roboto (Google Fonts / Apache 2.0)
- **Deployment:** GitHub Pages SPA with 404 client-side route fallback

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20+ or v22+ recommended)
- [npm](https://www.npmjs.com/) (v10+)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/pheonixfirewingz/pheonixfirewingz.github.io.git
cd pheonixfirewingz.github.io
npm install
```

### Development Server

Run the Angular CLI development server:

```bash
npm start
# or: npx ng serve
```

Navigate to `http://localhost:4200/`. The app will automatically reload when source files are modified.

### Building for Production

Compile optimized static production artifacts into `dist/pheonixfirewingz/browser`:

```bash
npm run build
```

To preview the built static bundle locally with SPA client-side routing support:

```bash
npx serve -s dist/pheonixfirewingz/browser
```

### Running Tests

Execute unit tests via [Vitest](https://vitest.dev/):

```bash
npm test -- --watch=false
```

---

## Project Structure

```
├── public/
│   ├── assets/
│   │   ├── blog/          # Technical figures and diagrams for blog posts
│   │   ├── icons/         # Social platform brand icons (YouTube, Discord, GitHub)
│   │   ├── pages/         # Page banner and hero imagery
│   │   └── portfolio/     # Game screenshots, engine stills, and project covers
│   ├── 404.html           # GitHub Pages SPA redirect fallback
│   └── favicon.ico        # Site favicon
├── src/
│   ├── app/
│   │   ├── components/    # Navigation, footer, and shared UI elements
│   │   ├── pages/         # Home, Portfolio, Project Detail, About, and Blog views
│   │   ├── app.config.ts  # Application routing and provider configuration
│   │   ├── app.ts         # Root component
│   │   ├── app.spec.ts    # Unit test suite
│   │   └── site-data.ts   # Portfolio data, articles, bio (Source-Available)
│   ├── index.html         # Application shell HTML
│   ├── main.ts            # Bootstrapping entry point
│   └── styles.css         # Global styling and dark theme variables
├── licenses/
│   ├── README.md          # License breakdown and summary table
│   ├── MIT.txt            # MIT License for Angular application engine
│   ├── SOURCE-AVAILABLE.txt # Terms for site-data.ts (Not open source)
│   ├── CC0-1.0.txt        # Creative Commons CC0 1.0 Universal Dedication
│   ├── APACHE-2.0.txt     # Apache License 2.0 (Roboto typography)
│   └── ASSETS.md          # Comprehensive media provenance & attribution registry
├── angular.json           # Angular workspace configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript compiler configuration
└── vitest.config.ts       # Vitest configuration
```

---

## Licensing & Attribution

This repository uses a multi-tiered license structure documented in the [`licenses/`](licenses/) directory:

| Component | License | Terms / Details |
| :--- | :--- | :--- |
| **Application Software Engine** | [MIT License](licenses/MIT.txt) | © 2023–2026 Luke Shore (Open Source) |
| **Site Data & Articles** (`src/app/site-data.ts`) | [Source-Available](licenses/SOURCE-AVAILABLE.txt) | © 2023–2026 Luke Shore (Source-available for viewing/inspection only; not open source) |
| **Original Portfolio & Blog Works** | Proprietary / All Rights Reserved | © 2023–2026 Luke Shore (Game engine demos, screenshots, text, and architecture diagrams) |
| **Public Domain Photography** | [CC0 1.0 Universal](licenses/CC0-1.0.txt) | Creative Commons Public Domain Dedication (Markus Spiske, Abigail Keenan) |
| **Brand Icons** | Brand Fair Use | Discord Inc., GitHub, Inc., and Google LLC / YouTube |
| **Typography (Roboto)** | [Apache License 2.0](licenses/APACHE-2.0.txt) | Google Fonts / Android Open Source Project |

For complete asset-by-asset provenance details, see [`licenses/ASSETS.md`](licenses/ASSETS.md).
