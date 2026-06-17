import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import ConceptCard from '../components/ConceptCard'
import { tracks } from '../data/tracks'
import { CardsIcon, QuizIcon } from '../components/Icons'

// Renders a track made of sections of concept cards, plus tips + practice links.
export default function ConceptTrackPage({ trackId, sections, tips }) {
  const track = tracks.find((t) => t.id === trackId)

  return (
    <div>
      <PageHeader
        title={track.title}
        blurb={track.blurb}
        icon={track.icon}
        color={track.color}
        trackId={trackId}
      />

      <div className="mb-6 flex flex-wrap gap-3">
        <Link to={`/flashcards?deck=${trackId}`} className="btn-ghost"><CardsIcon size={16} /> Flashcards</Link>
        <Link to={`/quizzes?quiz=${trackId}`} className="btn-ghost"><QuizIcon size={16} /> Quiz</Link>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <section key={section.id}>
            <h2 className="mb-3 text-lg font-bold">{section.title}</h2>
            <div className="grid gap-3">
              {section.items.map((item) => (
                <ConceptCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {tips?.length > 0 && (
        <section className="mt-8">
          <div className="card border-brand-400/20 bg-brand-500/5 p-5">
            <h3 className="mb-3 font-bold text-brand-300">Interview Tips</h3>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="flex gap-2 text-sm text-slate-300">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  )
}
