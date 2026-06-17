// JavaScript & TypeScript deep-dive content for senior/lead frontend interviews.

export const sections = [
  {
    id: 'js-sec-core',
    title: 'Core Language',
    items: [
      {
        id: 'js-closures',
        title: 'Closures & Lexical Scope',
        tags: ['core'],
        summary:
          'A closure is a function bundled with references to its surrounding lexical state. It lets functions “remember” variables from where they were defined, even after that scope has returned.',
        points: [
          'Powers data privacy (module pattern), memoization, currying, and event handlers.',
          'Classic bug: var in a loop shares one binding — use let (block scoping) or an IIFE.',
          'Each call creates a fresh closure; watch for memory retained by long-lived closures (leaks).',
        ],
      },
      {
        id: 'js-this',
        title: '`this` Binding & Arrow Functions',
        tags: ['core'],
        summary:
          '`this` is determined by how a function is called, not where it is defined. The four rules: default, implicit (obj.fn()), explicit (call/apply/bind), and new.',
        points: [
          'Arrow functions have no own `this` — they capture it lexically, ideal for callbacks.',
          'Lost `this` in callbacks → bind, arrow wrapper, or class field arrow methods.',
          'In strict mode default `this` is undefined, not the global object.',
        ],
      },
      {
        id: 'js-proto',
        title: 'Prototypes & Inheritance',
        tags: ['core'],
        summary:
          'Objects delegate property lookups up a prototype chain. `class` is syntactic sugar over prototypal inheritance.',
        points: [
          'obj.__proto__ / Object.getPrototypeOf points to the prototype; methods live on Constructor.prototype.',
          'Prototype chain lookup ends at null; deep chains cost lookup time.',
          'Prefer composition over deep inheritance; class adds super, private #fields.',
        ],
      },
      {
        id: 'js-equality',
        title: 'Coercion, Equality & Types',
        tags: ['core'],
        summary:
          'JS has 7 primitives + object. == triggers coercion; === compares type + value. Know the gotchas cold.',
        points: [
          'Always prefer === ; use == null only as an intentional null/undefined check.',
          'typeof null === "object" (legacy bug); arrays are objects (use Array.isArray).',
          'NaN !== NaN — use Number.isNaN; Object.is handles -0 and NaN edge cases.',
        ],
      },
    ],
  },
  {
    id: 'js-sec-async',
    title: 'Asynchronous JavaScript',
    items: [
      {
        id: 'js-eventloop',
        title: 'The Event Loop, Microtasks & Macrotasks',
        tags: ['async'],
        summary:
          'JS is single-threaded with an event loop. The call stack runs to completion, then the loop drains all microtasks (Promises, queueMicrotask), then one macrotask (timers, I/O, events), then repeats.',
        points: [
          'Microtasks (Promise.then) run before the next render/macrotask — can starve rendering if abused.',
          'setTimeout(fn, 0) is a macrotask: runs after current sync code + all microtasks.',
          'requestAnimationFrame fires before paint; ideal for visual updates.',
          'Common interview output-ordering question: sync → microtasks → macrotasks.',
        ],
      },
      {
        id: 'js-promises',
        title: 'Promises & async/await',
        tags: ['async'],
        summary:
          'Promises model a future value with pending/fulfilled/rejected states. async/await is sugar that makes async code read synchronously.',
        points: [
          'Promise.all (fail fast), allSettled (wait all), race, any (first fulfilled).',
          'await in a loop serializes; map to promises + Promise.all to parallelize.',
          'Always handle rejection; unhandled rejections crash Node and warn in browsers.',
          'A common task: implement Promise.all / a retry-with-backoff / a concurrency limiter.',
        ],
      },
      {
        id: 'js-patterns',
        title: 'Debounce, Throttle & Cancellation',
        tags: ['async', 'patterns'],
        summary:
          'Rate-limiting user-driven work is a staple of frontend interviews. Debounce waits for quiet; throttle caps frequency.',
        points: [
          'Debounce: run after N ms of no calls (search input). Throttle: at most once per N ms (scroll).',
          'AbortController cancels fetch and event listeners cleanly.',
          'Be ready to implement debounce/throttle from scratch with leading/trailing options.',
        ],
      },
    ],
  },
  {
    id: 'js-sec-ts',
    title: 'TypeScript',
    items: [
      {
        id: 'ts-types',
        title: 'Structural Typing & Type vs Interface',
        tags: ['typescript'],
        summary:
          'TS is structurally typed: compatibility is by shape, not name. interface and type overlap; pick by use case.',
        points: [
          'interface: extendable, declaration-merging, great for public object/class contracts.',
          'type: unions, intersections, tuples, mapped/conditional types, primitives aliases.',
          'unknown is the safe any; never is the impossible type; avoid any in shared code.',
        ],
      },
      {
        id: 'ts-generics',
        title: 'Generics & Utility Types',
        tags: ['typescript'],
        summary:
          'Generics make reusable, type-safe abstractions. Built-in utility types cover most transformations.',
        points: [
          'Partial, Required, Pick, Omit, Record, Readonly, ReturnType, Parameters, Awaited.',
          'Constrain generics with extends; infer extracts types in conditional types.',
          'Discriminated unions + exhaustive switch (never) model state safely (e.g. fetch states).',
        ],
      },
    ],
  },
]

export const jsTips = [
  'Be ready to predict console output for event-loop ordering questions.',
  'Practice implementing: debounce, throttle, deep clone, Promise.all, EventEmitter, curry.',
  'Explain trade-offs (e.g. closures vs memory) — leads are judged on depth + communication.',
]
