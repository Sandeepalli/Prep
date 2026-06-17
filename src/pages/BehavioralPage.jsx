import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ConceptCard from '../components/ConceptCard'
import { useProgress } from '../context/ProgressContext'
import { starFramework, competencies, lld, behavioralTips } from '../data/behavioral'
import { CheckIcon, StarIcon, ArrowIcon } from '../components/Icons'

function CompetencyCard({ c }) {
  const [open, setOpen] = useState(false)
  const { completed, toggleComplete, bookmarks, toggleBookmark, notes, setNote } = useProgress()
  const done = !!completed[c.id]
  const marked = !!bookmarks[c.id]

  return (
    <div className={`card overflow-hidden ${done ? 'ring-1 ring-accent-500/40' : ''}`}>
      <div className="flex items-start gap-3 p-5">
        <button
          onClick={() => toggleComplete(c.id)}
          aria-label="Mark prepared"
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
            done ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-white/20 text-transparent hover:border-brand-400'
          }`}
        >
          <CheckIcon size={16} />
        </button>
        <button className="min-w-0 flex-1 text-left" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{c.title}</h3>
            <ArrowIcon size={18} className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} />
          </div>
          <p className="mt-2 text-sm text-slate-400">{c.summary}</p>
        </button>
        <button
          onClick={() => toggleBookmark(c.id)}
          aria-label="Bookmark"
          className={`mt-0.5 shrink-0 ${marked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <StarIcon size={18} />
        </button>
      </div>
      {open && (
        <div className="animate-fade-in space-y-4 border-t border-white/5 px-5 pb-6 pt-5">
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-300">Likely Questions</h4>
            <ul className="space-y-1.5">
              {c.questions.map((q, i) => (
                <li key={i} className="text-sm text-slate-300">• {q}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-400">What Interviewers Look For</h4>
            <ul className="space-y-1.5">
              {c.signals.map((s, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent-400" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-300">Your STAR Story (saved locally)</h4>
            <textarea
              value={notes[c.id] || ''}
              onChange={(e) => setNote(c.id, e.target.value)}
              placeholder="Draft a concise STAR story for this competency…"
              rows={4}
              className="w-full rounded-xl border border-white/10 bg-ink-700/60 p-3 text-sm outline-none focus:border-brand-400/50"
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default function BehavioralPage() {
  return (
    <div>
      <PageHeader
        title="Leadership & Behavioral"
        blurb="STAR stories, tech-lead signals, and low-level / OO design for lead frontend roles."
        icon="user"
        color="from-amber-500 to-orange-600"
        trackId="behavioral"
      />

      {/* STAR framework */}
      <section className="mb-8">
        <div className="card p-5">
          <h2 className="font-bold text-amber-300">{starFramework.title}</h2>
          <p className="mt-1 text-sm text-slate-400">{starFramework.blurb}</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {starFramework.steps.map((s) => (
              <div key={s.letter} className="rounded-xl border border-white/5 bg-ink-700/40 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-amber-500/20 font-extrabold text-amber-300">{s.letter}</div>
                <h3 className="mt-2 font-semibold">{s.label}</h3>
                <p className="mt-1 text-xs text-slate-400">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competencies */}
      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Competencies & Stories</h2>
        <div className="grid gap-3">
          {competencies.map((c) => (
            <CompetencyCard key={c.id} c={c} />
          ))}
        </div>
      </section>

      {/* LLD */}
      <section>
        <h2 className="mb-3 text-lg font-bold">Low-Level / OO Design</h2>
        <div className="grid gap-3">
          {lld.map((item) => (
            <ConceptCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="card border-amber-400/20 bg-amber-500/5 p-5">
          <h3 className="mb-3 font-bold text-amber-300">Interview Tips</h3>
          <ul className="space-y-2">
            {behavioralTips.map((tip, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-300">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
