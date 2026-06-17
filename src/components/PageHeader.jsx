import { useProgress } from '../context/ProgressContext'
import { trackProgress } from '../data/registry'
import TrackIcon from './TrackIcon'

export default function PageHeader({ title, blurb, icon, trackId, color = 'from-brand-500 to-brand-700' }) {
  const { completed } = useProgress()
  const p = trackId ? trackProgress(trackId, completed) : null

  return (
    <header className="mb-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          {icon && (
            <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}>
              <TrackIcon name={icon} size={24} />
            </span>
          )}
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
            {blurb && <p className="mt-1 max-w-2xl text-sm text-slate-400">{blurb}</p>}
          </div>
        </div>
        {p && p.total > 0 && (
          <div className="card flex items-center gap-3 px-4 py-3">
            <div className="text-right">
              <p className="text-2xl font-bold text-brand-300">{p.pct}%</p>
              <p className="text-xs text-slate-500">{p.done}/{p.total} done</p>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
