// Leadership & behavioral content for lead frontend engineer interviews.

export const starFramework = {
  title: 'The STAR Method',
  blurb:
    'Structure every behavioral answer so it is concrete and outcome-driven. At lead level, emphasize scope, influence, and measurable impact.',
  steps: [
    { letter: 'S', label: 'Situation', desc: 'Set context briefly: team, product, constraints, stakes.' },
    { letter: 'T', label: 'Task', desc: 'Your specific responsibility or the problem you owned.' },
    { letter: 'A', label: 'Action', desc: 'What YOU did — decisions, trade-offs, how you led/influenced others.' },
    { letter: 'R', label: 'Result', desc: 'Quantified outcome + what you learned. Tie back to business/user impact.' },
  ],
}

export const competencies = [
  {
    id: 'beh-leadership',
    title: 'Technical Leadership',
    tags: ['leadership'],
    summary:
      'Leads are judged on how they raise the bar for others, not just their own output. Show ownership of architecture, standards, and outcomes.',
    questions: [
      'Tell me about a time you led a major technical initiative or migration.',
      'How did you set technical direction when the team disagreed?',
      'Describe a time you made a decision with incomplete information.',
    ],
    signals: [
      'Drove an architecture/standard adopted beyond your immediate work.',
      'Balanced delivery pressure with long-term code health.',
      'Made the team better (reviews, RFCs, mentoring), not just shipped features.',
    ],
  },
  {
    id: 'beh-mentoring',
    title: 'Mentoring & Growing Others',
    tags: ['people'],
    summary:
      'A defining lead behavior: multiplying impact through others via mentoring, code review culture, and unblocking.',
    questions: [
      'Tell me about someone you mentored and how they grew.',
      'How do you give difficult feedback?',
      'How do you onboard engineers to a complex frontend codebase?',
    ],
    signals: [
      'Concrete growth story with the other person’s outcome at the center.',
      'Feedback delivered with care + specifics; led to behavior change.',
      'Built lasting practices (docs, pairing, review guidelines), not one-offs.',
    ],
  },
  {
    id: 'beh-conflict',
    title: 'Conflict & Influence Without Authority',
    tags: ['collaboration'],
    summary:
      'Leads align stakeholders and resolve disagreements through influence, data, and empathy — not title.',
    questions: [
      'Describe a disagreement with a PM/designer/another team and how you resolved it.',
      'Tell me about a time you influenced a decision you didn’t own.',
      'How did you handle pushback on a technical proposal?',
    ],
    signals: [
      'Sought to understand the other side; found shared goals.',
      'Used data/prototypes/RFCs to build consensus.',
      'Disagreed-and-committed when overruled, then executed well.',
    ],
  },
  {
    id: 'beh-impact',
    title: 'Ownership, Impact & Failure',
    tags: ['ownership'],
    summary:
      'Show that you take responsibility end to end — including failures — and learn from them.',
    questions: [
      'Tell me about your most impactful project.',
      'Describe a time you failed or a project that went wrong.',
      'Tell me about a hard trade-off between speed and quality.',
    ],
    signals: [
      'Quantified impact (perf, revenue, adoption, dev velocity).',
      'Owns failure without blame; extracted a concrete lesson + change.',
      'Made deliberate, defensible trade-offs.',
    ],
  },
]

export const lld = [
  {
    id: 'lld-framework',
    title: 'Low-Level / OO Design Approach',
    tags: ['lld'],
    summary:
      'LLD interviews test class modeling, SOLID, and design patterns. Drive from requirements → entities → responsibilities → interactions.',
    points: [
      'Identify entities (nouns) and behaviors (verbs); assign single responsibilities.',
      'Apply SOLID; favor composition over inheritance; program to interfaces.',
      'Name relevant design patterns (factory, strategy, observer, state) and why.',
    ],
  },
  {
    id: 'lld-solid',
    title: 'SOLID Principles',
    tags: ['lld'],
    summary:
      'Five principles for maintainable OO code — expected vocabulary for senior/lead candidates.',
    points: [
      'S: Single Responsibility — one reason to change per module.',
      'O: Open/Closed — extend without modifying.',
      'L: Liskov Substitution — subtypes must honor the base contract.',
      'I: Interface Segregation — small, focused interfaces.',
      'D: Dependency Inversion — depend on abstractions, not concretions.',
    ],
  },
  {
    id: 'lld-frontend',
    title: 'Frontend-Flavored LLD',
    tags: ['lld'],
    summary:
      'Frontend LLD often means designing a component API, a state machine, or a reusable widget (e.g. a modal manager, form engine, or event bus).',
    points: [
      'Design clean component contracts (props, controlled vs uncontrolled, composition).',
      'Model complex UI with explicit state machines (idle/loading/success/error).',
      'Example prompts: design a toast/notification system, a drag-and-drop board, a form validation engine.',
    ],
  },
]

export const behavioralTips = [
  'Prepare 6–8 reusable stories; map each to multiple competencies.',
  'Lead with impact and numbers; keep Situation/Task short, expand Action/Result.',
  'Use “I” for your contribution and “we” for team context — be clear which is which.',
  'Have questions ready for the interviewer: team, on-call, frontend roadmap, growth.',
]
