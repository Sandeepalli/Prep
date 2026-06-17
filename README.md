# PrepDeck — Lead Frontend Interview Prep

An interactive, responsive single-page app to brush up for **Lead / Senior Frontend Engineer**
interviews at mid-to-large companies. Built with **React + Vite + Tailwind CSS**.

## Features

- **7 learning tracks** with expandable concept cards you can mark complete & bookmark:
  - JavaScript & TypeScript
  - React & UI Engineering
  - Web Platform & Performance
  - Frontend System Design (with case studies + trade-offs)
  - Node.js & Backend (BFF-focused)
  - Coding & DSA (patterns + curated problems, searchable/filterable)
  - Leadership & Behavioral (STAR + competencies + LLD, with a notes area for your stories)
- **Flashcards** with flip animation and **Leitner spaced-repetition** boxes.
- **Quizzes** with scoring, explanations, and saved best scores.
- **Code Playground** — write & run JavaScript in the browser with console output.
- **Progress tracking** — completion %, bookmarks, quiz scores, and STAR notes, all saved in
  `localStorage` (private to your browser, survives refresh).
- **Dark/light theme** toggle, fully responsive (mobile drawer nav → desktop sidebar).

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  components/   Layout, ConceptCard, ProgressRing, icons, etc.
  context/      ThemeContext + ProgressContext (localStorage persistence)
  data/         All content (per-track), flashcards, quizzes, progress registry
  pages/        Dashboard, track pages, flashcards, quizzes, playground
```

All interview content lives in `src/data/` — edit those files to add or tweak topics,
flashcards, quiz questions, and case studies. No code changes needed to add content.

## Deploying

The build is fully static (`dist/`). `vite.config.js` uses a relative `base` so it works on
GitHub Pages, Netlify, Vercel, or any static host. Routing uses `HashRouter`, so deep links
work without server config.
