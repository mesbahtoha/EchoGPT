# EchoGPT Redesign

A polished, production-quality redesign of the EchoGPT web app and Chrome side-panel extension — built as a frontend internship assignment for AppifyDevs.

## Overview

This monorepo contains two separate frontend applications sharing the same EchoGPT visual language:

- `web/` — EchoGPT desktop web app (Next.js)
- `extension/` — EchoGPT Chrome side-panel extension (React + Vite, Manifest V3)

Both use mock data only. No backend or real AI API is required. All chat, models, history, and settings interactions are simulated with local state.

## Features

### Web App

- 280px lavender sidebar with logo, New Chat, Engagement + Help & Support sections, PRO badges, bottom icon rail
- Sign-in header with mock auth modal
- Centered empty-state hero (“Hello There! 👋…”) with 4 clickable prompt cards
- Bottom composer with model selector, tool dividers, rocket/boost, plus-menu, history popover, attachment/mic/send
- Mock chat: send creates user + assistant messages, typing indicator, auto-scroll
- Recent chats popover, model dropdown, sidebar active states, mobile drawer
- Framer Motion entrance, hover, modal, and dropdown animations
- Fully responsive: drawer + 1-column cards + full-width composer on mobile

### Chrome Extension

- Compact side-panel layout: header + scrollable content + anchored composer + 60px right rail
- Header with Chat title, blue New Chat, history toggle
- Right rail: Chat, Write, Read, Translate, Image, Video, Compare, MCP + Upgrade, Settings, avatar
- Home grid of 7 quick-action cards + 3 horizontal suggested prompts
- Per-tool mock panels: Write tones, Translate languages, Read summarizer, Image gallery, Video storyboard, Compare columns, MCP toggles
- Composer with DeepSeek V4 Pro selector, 6 compact icons, Search button, Enter-to-send helper
- Settings modal (320–360px): avatar, name, Free badge, email, red Sign Out
- Model selector with 5 models, selected check, Escape/backdrop close
- No horizontal overflow; content scrolls, composer stays usable

## Tech Stack

**Web (`web/`):**

- Next.js 14, React 18, TypeScript
- Tailwind CSS 3, Lucide React, Framer Motion

**Extension (`extension/`):**

- React 18, TypeScript, Vite 5
- Tailwind CSS 3, Lucide React
- Chrome Manifest V3 + Side Panel API

## Project Structure

```text
./
  README.md
  web/
    app/
      layout.tsx
      page.tsx
      globals.css
    components/
      Sidebar.tsx
      SidebarItem.tsx
      Header.tsx
      Logo.tsx
      PromptCard.tsx
      Composer.tsx
      ModelSelector.tsx
      ToolButton.tsx
      ChatMessage.tsx
      SignInModal.tsx
      RecentChats.tsx
    lib/
      models.ts
      prompts.ts
      sidebarItems.ts
      conversations.ts
      user.ts
      cn.ts
  extension/
    public/
      manifest.json
    index.html
    src/
      App.tsx
      main.tsx
      index.css
      components/
        ExtensionHeader.tsx
        RightRail.tsx
        QuickActionCard.tsx
        SuggestedPrompt.tsx
        ExtensionComposer.tsx
        ExtensionModelSelector.tsx
        SettingsModal.tsx
        ToolPanel.tsx
      lib/
        models.ts
        tools.ts
        user.ts
        cn.ts
```

## Running the Web App

1. Open web directory
2. Install dependencies
3. Run dev server
4. Build for production

```powershell
Set-Location web
npm install
npm run dev
# open http://localhost:3000
npm run build
```

Typecheck:

```powershell
npm run typecheck
```

## Running the Extension

1. Open extension directory
2. Install dependencies
3. Build the extension
4. Open chrome://extensions
5. Enable Developer Mode
6. Click Load unpacked
7. Select the extension/dist folder

```powershell
Set-Location extension
npm install
npm run build
# dist/ is the unpacked extension
npm run dev  # optional panel preview at http://localhost:5173
```

The build copies `public/manifest.json` into `dist/` automatically. `side_panel.default_path` and `action.default_popup` both point to `index.html`.

## Design Decisions

- Lavender sidebar (`#f7f5ff`), white cards, 10–16px radii, soft violet shadows — matches reference while staying clean
- Inter for both apps; 13–15px body, semibold headings, slate muted text
- Reusable data arrays (`sidebarItems`, `promptCards`, `quickTools`, `extensionModels`) instead of duplicated JSX
- Small typed components (`SidebarItem`, `ToolButton`, `PromptCard`, `QuickActionCard`) for reuse and a11y
- Framer Motion only for entrance, cards, modals, dropdowns — no noisy animation
- Mock-first: `mockAssistantReply()` / `mockExtReply()` branch on keywords so the demo feels alive without an API

## Assumptions

- Reference screenshots are the source of truth for layout, not pixel-exact Figma
- Mock auth/user (`Alex Morgan`, Free plan) is acceptable; no real login
- Extension icons in `manifest.json` omitted intentionally to avoid binary assets; Chrome loads without them
- No backend, persistence, or analytics — state resets on reload

## Future Improvements

- Persist chats + settings to `chrome.storage` / localStorage
- Real streaming chat API with model routing
- Image/video generation previews and compare diff view
- Command palette, keyboard shortcuts, i18n
- Extension icons, screenshots, and Chrome Web Store listing assets
- Playwright + Vitest coverage, CI builds for `web` and `extension`
