// Testing & quality content for senior/lead frontend interviews.

export const sections = [
  {
    id: 'test-sec-strategy',
    title: 'Strategy',
    items: [
      {
        id: 'test-trophy',
        title: 'Testing Trophy vs Pyramid',
        tags: ['testing'],
        summary:
          'For frontends, the Testing Trophy (Kent C. Dodds) favors integration tests — they give the most confidence per unit of effort. The classic pyramid over-weights brittle unit tests of implementation details.',
        points: [
          'Static (TS + ESLint) → Unit → Integration (most) → E2E (few, critical).',
          'Integration tests render real component trees and assert user-visible behavior.',
          '"Write tests. Not too many. Mostly integration."',
        ],
        interviewer:
          'They want a philosophy, not tool trivia. State that you optimize for confidence per effort and test behavior, not internals.',
      },
      {
        id: 'test-what',
        title: 'Test Behavior, Not Implementation',
        tags: ['testing', 'patterns'],
        summary:
          'Good tests survive refactors. Assert what the user sees and does — not internal state, function names, or class internals — so you can restructure code without rewriting tests.',
        points: [
          'Query by role/label/text (what users perceive), not test IDs or DOM structure.',
          'Avoid asserting on internal state, private methods, or call counts of internals.',
          'A test that breaks on every refactor is testing the wrong thing.',
        ],
        gotcha:
          'Snapshot tests of large component trees become noise — people regenerate them blindly. Use them sparingly for small, stable output.',
      },
      {
        id: 'test-coverage',
        title: 'Coverage & CI Quality Gates',
        tags: ['testing', 'ops'],
        summary:
          'Coverage shows what ran, not what was verified — 100% coverage with no assertions tests nothing. Use it as a floor and signal, gated in CI alongside type-checks and lint.',
        points: [
          'CI gates: typecheck + lint + unit/integration + critical E2E on every PR.',
          'Coverage as a trend/floor, not a vanity target; watch critical paths.',
          'Fail fast: run cheap checks (types, lint) before slow E2E.',
        ],
        interviewer:
          'Pushing back on "we need 100% coverage" with nuance (coverage ≠ confidence) is a lead-level signal.',
      },
    ],
  },
  {
    id: 'test-sec-unit',
    title: 'Unit & Component',
    items: [
      {
        id: 'test-runner',
        title: 'Vitest / Jest',
        tags: ['tooling', 'testing'],
        summary:
          'The test runner provides the describe/it/expect API, mocking, and coverage. Vitest is the Vite-native choice (fast, ESM, shares config); Jest is the established standard.',
        points: [
          'Vitest: instant HMR-like watch, native ESM/TS, Jest-compatible API.',
          'Mocks/spies: vi.fn(), vi.mock(); fake timers for debounce/throttle.',
          'jsdom/happy-dom simulate the DOM for component tests in Node.',
        ],
      },
      {
        id: 'test-rtl',
        title: 'React Testing Library (RTL)',
        tags: ['testing'],
        summary:
          'RTL renders components and queries the DOM the way a user would. Its guiding principle: the more your tests resemble how the software is used, the more confidence they give.',
        points: [
          'Query priority: getByRole > getByLabelText > getByText > (last resort) getByTestId.',
          'getBy (must exist) vs queryBy (may be null) vs findBy (async, awaits).',
          'Assert on accessible roles/names — this doubles as a basic a11y check.',
        ],
        code: `test('submits the form', async () => {
  render(<LoginForm onSubmit={onSubmit} />)
  await userEvent.type(screen.getByLabelText(/email/i), 'a@b.com')
  await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
  expect(onSubmit).toHaveBeenCalledWith({ email: 'a@b.com' })
})`,
        codeLang: 'jsx',
        gotcha:
          'If you reach for getByTestId first, that is a smell — it usually means the markup is not accessible. Prefer role/label queries.',
      },
      {
        id: 'test-user-event',
        title: 'user-event vs fireEvent',
        tags: ['testing'],
        summary:
          'fireEvent dispatches a single raw DOM event; userEvent simulates the full interaction (focus, keydown, keypress, input, keyup) the way a real user triggers it. Prefer userEvent.',
        points: [
          'userEvent.type fires the whole key sequence, not just a value set.',
          'It is async — await it (await userEvent.click(...)).',
          'Catches bugs fireEvent misses (e.g. handlers depending on focus/keydown).',
        ],
      },
    ],
  },
  {
    id: 'test-sec-integration',
    title: 'Integration & Mocking',
    items: [
      {
        id: 'test-msw',
        title: 'Mock Service Worker (MSW)',
        tags: ['testing'],
        summary:
          'MSW intercepts requests at the network layer, so your code uses real fetch and you mock the HTTP boundary — not internal modules. The same handlers work in tests, Storybook, and the browser.',
        points: [
          'Intercepts at the network level; code under test is unaware it is mocked.',
          'Reuse handlers across unit tests, integration tests, and local dev.',
          'Override per-test for error/loading/empty states.',
        ],
        code: `const server = setupServer(
  http.get('/api/user/:id', ({ params }) =>
    HttpResponse.json({ id: params.id, name: 'Ada' })
  )
)
beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())`,
        codeLang: 'js',
        interviewer:
          'Mocking at the network boundary (MSW) vs stubbing fetch/modules shows maturity — it keeps tests realistic and refactor-proof.',
      },
      {
        id: 'test-mocking',
        title: 'Mocking Strategy',
        tags: ['testing', 'patterns'],
        summary:
          'Mock at boundaries (network, time, randomness, third-party SDKs), not your own modules. Over-mocking produces tests that pass while the app is broken.',
        points: [
          'Mock: network (MSW), Date/timers, Math.random, browser APIs, paid SDKs.',
          'Do NOT mock the module you are actually testing or its collaborators.',
          'Each internal mock is an assumption that can silently drift from reality.',
        ],
        gotcha:
          'Mocking everything around a unit can give green tests for code that fails in production — the mocks encode assumptions that no longer hold.',
      },
    ],
  },
  {
    id: 'test-sec-e2e',
    title: 'E2E, Visual & Accessibility',
    items: [
      {
        id: 'test-e2e',
        title: 'E2E with Playwright / Cypress',
        tags: ['e2e'],
        summary:
          'End-to-end tests drive a real browser through critical user journeys (login, checkout). They are slow and the most flaky, so keep them few and focused on money paths.',
        points: [
          'Playwright: multi-browser, parallel, auto-waiting, great tracing/debugging.',
          'Reduce flake with auto-waiting locators and role/text selectors (not sleeps).',
          'Reserve E2E for a handful of high-value flows; push detail down to integration.',
        ],
        code: `test('user can sign in', async ({ page }) => {
  await page.goto('/login')
  await page.getByLabel('Email').fill('a@b.com')
  await page.getByRole('button', { name: 'Sign in' }).click()
  await expect(page.getByText('Welcome')).toBeVisible()
})`,
        codeLang: 'js',
        gotcha:
          'Fixed waits (sleep/setTimeout) are the #1 source of E2E flake. Use auto-waiting assertions like expect(locator).toBeVisible() instead.',
      },
      {
        id: 'test-visual',
        title: 'Visual Regression Testing',
        tags: ['e2e', 'testing'],
        summary:
          'Screenshot diffing catches unintended UI changes that assertions miss — spacing, color, layout. Essential for design systems where many apps depend on the components.',
        points: [
          'Tools: Playwright snapshots, Chromatic (Storybook), Percy.',
          'Pin fonts/animations/time to keep diffs deterministic.',
          'Great fit for component libraries and design-system regression.',
        ],
      },
      {
        id: 'test-a11y',
        title: 'Automated Accessibility Testing',
        tags: ['accessibility', 'testing'],
        summary:
          'axe-core (via jest-axe or @axe-core/playwright) catches a large share of a11y violations automatically. It is a safety net — not a replacement for keyboard + screen-reader testing.',
        points: [
          'jest-axe asserts no violations on rendered output in component tests.',
          'Automated tools catch ~30–50%; still test keyboard nav + a real screen reader.',
          'Querying by role in RTL already nudges you toward accessible markup.',
        ],
        code: `import { axe } from 'jest-axe'

test('has no a11y violations', async () => {
  const { container } = render(<Dialog open />)
  expect(await axe(container)).toHaveNoViolations()
})`,
        codeLang: 'jsx',
        interviewer:
          'Knowing automated a11y testing only covers a fraction — and that manual keyboard/SR testing is still required — is exactly the nuance leads are expected to have.',
      },
    ],
  },
]

export const tips = [
  'Lead with a testing philosophy (confidence per effort, behavior over implementation).',
  'Mock at boundaries (MSW for network); never mock the unit under test.',
  'Keep E2E few and flake-free with auto-waiting; push detail down to integration tests.',
]
