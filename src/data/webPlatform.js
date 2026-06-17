// Web platform, performance, accessibility, security, and CSS content.

export const sections = [
  {
    id: 'wp-sec-render',
    title: 'Browser & Rendering',
    items: [
      {
        id: 'wp-critical-path',
        title: 'Critical Rendering Path',
        tags: ['rendering'],
        summary:
          'The browser turns bytes into pixels: parse HTML→DOM, CSS→CSSOM, combine into the render tree, layout, paint, composite. CSS and sync JS block this path.',
        points: [
          'CSS is render-blocking; inline critical CSS, defer the rest.',
          'JS is parser-blocking — use defer (after parse, in order) or async (ASAP, any order).',
          'Layout (reflow) is expensive; batch DOM reads/writes to avoid layout thrashing.',
          'Compositor-only props (transform, opacity) animate without layout/paint.',
        ],
      },
      {
        id: 'wp-rendering-strategies',
        title: 'CSR vs SSR vs SSG vs ISR',
        tags: ['rendering', 'architecture'],
        summary:
          'Where and when you render HTML trades off TTFB, interactivity, SEO, and infra cost. Lead candidates justify the choice per use case.',
        points: [
          'CSR: fast deploys, blank first paint, weaker SEO — apps behind login.',
          'SSR: fast first paint + SEO, server cost, hydration delay — dynamic public pages.',
          'SSG: prebuilt, cacheable, fastest — mostly static content; ISR refreshes on a schedule.',
          'Streaming SSR + RSC reduces JS shipped and improves TTFB.',
        ],
      },
    ],
  },
  {
    id: 'wp-sec-perf',
    title: 'Performance',
    items: [
      {
        id: 'wp-cwv',
        title: 'Core Web Vitals',
        tags: ['performance'],
        summary:
          'Google’s UX metrics: LCP (loading), INP (responsiveness, replaced FID), CLS (visual stability). Optimize the metric, not the score.',
        points: [
          'LCP < 2.5s: optimize the hero image/text, preload, CDN, reduce TTFB.',
          'INP < 200ms: break up long tasks, defer work, avoid heavy main-thread JS.',
          'CLS < 0.1: reserve space for images/ads (width/height), avoid layout shifts.',
        ],
      },
      {
        id: 'wp-loading',
        title: 'Loading & Asset Optimization',
        tags: ['performance'],
        summary:
          'Ship less, ship it earlier, cache it well. The biggest wins are usually bundle size and images.',
        points: [
          'Code-split by route; tree-shake; analyze the bundle; lazy-load below the fold.',
          'Images: modern formats (AVIF/WebP), responsive srcset, lazy loading, CDN.',
          'Use resource hints: preload (critical), prefetch (next nav), preconnect (origins).',
          'HTTP caching: immutable hashed assets + long max-age; revalidate HTML.',
        ],
      },
    ],
  },
  {
    id: 'wp-sec-network',
    title: 'Networking & Storage',
    items: [
      {
        id: 'wp-http',
        title: 'HTTP, HTTPS & HTTP/2-3',
        tags: ['networking'],
        summary:
          'Know the request lifecycle and protocol evolution. HTTP/2 multiplexes; HTTP/3 runs over QUIC/UDP to dodge head-of-line blocking.',
        points: [
          'Methods + idempotency; status code families; caching/conditional headers (ETag).',
          'CORS: preflight (OPTIONS) for non-simple requests; server sets Allow-Origin/headers.',
          'TLS handshake adds round trips — preconnect to known origins.',
        ],
      },
      {
        id: 'wp-storage',
        title: 'Client Storage & Offline',
        tags: ['networking'],
        summary:
          'Pick storage by size, lifetime, and security needs. Service workers enable offline + background sync.',
        points: [
          'localStorage/sessionStorage (sync, ~5MB, strings), IndexedDB (async, large, structured).',
          'Cookies for auth (HttpOnly, Secure, SameSite) — not for general data.',
          'Service workers cache assets/requests; enable PWAs and offline-first UX.',
        ],
      },
    ],
  },
  {
    id: 'wp-sec-quality',
    title: 'Accessibility, Security & CSS',
    items: [
      {
        id: 'wp-a11y',
        title: 'Accessibility (a11y)',
        tags: ['accessibility'],
        summary:
          'Accessible UIs are a lead-level expectation. Semantic HTML does most of the work; ARIA fills gaps.',
        points: [
          'Use semantic elements (button, nav, label); ARIA only when no native element fits.',
          'Keyboard operability, visible focus, logical tab order, focus traps for modals.',
          'Color contrast (WCAG AA), alt text, labels; test with a screen reader + axe.',
        ],
      },
      {
        id: 'wp-security',
        title: 'Frontend Security',
        tags: ['security'],
        summary:
          'The browser is hostile territory. Know XSS, CSRF, and how to harden a frontend.',
        points: [
          'XSS: never inject untrusted HTML; sanitize; use a strict Content-Security-Policy.',
          'CSRF: SameSite cookies + anti-CSRF tokens for state-changing requests.',
          'Store tokens carefully (HttpOnly cookies > localStorage); avoid leaking via XSS.',
          'Subresource Integrity, HTTPS everywhere, principle of least privilege for APIs.',
        ],
      },
      {
        id: 'wp-css',
        title: 'Modern CSS & Layout',
        tags: ['css'],
        summary:
          'Lead candidates own the styling architecture. Master the layout engines and scalable styling.',
        points: [
          'Flexbox (1D) vs Grid (2D); container queries for component-driven responsiveness.',
          'Specificity + cascade; methodologies: BEM, CSS Modules, utility-first (Tailwind), CSS-in-JS.',
          'Logical properties, custom properties (theming), clamp() for fluid type.',
        ],
      },
    ],
  },
]

export const webTips = [
  'Tie every perf optimization to a metric (LCP/INP/CLS) and a measurement method.',
  'Be ready to debug a slow page: Network waterfall, Performance panel, long tasks.',
  'Accessibility and security questions separate seniors from leads — have opinions.',
]
