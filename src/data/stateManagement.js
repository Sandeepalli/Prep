// State management content for senior/lead frontend interviews.
// Rich items support: summary, points, code, codeLang, gotcha, interviewer.

export const sections = [
  {
    id: 'sm-sec-foundations',
    title: 'Foundations',
    items: [
      {
        id: 'sm-taxonomy',
        title: 'The 5 Kinds of State',
        tags: ['state'],
        summary:
          'Most "state management" debates dissolve once you classify the state. Each kind has a different ideal tool — reaching for one global store for everything is the classic anti-pattern.',
        points: [
          'Local UI state: useState/useReducer — a toggle, an input, a hovered row.',
          'Global client state: theme, auth user, sidebar — Zustand/Jotai/Redux/Context.',
          'Server state: data you fetch and cache — React Query / RTK Query / SWR.',
          'URL state: filters, tab, pagination — the query string / route params.',
          'Form state: values, touched, errors — React Hook Form / controlled inputs.',
        ],
        interviewer:
          'They want to hear you separate SERVER state from CLIENT state. Saying "I would not put fetched data in Redux" is a strong senior signal.',
      },
      {
        id: 'sm-derived',
        title: 'Derived State & Single Source of Truth',
        tags: ['state', 'patterns'],
        summary:
          'If a value can be computed from existing state, compute it during render — do not store it. Duplicated state drifts out of sync and causes "stale UI" bugs.',
        points: [
          'Keep one source of truth; derive the rest in render (or useMemo if expensive).',
          'Storing both `items` and `count` invites bugs — derive count from items.',
          'Avoid syncing props into state with useEffect; derive or lift instead.',
        ],
        code: `// ❌ duplicated, can drift
const [items, setItems] = useState([])
const [count, setCount] = useState(0)

// ✅ derive it
const [items, setItems] = useState([])
const count = items.length
const completed = useMemo(
  () => items.filter(i => i.done),
  [items]
)`,
        codeLang: 'jsx',
        gotcha:
          'Mirroring props into state with useEffect is almost always a bug — the state goes stale when the prop changes. Derive during render or use the `key` prop to reset.',
      },
      {
        id: 'sm-reducer',
        title: 'useReducer & State Machines',
        tags: ['state', 'patterns'],
        summary:
          'When several state values change together or transitions have rules, a reducer beats scattered useState calls. Modeling explicit states prevents impossible combinations.',
        points: [
          'Use useReducer when next state depends on previous state + an action.',
          'Avoid booleans soup (isLoading/isError/isSuccess) → use one status enum.',
          'XState/state machines formalize this for complex flows (wizards, players).',
        ],
        code: `function reducer(state, action) {
  switch (action.type) {
    case 'FETCH': return { status: 'loading', data: null, error: null }
    case 'OK':    return { status: 'success', data: action.data, error: null }
    case 'ERR':   return { status: 'error', data: null, error: action.error }
    default:      return state
  }
}`,
        codeLang: 'js',
        gotcha:
          'Four independent booleans give 16 combinations, most invalid (loading && error?). A single status string makes illegal states unrepresentable.',
      },
    ],
  },
  {
    id: 'sm-sec-server',
    title: 'Server State (React Query / RTK Query)',
    items: [
      {
        id: 'sm-react-query',
        title: 'TanStack Query (React Query)',
        tags: ['server-state'],
        summary:
          'Server state is async, shared, and can go stale — fundamentally different from client state. React Query gives you caching, dedup, background refetch, and stale-while-revalidate for free.',
        points: [
          'Caches by query key; dedupes concurrent requests for the same key.',
          'stale-while-revalidate: shows cached data instantly, refetches in the background.',
          'Built-in loading/error/refetch states; retries, pagination, infinite queries.',
          'Invalidate keys after a mutation to trigger a precise refetch.',
        ],
        code: `const { data, isPending, error } = useQuery({
  queryKey: ['user', id],
  queryFn: () => fetchUser(id),
  staleTime: 60_000,        // fresh for 1 min, no refetch
})

const qc = useQueryClient()
const mutation = useMutation({
  mutationFn: updateUser,
  onSuccess: () => qc.invalidateQueries({ queryKey: ['user', id] }),
})`,
        codeLang: 'jsx',
        interviewer:
          'Can you articulate WHY server state needs its own tool? Mention caching, dedup, revalidation, and that Redux would make you re-implement all of it by hand.',
        gotcha:
          'Do not copy query data into local state or Redux — it becomes a second, stale source of truth. Read from the cache where you need it.',
      },
      {
        id: 'sm-optimistic',
        title: 'Optimistic Updates & Rollback',
        tags: ['server-state', 'patterns'],
        summary:
          'For snappy UX, update the UI before the server confirms, then roll back if it fails. The key is snapshotting the previous value so you can restore it on error.',
        points: [
          'Apply the change to the cache immediately (optimistic).',
          'Snapshot the prior state; on error, restore it; always refetch on settle.',
          'Best for high-confidence actions (like/favourite), not money transfers.',
        ],
        code: `useMutation({
  mutationFn: toggleLike,
  onMutate: async (id) => {
    await qc.cancelQueries({ queryKey: ['post', id] })
    const prev = qc.getQueryData(['post', id])
    qc.setQueryData(['post', id], p => ({ ...p, liked: !p.liked }))
    return { prev }                       // context for rollback
  },
  onError: (_e, id, ctx) => qc.setQueryData(['post', id], ctx.prev),
  onSettled: (_d, _e, id) => qc.invalidateQueries({ queryKey: ['post', id] }),
})`,
        codeLang: 'js',
      },
      {
        id: 'sm-rtk-query',
        title: 'RTK Query',
        tags: ['server-state', 'redux'],
        summary:
          'If you are already on Redux Toolkit, RTK Query bundles data fetching + caching into the store with auto-generated hooks — no separate library, tag-based invalidation.',
        points: [
          'Define endpoints once; get useGetXQuery / useUpdateXMutation hooks generated.',
          'Tag-based cache invalidation (providesTags / invalidatesTags).',
          'Good when the team is standardized on Redux; otherwise React Query is lighter.',
        ],
        interviewer:
          'Comparing RTK Query vs React Query shows breadth: same problem, different ecosystem fit. Lead the answer with "depends on whether the app already uses Redux".',
      },
    ],
  },
  {
    id: 'sm-sec-client',
    title: 'Client State Libraries',
    items: [
      {
        id: 'sm-redux-toolkit',
        title: 'Redux Toolkit (RTK)',
        tags: ['redux', 'state'],
        summary:
          'Modern Redux is RTK — slices remove boilerplate, Immer lets you "mutate" drafts safely, and the store stays predictable and devtools-friendly. Best for large apps with complex, shared, structured state.',
        points: [
          'createSlice generates actions + reducer; write "mutating" logic (Immer handles immutability).',
          'configureStore wires devtools + thunk middleware by default.',
          'Use selectors (reselect) for derived, memoized reads.',
        ],
        code: `const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [] },
  reducers: {
    add(state, action) { state.items.push(action.payload) }, // Immer
    clear(state) { state.items = [] },
  },
})
export const { add, clear } = cartSlice.actions`,
        codeLang: 'js',
        gotcha:
          'The "mutation" in reducers only works because Immer wraps it in a draft. Mutating state outside createSlice (or in async code) still breaks Redux.',
        interviewer:
          'Know when NOT to use Redux. If they ask "would you add Redux here?", the senior answer is often "no — local state + React Query covers it".',
      },
      {
        id: 'sm-redux-middleware',
        title: 'Redux Middleware (Thunk, Saga, Listener)',
        tags: ['redux', 'middleware'],
        summary:
          'Middleware sits between dispatching an action and the reducer — the place for async, logging, and side effects. It is the same onion concept as server middleware, on the client.',
        points: [
          'Thunk: dispatch a function for async flows — simplest, default in RTK.',
          'Saga: generator-based, great for complex orchestration/cancellation (heavier).',
          'RTK Listener middleware: lightweight reactive side effects without sagas.',
          'Custom middleware: analytics, crash logging, persistence.',
        ],
        code: `// A middleware is curried: store => next => action
const logger = store => next => action => {
  console.log('dispatching', action.type)
  const result = next(action)        // pass down the chain
  console.log('next state', store.getState())
  return result
}`,
        codeLang: 'js',
        interviewer:
          'Middleware (client or server) is a favourite "do you understand the request/dispatch pipeline?" probe. The signature store => next => action is worth memorizing.',
      },
      {
        id: 'sm-zustand',
        title: 'Zustand',
        tags: ['state'],
        summary:
          'A tiny (~1KB) hook-based store with no provider and no boilerplate. You select exactly the slice you need, so components only re-render when that slice changes.',
        points: [
          'No Context provider needed; create a store, use it as a hook.',
          'Selector subscriptions = surgical re-renders (the Context perf problem, solved).',
          'Great middle ground between useState chaos and full Redux.',
        ],
        code: `const useStore = create((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
}))

// component re-renders only when \`count\` changes
const count = useStore((s) => s.count)`,
        codeLang: 'js',
      },
      {
        id: 'sm-jotai',
        title: 'Jotai & Atomic State',
        tags: ['state'],
        summary:
          'Atomic libraries (Jotai, Recoil) model state as small composable atoms. Components subscribe to individual atoms, and derived atoms recompute automatically — bottom-up vs Redux’s top-down.',
        points: [
          'Atoms are the unit; derived atoms compose like a dependency graph.',
          'Avoids the "one giant object re-renders everything" problem.',
          'Good for fine-grained, spreadsheet-like reactive state.',
        ],
      },
      {
        id: 'sm-context',
        title: 'Context API — Use & Pitfalls',
        tags: ['state', 'performance'],
        summary:
          'Context is a dependency-injection mechanism, not a state manager. It is perfect for low-frequency, app-wide values (theme, locale, auth) but a performance trap for fast-changing state.',
        points: [
          'Every consumer re-renders whenever the context VALUE identity changes.',
          'Split contexts by update frequency; memoize the provided value.',
          'For frequently-updated shared state, prefer Zustand/Jotai over Context.',
        ],
        code: `// ❌ new object every render → all consumers re-render
<Ctx.Provider value={{ user, setUser }}>

// ✅ stable identity
const value = useMemo(() => ({ user, setUser }), [user])
<Ctx.Provider value={value}>`,
        codeLang: 'jsx',
        gotcha:
          'Passing an inline object/array as the Provider value re-renders every consumer on each parent render — even ones that only read an unchanged field. Memoize it.',
      },
    ],
  },
  {
    id: 'sm-sec-patterns',
    title: 'Patterns & Architecture',
    items: [
      {
        id: 'sm-normalization',
        title: 'Normalizing State',
        tags: ['patterns', 'state'],
        summary:
          'Store collections as a lookup keyed by id (like a tiny database table), not as nested arrays. Updates and lookups become O(1), and you avoid duplicating the same entity in many places.',
        points: [
          'Shape: { byId: {1:{...}}, allIds: [1,2] } — RTK has createEntityAdapter.',
          'Avoids deep nested updates and duplicate copies going out of sync.',
          'Join/denormalize with selectors at read time.',
        ],
        code: `// normalized
{
  byId: { 'a1': { id: 'a1', text: 'Hi' }, 'a2': {...} },
  allIds: ['a1', 'a2'],
}`,
        codeLang: 'js',
      },
      {
        id: 'sm-url-state',
        title: 'URL as State',
        tags: ['state', 'patterns'],
        summary:
          'Filters, search terms, active tab, and pagination belong in the URL. It makes views shareable, bookmarkable, and survives refresh/back — and removes a whole class of sync bugs.',
        points: [
          'Put shareable/navigational state in the query string or route params.',
          'useSearchParams (React Router) / nuqs to read+write typed URL state.',
          'The URL is the one source of truth that the back button respects.',
        ],
        interviewer:
          'Mentioning "the URL is state too" is an underrated senior signal — most candidates forget it and over-engineer a store for filters.',
      },
      {
        id: 'sm-choosing',
        title: 'Choosing the Right Tool',
        tags: ['architecture', 'state'],
        summary:
          'A decision framework beats library trivia. Start with the smallest scope and only escalate when there is real shared/complex state.',
        points: [
          'Server data? → React Query / RTK Query. Stop here for most "state" needs.',
          'Just this component? → useState/useReducer.',
          'A few components? → lift state up or Context (low-frequency).',
          'App-wide, frequently changing? → Zustand/Jotai; Redux for large structured domains.',
          'Shareable/navigational? → the URL.',
        ],
        interviewer:
          'They are testing judgement, not memorization. Walk the decision tree out loud and justify each escalation — that is exactly how a lead reasons.',
      },
    ],
  },
]

export const tips = [
  'Always separate server state from client state — it reframes most "which store?" questions.',
  'Have a crisp opinion on when NOT to use Redux/Context; over-engineering is a red flag.',
  'Be able to whiteboard an optimistic update with rollback — it shows real-world depth.',
]
