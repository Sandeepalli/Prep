import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import ConceptCard from '../components/ConceptCard'
import { useProgress } from '../context/ProgressContext'
import { fundamentals, caseStudies, sdChecklist } from '../data/systemDesign'
import { CheckIcon, StarIcon, ArrowIcon } from '../components/Icons'

const diffColor = {
  'Warm-up': 'bg-accent-500/15 text-accent-400',
  Core: 'bg-brand-500/15 text-brand-300',
  Advanced: 'bg-rose-500/15 text-rose-300',
}

function CaseStudyCard({ cs }) {
  const [open, setOpen] = useState(false)
  const { completed, toggleComplete, bookmarks, toggleBookmark } = useProgress()
  const done = !!completed[cs.id]
  const marked = !!bookmarks[cs.id]

  return (
    <div className={`card overflow-hidden ${done ? 'ring-1 ring-accent-500/40' : ''}`}>
      <div className="flex items-start gap-3 p-5">
        <button
          onClick={() => toggleComplete(cs.id)}
          aria-label="Mark complete"
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
            done ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-white/20 text-transparent hover:border-brand-400'
          }`}
        >
          <CheckIcon size={16} />
        </button>
        <button className="min-w-0 flex-1 text-left" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold">{cs.title}</h3>
            <ArrowIcon size={18} className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} />
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-1.5">
            <span className={`chip ${diffColor[cs.difficulty] || 'bg-white/10'}`}>{cs.difficulty}</span>
          </div>
          <p className="mt-2 text-sm text-slate-400">{cs.prompt}</p>
        </button>
        <button
          onClick={() => toggleBookmark(cs.id)}
          aria-label="Bookmark"
          className={`mt-0.5 shrink-0 ${marked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <StarIcon size={18} />
        </button>
      </div>

      {open && (
        <div className="animate-fade-in space-y-5 border-t border-white/5 px-5 pb-6 pt-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-accent-400">Functional</h4>
              <ul className="space-y-1.5">
                {cs.requirements.functional.map((r, i) => (
                  <li key={i} className="text-sm text-slate-400">• {r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-fuchsia-300">Non-functional</h4>
              <ul className="space-y-1.5">
                {cs.requirements.nonFunctional.map((r, i) => (
                  <li key={i} className="text-sm text-slate-400">• {r}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-brand-300">Approach</h4>
            <ol className="space-y-2">
              {cs.steps.map((s, i) => (
                <li key={i} className="flex gap-3 text-sm text-slate-300">
                  <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-[11px] font-bold text-brand-300">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-amber-300">Trade-offs</h4>
            <ul className="space-y-1.5">
              {cs.tradeoffs.map((t, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SystemDesignPage() {
  return (
    <div>
      <PageHeader
        title="Frontend System Design"
        blurb="Architect non-trivial UI features end to end: requirements, data, components, state, and performance."
        icon="server"
        color="from-brand-500 to-brand-700"
        trackId="system-design"
      />

      <section className="mb-8">
        <div className="card border-brand-400/20 bg-brand-500/5 p-5">
          <h2 className="mb-3 font-bold text-brand-300">Interview Checklist</h2>
          <ol className="grid gap-2 sm:grid-cols-2">
            {sdChecklist.map((c, i) => (
              <li key={i} className="flex gap-3 text-sm text-slate-300">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-500/20 text-[11px] font-bold text-brand-300">{i + 1}</span>
                <span>{c}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-lg font-bold">Fundamentals</h2>
        <div className="grid gap-3">
          {fundamentals.map((item) => (
            <ConceptCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-bold">Case Studies</h2>
        <div className="grid gap-3">
          {caseStudies.map((cs) => (
            <CaseStudyCard key={cs.id} cs={cs} />
          ))}
        </div>
      </section>
    </div>
  )
}
