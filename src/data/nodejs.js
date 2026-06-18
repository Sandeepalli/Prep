// Node.js & backend content tuned for frontend leads (BFF, APIs, runtime model).

export const sections = [
  {
    id: 'node-sec-runtime',
    title: 'Runtime & Concurrency',
    items: [
      {
        id: 'node-eventloop',
        title: 'Node Event Loop & libuv',
        tags: ['runtime'],
        summary:
          'Node runs JS on a single thread but offloads I/O to libuv’s thread pool and the OS. The event loop has phases (timers, pending, poll, check, close) processed in order.',
        points: [
          'process.nextTick + microtasks run between phases — can starve the loop if abused.',
          'CPU-bound work blocks the loop; offload to Worker Threads or a separate service.',
          'setImmediate (check phase) vs setTimeout(0) (timers phase) ordering differs.',
        ],
      },
      {
        id: 'node-async-patterns',
        title: 'Async Patterns & Error Handling',
        tags: ['runtime'],
        summary:
          'Prefer promises/async-await over callbacks. Robust error handling is what separates production-grade services.',
        points: [
          'Always handle rejections; an unhandled rejection can crash the process.',
          'Wrap async route handlers; centralize error middleware (Express) / hooks (Fastify).',
          'Use AbortController + timeouts for outbound calls; never hang a request.',
        ],
      },
      {
        id: 'node-streams',
        title: 'Streams & Backpressure',
        tags: ['runtime'],
        summary:
          'Streams process data in chunks with bounded memory — essential for large files, proxying, and SSR.',
        points: [
          'Readable/Writable/Duplex/Transform; pipe()/pipeline() handle backpressure + cleanup.',
          'Backpressure prevents a fast producer from overwhelming a slow consumer.',
          'Streaming SSR sends HTML as it renders to improve TTFB.',
        ],
      },
    ],
  },
  {
    id: 'node-sec-middleware',
    title: 'Middleware & Request Pipeline',
    items: [
      {
        id: 'node-middleware-model',
        title: 'The Middleware Model',
        tags: ['middleware', 'architecture'],
        summary:
          'A web server processes each request through an ordered pipeline of middleware functions. Each can read/modify req+res, then call next() to pass control on — or short-circuit by responding. Order matters.',
        points: [
          'Express: (req, res, next) — call next() to continue, or res.send() to stop.',
          'Cross-cutting concerns live here: logging, auth, parsing, CORS, compression.',
          'Mount order = execution order; a misplaced middleware is a common bug.',
        ],
        code: `app.use(express.json())          // 1. parse body
app.use(requestLogger)            // 2. log
app.use('/api', authenticate)     // 3. guard /api
app.get('/api/me', (req, res) => res.json(req.user))  // 4. handler`,
        codeLang: 'js',
        interviewer:
          'Be ready to explain next(): calling it continues the chain, NOT calling it (without responding) hangs the request. This is the #1 middleware bug.',
      },
      {
        id: 'node-middleware-onion',
        title: 'Express Chain vs Koa Onion',
        tags: ['middleware'],
        summary:
          'Express runs middleware as a linear chain. Koa uses an "onion" model with async/await: code before await next() runs on the way in, code after runs on the way out — ideal for timing and post-processing.',
        points: [
          'Express: callback-style next(); response logic after next() needs care.',
          'Koa: await next() — wrap the downstream, then run code as the response bubbles out.',
          'Onion model makes "measure total handler time" trivial.',
        ],
        code: `// Koa onion: runs on the way IN, awaits the rest, runs on the way OUT
app.use(async (ctx, next) => {
  const start = Date.now()
  await next()                       // run all downstream middleware
  ctx.set('X-Response-Time', \`\${Date.now() - start}ms\`)
})`,
        codeLang: 'js',
      },
      {
        id: 'node-error-middleware',
        title: 'Error-Handling Middleware',
        tags: ['middleware', 'runtime'],
        summary:
          'Centralize error handling in one place instead of try/catch in every route. In Express, error middleware has four args (err, req, res, next) and must be registered last.',
        points: [
          'Forward errors with next(err); a 4-arg middleware catches them centrally.',
          'Wrap async handlers so rejected promises reach the error handler.',
          'Map error types → status codes; never leak stack traces to clients.',
        ],
        code: `const wrap = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

app.get('/x', wrap(async (req, res) => { /* may throw */ }))

app.use((err, req, res, next) => {        // 4 args = error handler
  res.status(err.status || 500).json({ error: err.message })
})`,
        codeLang: 'js',
        gotcha:
          'Express does not catch errors thrown in async handlers automatically — an unwrapped rejected promise bypasses your error middleware. Wrap async routes.',
      },
    ],
  },
  {
    id: 'node-sec-api',
    title: 'APIs & Architecture',
    items: [
      {
        id: 'node-bff',
        title: 'BFF (Backend-for-Frontend)',
        tags: ['architecture'],
        summary:
          'A thin server tailored to a frontend: aggregates microservices, shapes responses, hides secrets, and handles auth — the most relevant backend for a frontend lead.',
        points: [
          'Aggregates/combines multiple service calls to cut client round trips and over-fetching.',
          'Keeps tokens/secrets server-side; adds caching, rate limiting, and request shaping.',
          'Per-client BFFs (web/mobile) avoid one API serving every consumer poorly.',
        ],
      },
      {
        id: 'node-rest-graphql',
        title: 'REST vs GraphQL & API Design',
        tags: ['architecture'],
        summary:
          'Design APIs around client needs. REST is simple and cacheable; GraphQL avoids over/under-fetching at the cost of complexity.',
        points: [
          'REST: resource-oriented, HTTP caching, simple; can over/under-fetch.',
          'GraphQL: client-specified shape, one endpoint; needs query cost limits + caching strategy.',
          'Version REST (URI/header); evolve GraphQL via deprecation, not versions.',
        ],
      },
      {
        id: 'node-auth',
        title: 'Auth, Sessions & Security',
        tags: ['security'],
        summary:
          'Authentication and authorization for web clients. Know cookie sessions vs tokens and their trade-offs.',
        points: [
          'Session cookies (HttpOnly, Secure, SameSite) vs JWT (stateless, hard to revoke).',
          'OAuth2/OIDC for delegated auth; PKCE for SPAs; refresh-token rotation.',
          'Validate input, set security headers (helmet), rate-limit, and never trust the client.',
        ],
      },
    ],
  },
  {
    id: 'node-sec-ops',
    title: 'Performance & Operations',
    items: [
      {
        id: 'node-perf',
        title: 'Caching & Performance',
        tags: ['performance'],
        summary:
          'Most backend wins for a frontend are caching, avoiding N+1 calls, and keeping the event loop unblocked.',
        points: [
          'Layer caches: CDN → BFF (Redis) → in-process memo; set sensible TTLs + invalidation.',
          'Batch + dedupe downstream calls (DataLoader pattern) to avoid N+1.',
          'Compression (gzip/brotli), keep-alive, and connection pooling.',
        ],
      },
      {
        id: 'node-observability',
        title: 'Observability & Reliability',
        tags: ['ops'],
        summary:
          'Production services need logs, metrics, traces, and graceful failure. Leads are expected to care about ops.',
        points: [
          'Structured logging, request IDs, distributed tracing (OpenTelemetry).',
          'Health/readiness checks, graceful shutdown (drain connections), timeouts.',
          'Circuit breakers + retries with backoff for flaky downstreams.',
        ],
      },
    ],
  },
]

export const nodeTips = [
  'Frame Node knowledge around the BFF: the backend a frontend lead actually owns.',
  'Be ready to explain the event loop and why CPU-bound work is dangerous in Node.',
  'Know auth trade-offs (cookies vs JWT) and basic API security headers.',
]
