# spsc://portfolio

Portfolio of **Surya Pratap Singh Chauhan** — information-security postgrad @ NSUT,
security researcher, SDE. Built with Next.js (App Router), Tailwind CSS v4 and a
zero-config static-export path for GitHub Pages.

## Run locally

```bash
npm install

# dev server with hot reload
npm run dev            # -> http://localhost:3000

# or production mode
npm run build
npm run start          # -> http://localhost:3000
```

That's it — no database or env vars are required for the site itself
(the `/api/health` route degrades gracefully without one).

## Host on GitHub Pages

### Option A — GitHub Actions (recommended, auto-deploys on push)

1. Push this repo to GitHub (e.g. `brodante/portfolio`).
2. In the repo: **Settings → Pages → Build and deployment → Source → "GitHub Actions"**.
3. Push to `main`. The bundled workflow (`.github/workflows/deploy.yml`) builds the
   static site with `BASE_PATH=/<repo-name>` and publishes it to
   `https://<user>.github.io/<repo-name>/`.

### Option B — manual, from your machine

```bash
# build the fully-static site into ./out  (basePath defaults to /portfolio)
STATIC_EXPORT=true npm run build
# if your repo is NOT named "portfolio", override the path:
# STATIC_EXPORT=true BASE_PATH=/<your-repo-name> npm run build

# publish ./out to the gh-pages branch
npx gh-pages -d out
```

Then in **Settings → Pages** choose *Deploy from a branch → gh-pages / (root)*.
Site lands at `https://<user>.github.io/<repo-name>/`.

## Structure

| Route                | Content                                                    |
| -------------------- | ---------------------------------------------------------- |
| `/`                  | hero · about · experience · work · research · goals · skills · contact |
| `/projects`          | index of case files                                         |
| `/projects/[slug]`   | per-project case file (problem / built / impact / links)    |
| `/api/health`        | healthcheck (static-friendly)                               |

All content lives in `src/data/portfolio.ts` — edit that one file to update
projects, experience, publications, skills or goals.

## Theme

Dark by default, light/dark toggle in the nav (persisted in `localStorage`,
respects `prefers-reduced-motion` for every animation).
