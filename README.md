# EchoGPT — Web App, Landing Page & Chrome Extension

A polished, production-quality EchoGPT frontend monorepo: a Next.js web app (chat workspace, studios, subscriptions, landing page, login), plus a React + Vite Chrome side-panel extension. Built with TypeScript, Tailwind CSS, Lucide icons, and Framer Motion.

## Repository

```text
./
  README.md
  web/                    # Next.js 14 web app (App Router)
    app/
      page.tsx            # Home / chat workspace
      landing/page.tsx    # Marketing landing page
      login/page.tsx      # Login page (echogpt.live/login design)
      image-studio/ video-studio/ compare/ history/ store/
      tasks/ resume/ sop/ connectors/ support/ newsletter/ subscriptions/
      layout.tsx          # Inter font, theme init, Theme + Motion providers
      globals.css         # Design tokens, focus states, cyber accent layer
    components/           # Sidebar, Header, Composer, modals, drawers,
                          # LoginCard, PlanCard, BrandIcons, ModelSelector…
    lib/                  # routes, sidebarItems, plans, store, tasks,
                          # models, links, motion tokens, conversations…
    public/               # logo.svg, landing/ preview screenshots
  extension/              # Chrome MV3 side-panel (React + Vite)
    src/
      App.tsx             # Popup root (chat / history views)
      components/         # RightRail, Composer, ModelSelector, ToolPanel,
                          # Write/Read/Translate/Image/Video/Compare/
                          # Connectors panels, HistoryView, SettingsModal…
      lib/                # tools, models, history, user, cn
    public/               # manifest.json, icons, background.js
```

## Features

### Web app
- Lavender sidebar (284px desktop): logo + wordmark, New Chat, Engagement + Help & Support sections, PRO badges, bottom rail (landing link, share, settings, theme toggle)
- Home chat workspace: hero greeting, 4 prompt cards, bottom composer (model selector, tool buttons, attach menu, history drawer, voice/send), mock chat with typing indicator, mobile-compact composer
- Studios & tools: Image/Video studios with model-picker modal, Compare (Compare/Focus modes), Connectors, History page, Store (real brand logos), AI Tasks (Ideas/Work/Fun/Online Content), Resume + Job-history drawer, SOP builder + history status card
- Subscriptions: the 4 real plans (Monthly/Quarterly/Half-Yearly/Annual) with benefit rows, model lists, brand icons, FAQ accordion
- Login: `/login` page matching the reference (social buttons,decorative background) + matching sign-in modal
- Landing page (`/landing`): nav with scroll-spy + mobile menu + theme toggle, hero with glitch headline + app preview, Features, AI Models, real product screenshots, Why, real plan pricing, Testimonials, FAQ, CTA, footer
- Share + Settings modals, Job-history drawer, global light/dark mode, standardized open/close motion with reduced-motion support

### Chrome extension
- Side-panel popup: header, chat view, history view, anchored composer, 60px right rail (Chat, Write, Read, Translate, Image, Video, Compare, MCP, Upgrade, Settings, avatar)
- 7 tool panels, model selector dropdown, conversation search, connector manager, settings modal
- Enter/exit + dropdown animations, message slide-ins, hover-lift cards (all `prefers-reduced-motion` safe)

## Tech stack

- **Web:** Next.js 14 (App Router), React 18, TypeScript (strict), Tailwind CSS 3, Framer Motion 11, Lucide React
- **Extension:** React 18, TypeScript, Vite 5, Tailwind CSS 3, Lucide React, Chrome Manifest V3 + Side Panel API

## Getting started

### Web app

```powershell
Set-Location web
npm install
npm run dev      # http://localhost:3000
npm run typecheck
npm run build    # production build
```

### Chrome extension

```powershell
Set-Location extension
npm install
npm run typecheck
npm run build    # outputs dist/
# chrome://extensions → Developer Mode → Load unpacked → select dist/
npm run dev      # optional panel preview at http://localhost:5173
```

### Deploy to Vercel (monorepo: 2 projects, 1 GitHub repo)

This repo holds **two deployable apps**. Create **two Vercel projects** from the same GitHub repo:

**Project 1 — Web app (Next.js)**
1. Vercel → Add New → Project → Import this repo.
2. Set **Root Directory** to `web` (Framework Preset auto-detects **Next.js** via `web/vercel.json`).
3. Build Command `npm run build`, Install Command `npm install` (defaults — already pinned in `web/vercel.json`).
4. No Environment Variables required (mock data only). Deploy.

**Project 2 — Extension demo (Vite static preview)**
1. Vercel → Add New → Project → Import the **same** repo again.
2. Set **Root Directory** to `extension` (Preset auto-detects **Vite** via `extension/vercel.json`).
3. Build Command `npm run build`, Output Directory `dist`. SPA fallback (`/(.*)` → `/index.html`) is already configured.
4. Deploy. This hosts the side-panel UI as a browsable demo — the real Chrome extension is still installed via `extension/dist/` (see above).

Notes:
- `node >= 18.17` is pinned in both `package.json` files via `engines`.
- `extension_dist.zip`, `*/dist`, `web/.next`, `web/screenshoot/`, and `.vercel/` are ignored by `.gitignore` / `.vercelignore` — they are never pushed or uploaded.
- Vercel CLI alternative: `vercel --cwd web` for the app, `vercel --cwd extension` for the demo.

## Design decisions

- Single purple brand system (`brand 50–900`), Inter everywhere, shared motion tokens (`lib/motion.ts`: backdrop/modal/drawer/dropdown/accordion) so every overlay moves identically
- Data-driven UI: `sidebarItems`, `promptCards`, `storeApps`, `taskCards`, `plans`, `imageModelGroups` instead of duplicated JSX
- Shared building blocks: `PlanCard` (subscriptions + landing), `LoginCard` (login page + modal), `BrandIcons` (official brand SVGs), `ModelMark` glyph rendering
- Central external links in `lib/links.ts`
- Accessibility: labeled icon buttons, dialog/drawer semantics, listbox patterns, Escape-to-close, focus trap + return focus, skip-link on landing, visible focus rings

## Demo scope (honest disclosure)

No backend or API keys are used — everything below is simulated with local state and resets on reload:

- Auth (login modal/page, subscribe buttons), newsletter signup
- Chat replies (`mockAssistantReply`), extension replies (`mockExtReply`), history/conversations lists
- Generate/Analyze/Compare/Try-App/template actions show a "demo" toast instead of calling a model
- Image/Video studios, SOP history error state, and empty states are static showcases

## Assumptions

- Reference screenshots are the source of truth for layout (light mode first, dark mode supported throughout the web app; the extension is light-only by design for now — dark mode is on the roadmap)
- The Telegram share target is the provided community invite URL (`lib/links.ts`)
- No persistence, analytics, or accounts — state resets on reload

## Future improvements

- Persist chats + settings (`localStorage` / `chrome.storage`)
- Real streaming chat API with model routing; real image/video generation
- `next/image` rollout to remaining raw `<img>` usages
- Playwright + Vitest coverage, CI builds for `web` and `extension`
