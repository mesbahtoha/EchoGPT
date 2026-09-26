# EchoGPT — Web App, Landing Page & Chrome Side-Panel Extension

A polished frontend implementation of the **EchoGPT ecosystem**, built as a recruiter-ready submission for the **Software Engineering Internship (Frontend) — Onsite** assignment at **AppifyDevs**.

The project includes:

- A responsive **Next.js web application** with chat workspace, tools/studios, subscriptions, login, history, tasks, and supporting flows.
- A modern **single-page EchoGPT landing page** designed to present the product and guide users toward the web app and extension.
- A **React + Vite Chrome Manifest V3 side-panel extension** with chat, history, AI tools, model selection, connectors, settings, and upgrade flows.
- A consistent design system with reusable components, responsive layouts, smooth motion, accessibility considerations, and light/dark theme support across the web experience.

> **Demo note:** This submission is a frontend-focused implementation. Authentication, AI responses, subscriptions, generation tools, and other backend-dependent behaviors are intentionally simulated with local state for demonstration purposes.

---

## 🔗 Live Demos

| Experience | Live Demo |
|---|---|
| 🌐 EchoGPT Web App | **https://exhogpt-web.vercel.app/** |
| 🎨 EchoGPT Landing Page | **https://exhogpt-web.vercel.app/landing** |
| 🧩 EchoGPT Chrome Extension Demo | **https://echogpt-extension.vercel.app/** |

### Recommended review flow

1. Open the **Web App / Landing Page** to review the overall product experience.
2. Explore the **Chrome Extension Demo** to preview the side-panel UI directly in the browser.
3. For the full Chrome extension experience, follow the installation instructions below using the provided `extension_dist.zip` package.

---

## 🧩 Chrome Extension

The production-ready Chrome extension package is available as:

```text
extension_dist.zip
```

in the repository root.

### Install and run the extension locally

1. Download **`extension_dist.zip`** from this repository.
2. Extract the ZIP file to a location on your computer.
3. Open Google Chrome and navigate to:

   ```text
   chrome://extensions
   ```

4. Enable **Developer mode** from the top-right corner.
5. Click **Load unpacked**.
6. Select the extracted extension folder that directly contains:

   ```text
   manifest.json
   ```

7. Chrome will load the EchoGPT extension.
8. Open EchoGPT from the **Chrome Side Panel** and start exploring the interface.

> **Important:** The folder selected through **Load unpacked** must directly contain `manifest.json`.

### Expected package structure

```text
extension_dist.zip
└── <extracted-extension-folder>/
    ├── manifest.json
    ├── sidepanel.html
    ├── background.js
    ├── assets/
    └── icons/
```

---

## ✨ Key Features

### Web App

- Modern EchoGPT chat workspace with responsive desktop and mobile layouts.
- Reusable sidebar, header, composer, model selector, dialogs, drawers, and cards.
- Prompt cards and quick-start workflows.
- Image Studio and Video Studio interfaces with model selection.
- Compare / Focus workflows.
- Connectors and connector-management UI.
- Conversation history and search flows.
- AI Tasks with Ideas, Work, Fun, and Online Content categories.
- Resume builder and job-history workflow.
- SOP builder with history/status presentation.
- Store experience with real brand-style visual assets.
- Subscription page covering Monthly, Quarterly, Half-Yearly, and Annual plans.
- Login page and matching sign-in modal.
- Share and Settings flows.
- Global light/dark theme support with consistent UI behavior.
- Responsive landing page with navigation, mobile menu, hero section, product previews, features, AI models, pricing, FAQ, CTA, and footer.

### Chrome Side-Panel Extension

- Chrome Manifest V3 side-panel experience.
- Chat and conversation history views.
- Right-side quick-action rail.
- Write, Read, Translate, Image, Video, Compare, MCP, Upgrade, and Settings entry points.
- AI model selector.
- Conversation search.
- Connector manager.
- Settings modal.
- Smooth view transitions, dropdown animations, message slide-ins, and hover interactions.
- Reduced-motion support through `prefers-reduced-motion` considerations.

---

## 🛠️ Technology Stack

### Web

- **Next.js 14** — App Router
- **React 18**
- **TypeScript** — strict mode
- **Tailwind CSS 3**
- **Framer Motion 11**
- **Lucide React**

### Chrome Extension

- **React 18**
- **TypeScript**
- **Vite 5**
- **Tailwind CSS 3**
- **Lucide React**
- **Chrome Manifest V3**
- **Chrome Side Panel API**

---

## 📁 Repository Structure

```text
./
├── README.md
├── extension_dist.zip       # Production extension package for local installation
│
├── web/                     # Next.js 14 web application
│   ├── app/
│   │   ├── page.tsx         # Home / chat workspace
│   │   ├── landing/
│   │   ├── login/
│   │   ├── image-studio/
│   │   ├── video-studio/
│   │   ├── compare/
│   │   ├── history/
│   │   ├── store/
│   │   ├── tasks/
│   │   ├── resume/
│   │   ├── sop/
│   │   ├── connectors/
│   │   ├── support/
│   │   ├── newsletter/
│   │   ├── subscriptions/
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── components/
│   ├── lib/
│   └── public/
│
└── extension/               # React + Vite Chrome side-panel extension
    ├── src/
    │   ├── App.tsx
    │   ├── components/
    │   └── lib/
    └── public/
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.17+**
- **npm**
- **Google Chrome** for extension testing

### Web App

```powershell
Set-Location web
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

Useful commands:

```powershell
npm run typecheck
npm run build
```

### Chrome Extension

```powershell
Set-Location extension
npm install
npm run typecheck
npm run build
```

The production extension build is generated in:

```text
extension/dist/
```

For local Chrome testing:

```text
chrome://extensions
→ Developer mode
→ Load unpacked
→ select extension/dist/
```

Optional Vite preview:

```powershell
npm run dev
```

---

## ☁️ Deployment

This repository is structured as a small monorepo with two independently deployable frontend experiences.

### Vercel — Web App

- Import the GitHub repository into Vercel.
- Set **Root Directory** to `web`.
- Framework: **Next.js**.
- Build command: `npm run build`.
- Install command: `npm install`.

### Vercel — Extension Demo

- Import the same GitHub repository into Vercel as a second project.
- Set **Root Directory** to `extension`.
- Framework: **Vite**.
- Build command: `npm run build`.
- Output directory: `dist`.

> The Vercel extension deployment is a **browser-based UI demo** of the side-panel experience. The actual Chrome extension is installed through the packaged `extension_dist.zip` or the generated `extension/dist/` folder.

---

## 🎨 Design & UX Decisions

- Consistent purple-first brand system and reusable design tokens.
- Inter typography across the web experience.
- Data-driven UI patterns to reduce duplicated JSX and make screens easier to extend.
- Shared components such as `PlanCard`, `LoginCard`, `BrandIcons`, and reusable model/UI primitives.
- Centralized external links through `lib/links.ts`.
- Shared Framer Motion tokens for modal, drawer, dropdown, accordion, and backdrop transitions.
- Responsive behavior across desktop, tablet, and mobile breakpoints.
- Hover-lift interactions, smooth transitions, subtle shadows, and modern micro-interactions.
- Accessible interaction patterns including labeled icon buttons, dialog semantics, listbox behavior, Escape-to-close, focus handling, skip links, and visible focus states.
- Reduced-motion considerations through `prefers-reduced-motion` support.

---

## 🧪 Demo Scope & Honest Disclosure

This assignment focuses on frontend implementation and product experience. No backend service or private API key is required to review the submission.

The following areas are intentionally simulated:

- Authentication and login flows.
- Subscription and purchase actions.
- Chat responses using local/mock data.
- Extension responses using local/mock data.
- Generate / Analyze / Compare / Try App actions.
- Image and video generation workflows.
- Newsletter submission.
- Connector-related interactions.
- Some history, empty, loading, and error states.

Application state is primarily local and resets on reload where applicable.

---

## ♿ Accessibility & Performance Considerations

- Semantic interactive elements where appropriate.
- Visible keyboard focus states.
- Accessible labels for icon-only controls.
- Keyboard-friendly dialogs and menus.
- Escape-to-close behavior for overlays.
- Focus management for dialogs and drawers.
- Reduced-motion handling.
- Component reuse and data-driven rendering to reduce unnecessary duplication.
- Production builds verified through TypeScript checks and framework build commands.

---

## 📌 Assumptions

- The provided EchoGPT product experience and reference materials were treated as the visual and functional source of truth for the redesign.
- The implementation prioritizes frontend architecture and UI/UX because the assignment does not require a backend implementation.
- Product data, pricing, AI responses, and certain interaction outcomes are represented as mock/demo content where live services were not available.
- The web app supports light and dark themes; the Chrome extension currently focuses on its light visual system.

---

## 🔮 Future Improvements

With a production backend, the next iteration could include:

- Persistent conversations and preferences using `localStorage` / `chrome.storage` where appropriate.
- Real-time streaming AI responses with model routing.
- Real image/video generation APIs.
- Persistent authentication and account management.
- Real subscription and payment integration.
- Production connector integrations.
- Automated Playwright/Vitest coverage.
- CI pipelines for web and extension builds.
- Further optimization of image loading and remaining raw `<img>` usage.

---

## 📬 Assignment Context

This project was completed as part of the **Software Engineering Internship (Frontend) — Onsite** practical assignment for **AppifyDevs**.

The implementation addresses the requested areas:

- EchoGPT web app redesign.
- Single-page landing page.
- Chrome extension UI redesign.
- Responsive design.
- Reusable frontend architecture.
- Modern UI/UX and motion.
- Accessibility considerations.
- TypeScript-based implementation.

---

## 👋 Review Notes

For the fastest review, start with the live demos:

- **Web:** https://exhogpt-web.vercel.app/
- **Landing Page:** https://exhogpt-web.vercel.app/landing
- **Extension Demo:** https://echogpt-extension.vercel.app/

For the actual Chrome Side Panel experience, download `extension_dist.zip` from the repository root and follow the installation steps above.

Thank you for reviewing the project.
