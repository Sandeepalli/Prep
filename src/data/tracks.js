// Top-level learning tracks tuned for a Lead Frontend Engineer target.
// `group` drives the collapsible sidebar + dashboard sections.
export const tracks = [
  {
    id: 'javascript',
    title: 'JavaScript & TypeScript',
    icon: 'code',
    color: 'from-amber-400 to-amber-600',
    blurb: 'Closures, async, the event loop, prototypes, and a practical TS type system.',
    path: '/javascript',
    group: 'Frontend Core',
  },
  {
    id: 'react',
    title: 'React & UI Engineering',
    icon: 'chip',
    color: 'from-sky-400 to-brand-600',
    blurb: 'Hooks, reconciliation, concurrent rendering, effects, forms, SSR/RSC, and patterns.',
    path: '/react',
    group: 'Frontend Core',
  },
  {
    id: 'web-platform',
    title: 'Web Platform & Performance',
    icon: 'server',
    color: 'from-fuchsia-500 to-purple-700',
    blurb: 'Browser rendering, networking, Core Web Vitals, deep a11y, security, and modern CSS.',
    path: '/web-platform',
    group: 'Frontend Core',
  },
  {
    id: 'state-management',
    title: 'State Management',
    icon: 'layers',
    color: 'from-emerald-400 to-green-600',
    blurb: 'Server vs client state, React Query / RTK Query, Redux Toolkit, Zustand, Jotai, middleware, and URL state.',
    path: '/state-management',
    group: 'State & Data',
  },
  {
    id: 'testing',
    title: 'Testing & Quality',
    icon: 'beaker',
    color: 'from-teal-400 to-cyan-600',
    blurb: 'Testing trophy, RTL, Vitest, MSW, Playwright E2E, visual + a11y testing, and CI quality gates.',
    path: '/testing',
    group: 'Quality & Testing',
  },
  {
    id: 'system-design',
    title: 'Frontend System Design',
    icon: 'server',
    color: 'from-brand-500 to-brand-700',
    blurb: 'Design feeds, typeaheads, design systems, and large-scale UI architecture.',
    path: '/system-design',
    group: 'Architecture & Backend',
  },
  {
    id: 'nodejs',
    title: 'Node.js & Backend',
    icon: 'chip',
    color: 'from-accent-500 to-accent-600',
    blurb: 'Event loop, streams, the middleware pipeline, APIs, BFF pattern, and security.',
    path: '/nodejs',
    group: 'Architecture & Backend',
  },
  {
    id: 'coding',
    title: 'Coding & DSA',
    icon: 'code',
    color: 'from-teal-400 to-emerald-600',
    blurb: 'Patterns and curated problems with JS-friendly approaches and complexity.',
    path: '/coding',
    group: 'Interview Prep',
  },
  {
    id: 'behavioral',
    title: 'Leadership & Behavioral',
    icon: 'user',
    color: 'from-amber-500 to-orange-600',
    blurb: 'STAR stories, tech-lead signals, mentoring, influence, and cross-team impact.',
    path: '/behavioral',
    group: 'Interview Prep',
  },
]

// Distinct groups, preserving first-seen order from `tracks`.
export const trackGroups = tracks.reduce((acc, t) => {
  if (!acc.includes(t.group)) acc.push(t.group)
  return acc
}, [])
