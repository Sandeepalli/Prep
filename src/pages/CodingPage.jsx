import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { patterns, problems, codingTips } from '../data/coding'
import { CheckIcon, StarIcon, ArrowIcon, SearchIcon, PlayIcon } from '../components/Icons'

const diffColor = {
  Easy: 'bg-accent-500/15 text-accent-400',
  Medium: 'bg-amber-500/15 text-amber-300',
  Hard: 'bg-rose-500/15 text-rose-300',
}

function ProblemCard({ p }) {
  const [open, setOpen] = useState(false)
  const { completed, toggleComplete, bookmarks, toggleBookmark } = useProgress()
  const done = !!completed[p.id]
  const marked = !!bookmarks[p.id]

  return (
    <div className={`card overflow-hidden ${done ? 'ring-1 ring-accent-500/40' : ''}`}>
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <button
          onClick={() => toggleComplete(p.id)}
          aria-label="Mark solved"
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
            done ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-white/20 text-transparent hover:border-brand-400'
          }`}
        >
          <CheckIcon size={16} />
        </button>
        <button className="min-w-0 flex-1 text-left" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{p.title}</h3>
            <ArrowIcon size={18} className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className={`chip ${diffColor[p.difficulty]}`}>{p.difficulty}</span>
            <span className="chip bg-white/10 text-slate-300">{p.pattern}</span>
          </div>
          <p className="mt-2 text-sm text-slate-400">{p.statement}</p>
        </button>
        <button
          onClick={() => toggleBookmark(p.id)}
          aria-label="Bookmark"
          className={`mt-0.5 shrink-0 ${marked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <StarIcon size={18} />
        </button>
      </div>
      {open && (
        <div className="animate-fade-in space-y-3 border-t border-white/5 px-4 pb-5 pt-4 sm:px-5">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-brand-300">Approach</h4>
            <p className="mt-1 text-sm text-slate-300">{p.approach}</p>
          </div>
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-accent-400">Complexity</h4>
            <p className="mt-1 font-mono text-sm text-slate-300">{p.complexity}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default function CodingPage() {
  const [query, setQuery] = useState('')
  const [diff, setDiff] = useState('All')

  const filtered = useMemo(() => {
    return problems.filter((p) => {
      const matchesQ =
        !query ||
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.pattern.toLowerCase().includes(query.toLowerCase())
      const matchesD = diff === 'All' || p.difficulty === diff
      return matchesQ && matchesD
    })
  }, [query, diff])

  return (
    <div>
      <PageHeader
        title="Coding & DSA"
        blurb="Patterns and curated problems with approaches and complexity — JS-friendly."
        icon="code"
        color="from-teal-400 to-emerald-600"
        trackId="coding"
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Link to="/playground" className="btn-primary"><PlayIcon size={16} /> Open Playground</Link>
        <Link to="/flashcards?deck=coding" className="btn-ghost">Flashcards</Link>
        <Link to="/quizzes?quiz=coding" className="btn-ghost">Quiz</Link>
      </div>

      {/* Patterns */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Patterns</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {patterns.map((pat) => (
            <div key={pat.id} className="card p-4">
              <h3 className="font-semibold text-brand-300">{pat.name}</h3>
              <p className="mt-1 text-sm text-slate-300">{pat.idea}</p>
              <p className="mt-2 text-xs text-slate-500"><span className="font-semibold text-slate-400">Use when:</span> {pat.when}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Problems */}
      <section>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-bold">Problems</h2>
          <div className="flex flex-wrap gap-2">
            <div className="relative">
              <SearchIcon size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search problems…"
                className="rounded-xl border border-white/10 bg-ink-700/60 py-2 pl-9 pr-3 text-sm outline-none focus:border-brand-400/50"
              />
            </div>
            <div className="flex gap-1 rounded-xl border border-white/10 bg-ink-700/60 p-1">
              {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
                <button
                  key={d}
                  onClick={() => setDiff(d)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                    diff === d ? 'bg-brand-500 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-3">
          {filtered.map((p) => (
            <ProblemCard key={p.id} p={p} />
          ))}
          {filtered.length === 0 && (
            <p className="card p-8 text-center text-sm text-slate-500">No problems match your filters.</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <div className="card border-accent-400/20 bg-accent-500/5 p-5">
          <h3 className="mb-3 font-bold text-accent-400">Interview Tips</h3>
          <ul className="space-y-2">
            {codingTips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
