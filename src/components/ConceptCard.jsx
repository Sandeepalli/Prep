import { useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import { CheckIcon, StarIcon, ArrowIcon } from './Icons'

const tagColor = {
  core: 'bg-brand-500/15 text-brand-300',
  async: 'bg-fuchsia-500/15 text-fuchsia-300',
  typescript: 'bg-sky-500/15 text-sky-300',
  performance: 'bg-amber-500/15 text-amber-300',
  state: 'bg-emerald-500/15 text-emerald-300',
  patterns: 'bg-purple-500/15 text-purple-300',
  quality: 'bg-teal-500/15 text-teal-300',
  architecture: 'bg-indigo-500/15 text-indigo-300',
  security: 'bg-rose-500/15 text-rose-300',
  networking: 'bg-cyan-500/15 text-cyan-300',
  rendering: 'bg-orange-500/15 text-orange-300',
  accessibility: 'bg-lime-500/15 text-lime-300',
  css: 'bg-pink-500/15 text-pink-300',
  runtime: 'bg-green-500/15 text-green-300',
  ops: 'bg-slate-500/20 text-slate-300',
  fundamentals: 'bg-brand-500/15 text-brand-300',
  leadership: 'bg-amber-500/15 text-amber-300',
  people: 'bg-emerald-500/15 text-emerald-300',
  collaboration: 'bg-sky-500/15 text-sky-300',
  ownership: 'bg-purple-500/15 text-purple-300',
  lld: 'bg-indigo-500/15 text-indigo-300',
  databases: 'bg-cyan-500/15 text-cyan-300',
  distributed: 'bg-fuchsia-500/15 text-fuchsia-300',
}

export default function ConceptCard({ item, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen)
  const { completed, toggleComplete, bookmarks, toggleBookmark } = useProgress()
  const done = !!completed[item.id]
  const marked = !!bookmarks[item.id]

  return (
    <div className={`card overflow-hidden transition-all ${done ? 'ring-1 ring-accent-500/40' : ''}`}>
      <div className="flex items-start gap-3 p-4 sm:p-5">
        <button
          onClick={() => toggleComplete(item.id)}
          aria-label={done ? 'Mark incomplete' : 'Mark complete'}
          className={`mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-colors ${
            done ? 'border-accent-500 bg-accent-500 text-ink-900' : 'border-white/20 text-transparent hover:border-brand-400'
          }`}
        >
          <CheckIcon size={16} />
        </button>

        <button className="min-w-0 flex-1 text-left" onClick={() => setOpen((o) => !o)}>
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold leading-snug">{item.title}</h3>
            <ArrowIcon size={18} className={`shrink-0 text-slate-500 transition-transform ${open ? 'rotate-90' : ''}`} />
          </div>
          {item.tags?.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1.5">
              {item.tags.map((t) => (
                <span key={t} className={`chip ${tagColor[t] || 'bg-white/10 text-slate-300'}`}>{t}</span>
              ))}
            </div>
          )}
          {!open && <p className="mt-2 line-clamp-2 text-sm text-slate-400">{item.summary}</p>}
        </button>

        <button
          onClick={() => toggleBookmark(item.id)}
          aria-label="Bookmark"
          className={`mt-0.5 shrink-0 transition-colors ${marked ? 'text-amber-400' : 'text-slate-600 hover:text-slate-400'}`}
        >
          <StarIcon size={18} />
        </button>
      </div>

      {open && (
        <div className="animate-fade-in border-t border-white/5 px-4 pb-5 pt-4 sm:px-5">
          <p className="text-sm leading-relaxed text-slate-300">{item.summary}</p>
          {item.points?.length > 0 && (
            <ul className="mt-3 space-y-2">
              {item.points.map((pt, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-400">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
