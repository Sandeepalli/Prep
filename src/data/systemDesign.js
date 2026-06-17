// FRONTEND system design fundamentals + case studies for lead frontend interviews.

export const fundamentals = [
  {
    id: 'sd-fund-framework',
    title: 'A Framework for Frontend System Design',
    tags: ['fundamentals'],
    summary:
      'Frontend system design interviews assess how you architect a non-trivial UI feature end to end: requirements, API/data contract, component architecture, state, performance, and edge cases.',
    points: [
      'Clarify requirements (functional + non-functional: performance, a11y, devices, i18n).',
      'Define the data model and API contract (REST/GraphQL, pagination shape, errors).',
      'Design component hierarchy and where state lives (local, lifted, store, server cache).',
      'Address performance, accessibility, error/empty/loading states, and offline.',
    ],
  },
  {
    id: 'sd-fund-component-arch',
    title: 'Component Architecture at Scale',
    tags: ['fundamentals', 'architecture'],
    summary:
      'Large frontends need clear boundaries: presentational vs container, shared design system, feature modules, and a sensible dependency direction.',
    points: [
      'Layer: design system (primitives) → shared components → feature modules → pages.',
      'Keep dependencies pointing one way; avoid feature-to-feature coupling.',
      'Co-locate code by feature; share via well-defined packages, not deep imports.',
    ],
  },
  {
    id: 'sd-fund-state-arch',
    title: 'State & Data Architecture',
    tags: ['fundamentals', 'state'],
    summary:
      'Separate server state (cached, async) from client/UI state. Most scaling pain comes from conflating them.',
    points: [
      'Server cache layer (React Query/SWR/Apollo) handles fetching, caching, revalidation.',
      'Normalize entities to avoid duplication and stale copies across views.',
      'Optimistic updates + rollback for snappy mutations; reconcile with server truth.',
    ],
  },
  {
    id: 'sd-fund-perf-budget',
    title: 'Performance Budgets & Monitoring',
    tags: ['fundamentals', 'performance'],
    summary:
      'Leads set and enforce performance budgets and observe real-user metrics (RUM), not just lab scores.',
    points: [
      'Budget bundle size and Core Web Vitals; fail CI when budgets regress.',
      'RUM (real user monitoring) for field data; synthetic tests for regressions.',
      'Track long tasks, hydration cost, and route-level bundle growth.',
    ],
  },
  {
    id: 'sd-fund-microfrontends',
    title: 'Micro-frontends & Module Federation',
    tags: ['fundamentals', 'architecture'],
    summary:
      'Split a large app so independent teams ship independently. Powerful but adds integration, versioning, and consistency costs.',
    points: [
      'Approaches: route-based composition, iframe isolation, Module Federation (runtime).',
      'Shared design system + shared deps (singletons like React) to avoid bloat/conflicts.',
      'Trade-off: team autonomy vs bundle duplication, version skew, and UX consistency.',
    ],
  },
]

export const caseStudies = [
  {
    id: 'sd-case-typeahead',
    title: 'Design an Autocomplete / Typeahead',
    difficulty: 'Core',
    tags: ['case study'],
    prompt: 'Design a search input that suggests results as the user types (like Google search box).',
    requirements: {
      functional: ['Suggestions on input', 'Keyboard navigation', 'Highlight matches', 'Recent/cached results'],
      nonFunctional: ['Low latency / no jank', 'Accessible (combobox ARIA)', 'Resilient to slow/failed requests'],
    },
    steps: [
      'Debounce input (~150–300ms) to avoid a request per keystroke.',
      'Cancel stale in-flight requests (AbortController) so older responses can’t overwrite newer ones (race conditions).',
      'Cache results per query (LRU/map) to make repeated/prefix queries instant.',
      'Render with virtualization if the list is large; keyboard a11y via combobox/listbox ARIA roles.',
      'Handle loading, empty, error states; show recent searches when input is empty.',
    ],
    tradeoffs: [
      'Client-side caching speeds UX but can show stale results — add TTL.',
      'Prefix-tree on the client vs server search: client is instant but limited; server scales.',
      'Debounce delay trades responsiveness vs request volume.',
    ],
  },
  {
    id: 'sd-case-feed',
    title: 'Design an Infinite Scroll News Feed',
    difficulty: 'Core',
    tags: ['case study'],
    prompt: 'Design a performant, infinitely scrolling feed (Twitter/Facebook timeline) on the client.',
    requirements: {
      functional: ['Infinite pagination', 'Like/comment interactions', 'Media (images/video)', 'New-post indicator'],
      nonFunctional: ['Smooth scroll (60fps)', 'Low memory on long sessions', 'Resilient pagination', 'Accessible'],
    },
    steps: [
      'Pagination: cursor-based (not offset) to avoid duplicates/skips as the feed changes.',
      'Load more via IntersectionObserver sentinel near the bottom (not scroll listeners).',
      'Virtualize/window the list so DOM nodes stay bounded on long sessions (memory).',
      'Cache pages in a normalized store; optimistic UI for likes; lazy-load media.',
      'Handle errors per page (retry), empty state, and a “new posts” pill for fresh data.',
    ],
    tradeoffs: [
      'Virtualization complicates variable-height items and accessibility/focus.',
      'Cursor pagination is robust but harder to jump to arbitrary pages.',
      'Optimistic updates need rollback on failure.',
    ],
  },
  {
    id: 'sd-case-designsystem',
    title: 'Design a Component Library / Design System',
    difficulty: 'Advanced',
    tags: ['case study'],
    prompt: 'Design a reusable, themeable, accessible component library used across many teams.',
    requirements: {
      functional: ['Reusable primitives', 'Theming/tokens', 'Accessibility built-in', 'Documentation'],
      nonFunctional: ['Versioning & backwards compat', 'Tree-shakeable', 'Framework-agnostic-ish', 'DX'],
    },
    steps: [
      'Design tokens (color/spacing/type) as the single source of truth; theme via CSS variables.',
      'Build accessible, composable primitives (compound components, controlled/uncontrolled).',
      'Distribution: tree-shakeable ESM, semver, changelogs, codemods for breaking changes.',
      'Docs + live playground (Storybook); visual regression + a11y tests in CI.',
      'Governance: contribution model, deprecation policy, adoption metrics.',
    ],
    tradeoffs: [
      'Flexibility (many props) vs consistency (opinionated components).',
      'CSS-in-JS (dynamic theming, runtime cost) vs zero-runtime (CSS vars/modules).',
      'Monorepo (atomic changes) vs multi-repo (team autonomy).',
    ],
  },
  {
    id: 'sd-case-collab',
    title: 'Design a Realtime Collaborative Editor (Google Docs)',
    difficulty: 'Advanced',
    tags: ['case study'],
    prompt: 'Design the client for multi-user realtime editing with cursors and conflict resolution.',
    requirements: {
      functional: ['Concurrent editing', 'Live cursors/presence', 'Offline edits', 'Undo/redo'],
      nonFunctional: ['Low latency', 'Conflict-free merges', 'Consistency across clients'],
    },
    steps: [
      'Transport: WebSocket for low-latency bidirectional sync; fall back to polling.',
      'Conflict resolution: CRDTs (e.g. Yjs) or Operational Transform to merge concurrent edits.',
      'Local-first: apply edits locally, sync in background; queue ops while offline.',
      'Presence: broadcast cursor/selection with throttling; show avatars.',
      'Persist document + version history server-side; debounce snapshots.',
    ],
    tradeoffs: [
      'CRDTs simpler to reason about but larger metadata; OT smaller but complex server logic.',
      'Local-first improves UX but complicates conflict handling and history.',
    ],
  },
  {
    id: 'sd-case-dashboard',
    title: 'Design a Data-Heavy Analytics Dashboard',
    difficulty: 'Core',
    tags: ['case study'],
    prompt: 'Design a dashboard with many widgets, large datasets, filters, and live updates.',
    requirements: {
      functional: ['Many chart widgets', 'Global + per-widget filters', 'Live/streaming data', 'Export'],
      nonFunctional: ['Fast initial load', 'Smooth interactions', 'Bounded memory', 'Resilient widgets'],
    },
    steps: [
      'Lazy-load widgets (code-split + on-viewport); skeleton loaders per widget.',
      'Parallelize independent widget requests; share filter state via URL + store.',
      'Aggregate/downsample large datasets server-side; paginate or window big tables.',
      'Live data via WebSocket/SSE with throttled UI updates; isolate widget failures (error boundaries).',
      'Memoize expensive chart computations; use canvas/WebGL for very large series.',
    ],
    tradeoffs: [
      'Client aggregation (flexible) vs server aggregation (scales) — usually server for big data.',
      'Polling (simple) vs WebSocket/SSE (efficient, more infra) for live updates.',
    ],
  },
]

export const sdChecklist = [
  'Clarify functional + non-functional requirements (perf, a11y, devices, i18n)',
  'Define the data model and API/contract (pagination, errors)',
  'Design the component hierarchy and decide where each piece of state lives',
  'Plan data fetching: caching, revalidation, optimistic updates, race handling',
  'Address performance: bundle splitting, virtualization, memoization, images',
  'Cover loading / empty / error states and accessibility',
  'Discuss trade-offs, failure modes, and how you would measure success',
]
