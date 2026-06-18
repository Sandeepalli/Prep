import { Link } from 'react-router-dom'
import { tracks, trackGroups } from '../data/tracks'
import TrackIcon from '../components/TrackIcon'
import ProgressRing from '../components/ProgressRing'
import { useProgress } from '../context/ProgressContext'
import { trackProgress, overallProgress } from '../data/registry'
import { quizzes } from '../data/quizzes'
import { CardsIcon, QuizIcon, PlayIcon, ArrowIcon, RefreshIcon } from '../components/Icons'

function StatCard({ label, value, sub }) {
  return (
    <div className="card p-4">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-extrabold">{value}</p>
      {sub && <p className="text-xs text-slate-500">{sub}</p>}
    </div>
  )
}

export default function Dashboard() {
  const progress = useProgress()
  const { completed, bookmarks, quizScores, resetAll } = progress
  const overall = overallProgress(completed)
  const bookmarkCount = Object.keys(bookmarks).length
  const quizAttempts = Object.values(quizScores).reduce((a, q) => a + (q.attempts || 0), 0)
  const avgBest = (() => {
    const vals = Object.values(quizScores).map((q) => q.best)
    if (!vals.length) return '—'
    return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) + '%'
  })()

  return (
    <div>
      {/* Hero */}
      <section className="card relative overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-24 h-48 w-48 rounded-full bg-accent-500/10 blur-3xl" />
        <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <span className="chip bg-brand-500/15 text-brand-300">Lead Frontend Track</span>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Welcome back 👋
            </h1>
            <p className="mt-2 max-w-xl text-slate-400">
              Brush up on concepts, drill system design, and sharpen coding — all in one place.
              Your progress is saved locally in this browser.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/flashcards" className="btn-primary"><CardsIcon size={16} /> Review Flashcards</Link>
              <Link to="/quizzes" className="btn-ghost"><QuizIcon size={16} /> Take a Quiz</Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ProgressRing pct={overall.pct} size={120} stroke={10} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatCard label="Topics done" value={`${overall.done}/${overall.total}`} sub={`${overall.pct}% complete`} />
        <StatCard label="Bookmarks" value={bookmarkCount} sub="saved to revisit" />
        <StatCard label="Quiz attempts" value={quizAttempts} sub={`${Object.keys(quizScores).length} quizzes tried`} />
        <StatCard label="Avg best score" value={avgBest} sub="across quizzes" />
      </section>

      {/* Tracks */}
      <section className="mt-8">
        <h2 className="mb-4 text-lg font-bold">Learning Tracks</h2>
        <div className="space-y-8">
          {trackGroups.map((group) => (
            <div key={group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">{group}</h3>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {tracks.filter((t) => t.group === group).map((t) => {
                  const p = trackProgress(t.id, completed)
                  return (
                    <Link key={t.id} to={t.path} className="card group p-5 transition-all hover:-translate-y-0.5 hover:ring-1 hover:ring-brand-400/40">
                      <div className="flex items-start justify-between">
                        <span className={`grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br ${t.color} text-white shadow-lg`}>
                          <TrackIcon name={t.icon} size={22} />
                        </span>
                        <ArrowIcon size={18} className="text-slate-600 transition-all group-hover:translate-x-1 group-hover:text-brand-300" />
                      </div>
                      <h3 className="mt-4 font-bold">{t.title}</h3>
                      <p className="mt-1 text-sm text-slate-400">{t.blurb}</p>
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span>{p.done}/{p.total} topics</span>
                          <span className="font-semibold text-brand-300">{p.pct}%</span>
                        </div>
                        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                          <div className={`h-full rounded-full bg-gradient-to-r ${t.color} transition-all duration-700`} style={{ width: `${p.pct}%` }} />
                        </div>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practice + reset */}
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <Link to="/playground" className="card flex items-center gap-4 p-5 transition-all hover:ring-1 hover:ring-brand-400/40">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-500/15 text-brand-300"><PlayIcon size={22} /></span>
          <div>
            <h3 className="font-bold">Code Playground</h3>
            <p className="text-sm text-slate-400">Write & run JS in the browser</p>
          </div>
        </Link>
        <Link to="/quizzes" className="card flex items-center gap-4 p-5 transition-all hover:ring-1 hover:ring-brand-400/40">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent-500/15 text-accent-400"><QuizIcon size={22} /></span>
          <div>
            <h3 className="font-bold">{quizzes.length} Quizzes</h3>
            <p className="text-sm text-slate-400">Test yourself, track best scores</p>
          </div>
        </Link>
        <button
          onClick={() => { if (confirm('Reset all progress, bookmarks, and scores?')) resetAll() }}
          className="card flex items-center gap-4 p-5 text-left transition-all hover:ring-1 hover:ring-rose-400/40"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-rose-500/15 text-rose-300"><RefreshIcon size={22} /></span>
          <div>
            <h3 className="font-bold">Reset progress</h3>
            <p className="text-sm text-slate-400">Clear locally saved data</p>
          </div>
        </button>
      </section>
    </div>
  )
}
