import { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { tracks, trackGroups } from '../data/tracks'
import TrackIcon from './TrackIcon'
import { useTheme } from '../context/ThemeContext'
import { useProgress } from '../context/ProgressContext'
import { overallProgress } from '../data/registry'
import {
  HomeIcon, CardsIcon, QuizIcon, PlayIcon, SunIcon, MoonIcon, MenuIcon, CloseIcon, ChevronIcon, BookIcon,
} from './Icons'

const navMain = [
  { to: '/', label: 'Dashboard', icon: HomeIcon, end: true },
  { to: '/interview-qa', label: 'Interview Q&A', icon: BookIcon },
]
const navTools = [
  { to: '/flashcards', label: 'Flashcards', icon: CardsIcon },
  { to: '/quizzes', label: 'Quizzes', icon: QuizIcon },
  { to: '/playground', label: 'Code Playground', icon: PlayIcon },
]

function NavItem({ to, label, icon: Icon, end, onClick }) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          isActive
            ? 'bg-brand-500/15 text-brand-300'
            : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
        }`
      }
    >
      <Icon size={18} />
      <span>{label}</span>
    </NavLink>
  )
}

function TrackLink({ track, onClick }) {
  return (
    <NavLink
      to={track.path}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
          isActive ? 'bg-brand-500/15 text-brand-300' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
        }`
      }
    >
      <TrackIcon name={track.icon} size={18} />
      <span className="truncate">{track.title}</span>
    </NavLink>
  )
}

function NavGroup({ title, tracks, defaultOpen, onNavigate }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronIcon size={14} className={`transition-transform ${open ? 'rotate-90' : ''}`} />
      </button>
      {open && (
        <div className="space-y-1">
          {tracks.map((t) => (
            <TrackLink key={t.id} track={t} onClick={onNavigate} />
          ))}
        </div>
      )}
    </div>
  )
}

function ThemeToggle({ className = '' }) {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label="Toggle light/dark theme"
      title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`grid place-items-center rounded-lg p-2 text-slate-300 transition-colors hover:bg-white/10 ${className}`}
    >
      {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  )
}

export default function Layout({ children }) {
  const [open, setOpen] = useState(false)
  const { completed } = useProgress()
  const overall = overallProgress(completed)
  const close = () => setOpen(false)

  return (
    <div className="min-h-screen">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-white/5 bg-ink-900/80 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-extrabold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-500 text-white">P</span>
          PrepDeck
        </Link>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <button className="btn-ghost p-2" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px]">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r border-white/5 bg-ink-800/95 p-4 backdrop-blur transition-transform lg:static lg:translate-x-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="hidden lg:flex items-center justify-between px-2 pb-6 pt-2">
            <div className="flex items-center gap-2 text-xl font-extrabold">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-500 text-white">P</span>
              PrepDeck
            </div>
            <ThemeToggle />
          </div>

          <nav className="flex h-[calc(100%-4rem)] flex-col gap-1 overflow-y-auto pb-4">
            {navMain.map((n) => (
              <NavItem key={n.to} {...n} onClick={close} />
            ))}

            {trackGroups.map((group) => (
              <NavGroup
                key={group}
                title={group}
                tracks={tracks.filter((t) => t.group === group)}
                defaultOpen
                onNavigate={close}
              />
            ))}

            <p className="px-3 pb-1 pt-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Practice</p>
            {navTools.map((n) => (
              <NavItem key={n.to} {...n} onClick={close} />
            ))}

            <div className="mt-auto space-y-3 pt-4">
              <div className="card p-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Overall progress</span>
                  <span className="font-semibold text-brand-300">{overall.pct}%</span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-700" style={{ width: `${overall.pct}%` }} />
                </div>
                <p className="mt-1.5 text-[11px] text-slate-500">{overall.done} / {overall.total} topics done</p>
              </div>
            </div>
          </nav>
        </aside>

        {/* Backdrop for mobile */}
        {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={close} />}

        {/* Main content */}
        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">
          <div className="animate-fade-in">{children}</div>
        </main>
      </div>
    </div>
  )
}
