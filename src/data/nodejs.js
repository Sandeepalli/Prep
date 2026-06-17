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
