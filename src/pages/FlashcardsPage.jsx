import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { decks } from '../data/flashcards'
import { RefreshIcon, CheckIcon, CloseIcon } from '../components/Icons'

export default function FlashcardsPage() {
  const [params, setParams] = useSearchParams()
  const deckParam = params.get('deck')
  const initial = decks.find((d) => d.track === deckParam) || decks[0]

  const [deckId, setDeckId] = useState(initial.id)
  const deck = useMemo(() => decks.find((d) => d.id === deckId), [deckId])
  const { cardReview, reviewCard } = useProgress()

  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [sessionStats, setSessionStats] = useState({ known: 0, review: 0 })

  // Reset session when deck changes
  useEffect(() => {
    setIndex(0)
    setFlipped(false)
    setSessionStats({ known: 0, review: 0 })
  }, [deckId])

  const card = deck.cards[index]
  const isLast = index === deck.cards.length - 1
  const finished = index >= deck.cards.length

  const handleResult = (knewIt) => {
    reviewCard(card.id, knewIt)
    setSessionStats((s) => ({
      known: s.known + (knewIt ? 1 : 0),
      review: s.review + (knewIt ? 0 : 1),
    }))
    setFlipped(false)
    setIndex((i) => i + 1)
  }

  const restart = () => {
    setIndex(0)
    setFlipped(false)
    setSessionStats({ known: 0, review: 0 })
  }

  const changeDeck = (id) => {
    setDeckId(id)
    const d = decks.find((x) => x.id === id)
    if (d) setParams({ deck: d.track }, { replace: true })
  }

  return (
    <div>
      <PageHeader title="Flashcards" blurb="Flip, self-assess, and let spaced repetition (Leitner boxes) focus your review." icon="code" color="from-fuchsia-500 to-purple-700" />

      {/* Deck selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {decks.map((d) => (
          <button
            key={d.id}
            onClick={() => changeDeck(d.id)}
            className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              d.id === deckId ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {d.title}
            <span className="ml-2 text-xs opacity-70">{d.cards.length}</span>
          </button>
        ))}
      </div>

      {!finished ? (
        <div className="mx-auto max-w-2xl">
          {/* Progress */}
          <div className="mb-4 flex items-center justify-between text-sm text-slate-400">
            <span>Card {index + 1} of {deck.cards.length}</span>
            <span className="flex gap-3">
              <span className="text-accent-400">✓ {sessionStats.known}</span>
              <span className="text-amber-400">↻ {sessionStats.review}</span>
            </span>
          </div>
          <div className="mb-6 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 transition-all duration-500" style={{ width: `${(index / deck.cards.length) * 100}%` }} />
          </div>

          {/* Card */}
          <div className="perspective">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="preserve-3d relative block h-72 w-full text-left transition-transform duration-500"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front */}
              <div className="backface-hidden absolute inset-0 flex flex-col justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-ink-700 to-ink-800 p-8 shadow-xl">
                <span className="text-xs uppercase tracking-wider text-fuchsia-300">Question</span>
                <p className="mt-3 text-xl font-semibold leading-snug">{card.q}</p>
                <span className="absolute bottom-4 right-5 text-xs text-slate-500">Tap to flip</span>
              </div>
              {/* Back */}
              <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col justify-center overflow-auto rounded-2xl border border-brand-400/30 bg-gradient-to-br from-brand-900/40 to-ink-800 p-8 shadow-xl">
                <span className="text-xs uppercase tracking-wider text-brand-300">Answer</span>
                <p className="mt-3 text-base leading-relaxed text-slate-200">{card.a}</p>
              </div>
            </button>
          </div>

          {/* Controls */}
          <div className="mt-6">
            {flipped ? (
              <div className="grid grid-cols-2 gap-3">
                <button onClick={() => handleResult(false)} className="btn bg-amber-500/15 text-amber-300 hover:bg-amber-500/25">
                  <CloseIcon size={16} /> Review again
                </button>
                <button onClick={() => handleResult(true)} className="btn-accent">
                  <CheckIcon size={16} /> {isLast ? 'I knew it · Finish' : 'I knew it'}
                </button>
              </div>
            ) : (
              <button onClick={() => setFlipped(true)} className="btn-primary w-full">Show answer</button>
            )}
            <p className="mt-3 text-center text-xs text-slate-500">
              Leitner box for this card: <span className="font-semibold text-brand-300">{cardReview[card.id]?.box || 1}</span> / 5
            </p>
          </div>
        </div>
      ) : (
        <div className="mx-auto max-w-md text-center">
          <div className="card p-8">
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent-500/15 text-accent-400">
              <CheckIcon size={32} />
            </div>
            <h2 className="mt-4 text-xl font-bold">Deck complete!</h2>
            <p className="mt-2 text-sm text-slate-400">
              You knew <span className="font-semibold text-accent-400">{sessionStats.known}</span> and want to review{' '}
              <span className="font-semibold text-amber-400">{sessionStats.review}</span>.
            </p>
            <button onClick={restart} className="btn-primary mt-6 w-full"><RefreshIcon size={16} /> Review deck again</button>
          </div>
        </div>
      )}
    </div>
  )
}
