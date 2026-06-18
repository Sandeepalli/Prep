// React & UI engineering content for senior/lead frontend interviews.
// Rich items support: summary, points, code, codeLang, gotcha, interviewer.

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
        code: `// Changing the key forces a remount (fresh state) — useful to reset a component
<Profile key={userId} />   // new userId → old Profile unmounts, new one mounts`,
        codeLang: 'jsx',
        interviewer:
          'They probe whether you understand keys are about identity, not just "silencing the warning". Explain the reorder bug with index keys.',
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
          'Passing children as props lets a parent re-render without re-rendering them.',
        ],
        gotcha:
          'A parent re-render re-renders all children even if their props are unchanged — unless they are wrapped in React.memo or passed through as `children`.',
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
        gotcha:
          'Calling a hook inside a condition or after an early return shifts hook order between renders and corrupts state — this is what the rules-of-hooks lint rule guards.',
      },
    ],
  },
  {
    id: 'react-sec-effects',
    title: 'Effects, Refs & Escape Hatches',
    items: [
      {
        id: 'react-effects-deep',
        title: 'useEffect Deep Dive',
        tags: ['effects', 'core'],
        summary:
          'Effects synchronize your component with an external system (network, subscriptions, DOM). The mental model is "synchronize", not "run on mount" — and many effects should not exist at all.',
        points: [
          'Cleanup runs before the next effect and on unmount — unsubscribe/cancel there.',
          'You often do NOT need an effect: derive during render, or handle in events.',
          'Guard fetches against races: ignore stale responses or use AbortController.',
        ],
        code: `useEffect(() => {
  let active = true
  fetchUser(id).then(u => { if (active) setUser(u) })
  return () => { active = false }   // ignore stale response on id change/unmount
}, [id])`,
        codeLang: 'jsx',
        gotcha:
          'Without the cleanup flag, a slow response for an old `id` can overwrite the newer one — the classic fetch race condition.',
        interviewer:
          '"When do you NOT need useEffect?" is a modern favourite. Strong answers: transforming data for render, resetting state via key, and handling user events.',
      },
      {
        id: 'react-refs',
        title: 'Refs, forwardRef & useImperativeHandle',
        tags: ['effects', 'patterns'],
        summary:
          'useRef holds a mutable value that persists across renders without causing one — for DOM nodes and instance-like values. forwardRef passes a ref through a component; useImperativeHandle exposes a controlled API.',
        points: [
          'useRef for DOM access (focus, measure) and mutable values (timers, latest value).',
          'Mutating ref.current does NOT trigger a re-render (that is the point).',
          'Expose a minimal imperative API (focus/scrollTo) rather than the raw node.',
        ],
        code: `const Input = forwardRef((props, ref) => {
  const inner = useRef(null)
  useImperativeHandle(ref, () => ({ focus: () => inner.current.focus() }))
  return <input ref={inner} {...props} />
})`,
        codeLang: 'jsx',
      },
      {
        id: 'react-portals',
        title: 'Portals',
        tags: ['patterns'],
        summary:
          'createPortal renders children into a different DOM node (e.g. document.body) while keeping them in the React tree — so context and events still flow normally. Essential for modals, tooltips, and toasts.',
        points: [
          'Escapes parent overflow:hidden / z-index / stacking-context traps.',
          'Events still bubble through the React tree, not the DOM tree — handy and surprising.',
          'Pair with focus management + a11y (role="dialog", focus trap) for modals.',
        ],
        code: `function Modal({ children }) {
  return createPortal(
    <div role="dialog" aria-modal="true">{children}</div>,
    document.body
  )
}`,
        codeLang: 'jsx',
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
        gotcha:
          'React.memo is defeated the moment you pass it a new inline object/array/function prop — memoize those references too, or the wrapper does nothing.',
        interviewer:
          'They want to hear "measure first". Reflexively wrapping everything in useMemo/useCallback signals cargo-culting, not understanding.',
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
        code: `const Settings = lazy(() => import('./Settings'))

<Suspense fallback={<Spinner />}>
  <Settings />
</Suspense>`,
        codeLang: 'jsx',
      },
    ],
  },
  {
    id: 'react-sec-concurrent',
    title: 'Concurrent React',
    items: [
      {
        id: 'react-transitions',
        title: 'useTransition & useDeferredValue',
        tags: ['concurrent', 'performance'],
        summary:
          'Concurrent features let React keep the UI responsive by marking some updates as low priority and interruptible. Urgent input stays snappy while expensive renders happen in the background.',
        points: [
          'useTransition: mark a state update as non-urgent; get an isPending flag.',
          'useDeferredValue: render a "lagging" copy of a fast-changing value.',
          'Classic use: typing in a search box that filters a huge list without jank.',
        ],
        code: `const [isPending, startTransition] = useTransition()

function onChange(e) {
  setQuery(e.target.value)                 // urgent: keep input responsive
  startTransition(() => setResults(filter(e.target.value)))  // low priority
}`,
        codeLang: 'jsx',
        interviewer:
          'Can you name a concrete problem these solve? "Typing stays smooth while an expensive list re-renders" beats reciting the API.',
      },
      {
        id: 'react-suspense',
        title: 'Suspense & Streaming',
        tags: ['concurrent', 'state'],
        summary:
          'Suspense lets a component "wait" for something (code, data) and show a fallback declaratively. Combined with streaming SSR, the server can send HTML in chunks as data resolves.',
        points: [
          'Declarative loading UI — no manual isLoading wiring at each call site.',
          'Works with React.lazy today; data-fetching Suspense via frameworks/RSC.',
          'Streaming SSR flushes ready HTML first, fills slower parts as they resolve.',
        ],
      },
      {
        id: 'react-external-store',
        title: 'useSyncExternalStore & useId',
        tags: ['concurrent'],
        summary:
          'useSyncExternalStore is the official way to subscribe to an external store (Zustand, Redux, browser APIs) safely under concurrent rendering. useId generates stable unique IDs that match across SSR and client.',
        points: [
          'useSyncExternalStore prevents tearing (inconsistent reads) in concurrent mode.',
          'It is how state libraries integrate correctly with React 18+.',
          'useId for accessible label/input associations without SSR hydration mismatches.',
        ],
      },
    ],
  },
  {
    id: 'react-sec-forms',
    title: 'Forms & Inputs',
    items: [
      {
        id: 'react-controlled',
        title: 'Controlled vs Uncontrolled',
        tags: ['forms', 'patterns'],
        summary:
          'Controlled inputs keep value in React state (predictable, validate-on-change, but re-renders per keystroke). Uncontrolled inputs let the DOM hold the value and you read it via a ref (less code, fewer renders).',
        points: [
          'Controlled: value + onChange — needed for live validation, formatting, dependent fields.',
          'Uncontrolled: defaultValue + ref — great for simple/large forms (perf).',
          'Libraries like React Hook Form use uncontrolled inputs for speed.',
        ],
        code: `// controlled
<input value={name} onChange={e => setName(e.target.value)} />
// uncontrolled
<input defaultValue="" ref={nameRef} />  // read nameRef.current.value on submit`,
        codeLang: 'jsx',
        gotcha:
          'Switching an input between controlled and uncontrolled (value going from undefined to a string) triggers a React warning and can lose state — pick one.',
      },
      {
        id: 'react-form-actions',
        title: 'Form Actions: useActionState & useOptimistic',
        tags: ['forms', 'ssr'],
        summary:
          'React 19 adds first-class form handling: <form action={fn}>, useActionState for pending/result, and useOptimistic for instant UI while the action is in flight — pairing naturally with Server Actions.',
        points: [
          'action functions receive FormData; work with progressive enhancement.',
          'useActionState tracks pending state + the action’s return value.',
          'useOptimistic shows the expected result immediately, reconciles on completion.',
        ],
        code: `const [state, formAction, pending] = useActionState(submit, null)
return (
  <form action={formAction}>
    <input name="email" />
    <button disabled={pending}>Save</button>
  </form>
)`,
        codeLang: 'jsx',
      },
    ],
  },
  {
    id: 'react-sec-quality',
    title: 'Quality, Patterns & Errors',
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
        code: `// Custom hook = reusable logic, no UI
function useToggle(initial = false) {
  const [on, setOn] = useState(initial)
  const toggle = useCallback(() => setOn(o => !o), [])
  return [on, toggle]
}`,
        codeLang: 'jsx',
      },
      {
        id: 'react-error-boundaries',
        title: 'Error Boundaries',
        tags: ['patterns', 'quality'],
        summary:
          'An error boundary catches render-time errors in its subtree and shows a fallback instead of unmounting the whole app. Today they are class components (or react-error-boundary).',
        points: [
          'Catches errors during render/lifecycle of descendants — not event handlers or async.',
          'Place boundaries around routes/widgets so one failure does not blank the page.',
          'Pair with Suspense for a clean loading + error story; log to monitoring.',
        ],
        code: `class Boundary extends React.Component {
  state = { error: null }
  static getDerivedStateFromError(error) { return { error } }
  componentDidCatch(error, info) { report(error, info) }
  render() { return this.state.error ? <Fallback /> : this.props.children }
}`,
        codeLang: 'jsx',
        gotcha:
          'Error boundaries do NOT catch errors in event handlers, async code, or SSR — handle those with try/catch and report manually.',
      },
      {
        id: 'react-testing',
        title: 'Testing Strategy',
        tags: ['quality', 'testing'],
        summary:
          'Test behavior, not implementation. The testing trophy favors many integration tests over brittle unit tests.',
        points: [
          'React Testing Library: query by role/text, assert user-visible behavior.',
          'Mock the network (MSW), not internal modules; avoid testing internals.',
          'E2E (Playwright/Cypress) for critical flows; visual regression for design systems.',
        ],
        interviewer:
          'See the Testing & Quality track for depth — bringing up the testing trophy and MSW unprompted reads as senior.',
      },
    ],
  },
  {
    id: 'react-sec-server',
    title: 'Rendering on the Server',
    items: [
      {
        id: 'react-ssr-hydration',
        title: 'SSR & Hydration',
        tags: ['ssr', 'performance'],
        summary:
          'SSR sends fully-rendered HTML for a fast first paint and SEO; hydration then attaches event listeners to make it interactive. The gap between paint and interactive is a key UX cost.',
        points: [
          'Server HTML must match the client render or you get a hydration mismatch.',
          'Hydration cost scales with JS shipped — a motivation for streaming + RSC.',
          'selective/streaming hydration prioritizes interactive regions first.',
        ],
        gotcha:
          'Rendering non-deterministic values (Date.now(), Math.random(), window checks) during SSR causes hydration mismatches — defer them to an effect or useId.',
      },
      {
        id: 'react-rsc',
        title: 'React Server Components (RSC)',
        tags: ['ssr', 'architecture'],
        summary:
          'Server Components run only on the server and ship zero JS to the client; Client Components ("use client") add interactivity. The split lets you keep data-heavy, static UI off the bundle.',
        points: [
          'Server Components: data fetching, secrets, big deps — no client JS, not interactive.',
          'Client Components: state, effects, event handlers — marked with "use client".',
          'Server Actions ("use server") let client forms call server functions directly.',
        ],
        interviewer:
          'Explain the trade-off: RSC reduces bundle size and moves data fetching server-side, but you must reason carefully about the server/client boundary.',
      },
    ],
  },
]

export const reactTips = [
  'Be able to explain WHY a component re-renders and how you would fix an extra render.',
  'Know when NOT to reach for useMemo/useCallback, a global store, or even useEffect.',
  'Discuss accessibility, error boundaries, Suspense, and RSC — lead-level breadth.',
]
