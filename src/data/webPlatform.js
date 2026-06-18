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
        interviewer:
          'Tie each metric to a cause AND a fix (LCP→hero image/preload, INP→long tasks, CLS→missing dimensions). Naming the field tool (CrUX/RUM vs lab/Lighthouse) is a bonus.',
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
        code: `// Lazy-load below-the-fold work with IntersectionObserver
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (e.isIntersecting) { load(e.target); io.unobserve(e.target) }
  }
}, { rootMargin: '200px' })   // start a bit before it scrolls into view`,
        codeLang: 'js',
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
        interviewer:
          '"The first rule of ARIA is: don’t use ARIA" — if a native element exists, use it. Saying that signals real a11y depth, not checklist knowledge.',
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
  {
    id: 'wp-sec-a11y',
    title: 'Accessibility Deep Dive',
    items: [
      {
        id: 'wp-a11y-aria',
        title: 'Roles, Names & ARIA',
        tags: ['accessibility'],
        summary:
          'Assistive tech builds an accessibility tree of roles, names, states, and values. Native HTML provides these for free; ARIA only patches gaps — and wrong ARIA is worse than none.',
        points: [
          'Every interactive element needs an accessible NAME (label/aria-label/text).',
          'ARIA changes semantics only — it adds no behavior, focus, or keyboard handling.',
          'role="button" on a div means you must add tabindex + key handlers yourself.',
        ],
        code: `<!-- ✅ free role, name, focus, keyboard, Enter/Space -->
<button onclick="save()">Save</button>

<!-- ❌ now you owe tabindex + role + keydown + focus styles -->
<div role="button" tabindex="0" onkeydown="...">Save</div>`,
        codeLang: 'html',
        gotcha:
          'Adding role="button" to a div does NOT make it focusable or respond to Enter/Space — you must wire all of that manually. Just use <button>.',
      },
      {
        id: 'wp-a11y-keyboard',
        title: 'Keyboard & Focus Management',
        tags: ['accessibility'],
        summary:
          'Everything must be operable by keyboard alone. Modals/menus need deliberate focus management: trap focus inside while open, then restore it to the trigger on close.',
        points: [
          'Logical tab order (DOM order); never remove visible focus outlines without a replacement.',
          'Modal: move focus in on open, trap Tab within, Esc to close, restore focus on close.',
          'Use tabindex="-1" to focus programmatically; avoid positive tabindex values.',
        ],
        code: `function openDialog(dialog, trigger) {
  const last = trigger
  dialog.querySelector('[autofocus], button, input')?.focus()
  dialog.addEventListener('keydown', e => {
    if (e.key === 'Escape') { close(); last.focus() }   // restore focus
  })
}`,
        codeLang: 'js',
        interviewer:
          'Focus restoration (returning focus to the trigger after a modal closes) is the detail that separates people who have actually built accessible widgets from those who have read about them.',
      },
      {
        id: 'wp-a11y-sr',
        title: 'Screen Readers & Live Regions',
        tags: ['accessibility'],
        summary:
          'Dynamic updates (toasts, validation, async results) are invisible to screen-reader users unless announced. ARIA live regions broadcast changes without moving focus.',
        points: [
          'aria-live="polite" announces when idle; "assertive" interrupts (use sparingly).',
          'role="status"/"alert" are built-in live regions for results and errors.',
          'Test with a real screen reader (VoiceOver/NVDA) — automated tools miss a lot.',
        ],
        code: `<div role="status" aria-live="polite">{savedMessage}</div>
// setting savedMessage = "Saved!" is announced without stealing focus`,
        codeLang: 'jsx',
      },
      {
        id: 'wp-a11y-forms',
        title: 'Accessible Forms',
        tags: ['accessibility'],
        summary:
          'Forms are where a11y most often breaks. Every input needs a programmatically associated label, and errors must be linked to their field and announced.',
        points: [
          'Associate labels via <label for> / htmlFor — placeholders are NOT labels.',
          'Link errors with aria-describedby; mark invalid fields with aria-invalid.',
          'Group related controls with <fieldset>/<legend> (radios, checkboxes).',
        ],
        gotcha:
          'A placeholder is not a label — it disappears on input, fails contrast, and is unreliable for screen readers. Always provide a real <label>.',
      },
    ],
  },
]

export const webTips = [
  'Tie every perf optimization to a metric (LCP/INP/CLS) and a measurement method.',
  'Be ready to debug a slow page: Network waterfall, Performance panel, long tasks.',
  'Accessibility and security questions separate seniors from leads — have opinions.',
]
