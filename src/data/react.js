// React & UI engineering content for senior/lead frontend interviews.

export const sections = [
  {
    id: 'react-sec-core',
    title: 'Core Model',
    items: [
      {
        id: 'react-reconciliation',
        title: 'Virtual DOM & Reconciliation',
        tags: ['core'],
        summary:
          'React builds a virtual tree, diffs it against the previous one, and applies the minimal real-DOM mutations. Keys and component type drive the diffing heuristics.',
        points: [
          'Same type → reuse + update props; different type → unmount + remount subtree.',
          'Keys give list items stable identity; index keys cause bugs on reorder/insert.',
          'Fiber enables interruptible, prioritized rendering (concurrent features).',
        ],
      },
      {
        id: 'react-rendering',
        title: 'Render Behavior & Re-renders',
        tags: ['core', 'performance'],
        summary:
          'A component re-renders when its state changes, its parent re-renders, or context it consumes changes. Re-render ≠ DOM update, but it still costs CPU.',
        points: [
          'State up the tree re-renders everything below unless memoized.',
          'Lift state only as high as needed; colocate state to limit blast radius.',
          'Context value changes re-render all consumers — split contexts or memoize the value.',
        ],
      },
      {
        id: 'react-hooks-rules',
        title: 'Hooks Rules & Mental Model',
        tags: ['core'],
        summary:
          'Hooks must be called in the same order every render (top level, not in conditions/loops). They attach state to a component instance by call order.',
        points: [
          'useState, useReducer (complex/related state), useRef (mutable, no re-render).',
          'useEffect runs after paint; useLayoutEffect runs before paint (measure/sync DOM).',
          'Dependency arrays: missing deps = stale closures; over-specifying = extra runs.',
        ],
      },
    ],
  },
  {
    id: 'react-sec-perf',
    title: 'Performance',
    items: [
      {
        id: 'react-memo',
        title: 'memo, useMemo, useCallback',
        tags: ['performance'],
        summary:
          'Memoization avoids unnecessary work and re-renders — but it has a cost. Apply it where profiling shows a real problem.',
        points: [
          'React.memo skips re-render if props are shallow-equal; pair with stable callbacks.',
          'useMemo caches expensive computations; useCallback caches function identity.',
          'Premature memoization adds complexity + memory; measure first (Profiler).',
        ],
      },
      {
        id: 'react-virtualization',
        title: 'List Virtualization & Code Splitting',
        tags: ['performance'],
        summary:
          'Render only what is visible and ship only what is needed. Core techniques for large, fast apps.',
        points: [
          'Windowing (react-window/virtuoso) renders visible rows for huge lists.',
          'React.lazy + Suspense + dynamic import() split bundles by route/feature.',
          'Defer non-critical work: useTransition, startTransition for low-priority updates.',
        ],
      },
    ],
  },
  {
    id: 'react-sec-state',
    title: 'State & Data',
    items: [
      {
        id: 'react-state-mgmt',
        title: 'State Management Choices',
        tags: ['state'],
        summary:
          'Match the tool to the kind of state: local, shared/global, server, or URL. Most apps over-reach for a global store.',
        points: [
          'Server state (caching, revalidation): React Query / SWR — not Redux.',
          'Global UI state: Zustand/Jotai (light) or Redux Toolkit (large, structured).',
          'URL is state too — keep filters/pagination in the query string for shareability.',
        ],
      },
      {
        id: 'react-data-fetching',
        title: 'Data Fetching & Suspense',
        tags: ['state'],
        summary:
          'Handle loading, error, empty, and success explicitly. Avoid waterfalls; prefetch and parallelize.',
        points: [
          'Cache + dedupe requests; show stale-while-revalidate for snappy UX.',
          'Avoid request waterfalls (sequential awaits/nested components); hoist or parallelize.',
          'Suspense + error boundaries give declarative loading/error UI.',
        ],
      },
    ],
  },
  {
    id: 'react-sec-quality',
    title: 'Quality & Patterns',
    items: [
      {
        id: 'react-patterns',
        title: 'Component Patterns',
        tags: ['patterns'],
        summary:
          'Composition patterns keep components reusable and testable. Lead engineers are expected to set these conventions.',
        points: [
          'Compound components (context-driven), render props, custom hooks for logic reuse.',
          'Controlled vs uncontrolled inputs; prefer controlled for predictable forms.',
          'Keep components presentational where possible; push logic into hooks.',
        ],
      },
      {
        id: 'react-testing',
        title: 'Testing Strategy',
        tags: ['quality'],
        summary:
          'Test behavior, not implementation. The testing trophy favors many integration tests over brittle unit tests.',
        points: [
          'React Testing Library: query by role/text, assert user-visible behavior.',
          'Mock the network (MSW), not internal modules; avoid testing internals.',
          'E2E (Playwright/Cypress) for critical flows; visual regression for design systems.',
        ],
      },
    ],
  },
]

export const reactTips = [
  'Be able to explain WHY a component re-renders and how you would fix an extra render.',
  'Know when NOT to reach for useMemo/useCallback or a global store.',
  'Discuss accessibility, error boundaries, and Suspense — lead-level breadth.',
]
