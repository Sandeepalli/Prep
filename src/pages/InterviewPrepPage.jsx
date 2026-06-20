import raw from '../data/interviewPrep.md?raw'
import Markdown, { extractHeadings, scrollToId } from '../components/Markdown'
import { BookIcon } from '../components/Icons'

export default function InterviewPrepPage() {
  const headings = extractHeadings(raw)

  return (
    <div>
      {/* Header */}
      <section className="card relative mb-6 overflow-hidden p-6 sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative flex items-start gap-4">
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-indigo-400 to-brand-600 text-white shadow-lg">
            <BookIcon size={24} />
          </span>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Interview Q&amp;A</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              ~200 questions with detailed answers across HTML/CSS, JS, TypeScript, React, Angular,
              state, architecture, performance, AI/RAG, testing/DevOps, and leadership scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* Mobile jump-to */}
      <details className="card mb-6 p-4 lg:hidden">
        <summary className="cursor-pointer text-sm font-semibold text-brand-300">Jump to section</summary>
        <div className="mt-3 grid gap-1">
          {headings.map((h) => (
            <button
              key={h.id}
              onClick={() => scrollToId(h.id)}
              className="rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 hover:bg-white/5 hover:text-slate-200"
            >
              {h.text}
            </button>
          ))}
        </div>
      </details>

      <div className="gap-8 lg:grid lg:grid-cols-[minmax(0,1fr)_240px]">
        {/* Content */}
        <article className="min-w-0 max-w-3xl">
          <Markdown source={raw} />
        </article>

        {/* Desktop sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-6">
            <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">On this page</p>
            <nav className="max-h-[calc(100vh-6rem)] space-y-0.5 overflow-y-auto pr-1">
              {headings.map((h) => (
                <button
                  key={h.id}
                  onClick={() => scrollToId(h.id)}
                  className="block w-full truncate rounded-lg px-2 py-1.5 text-left text-sm text-slate-400 transition-colors hover:bg-white/5 hover:text-slate-200"
                  title={h.text}
                >
                  {h.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  )
}
