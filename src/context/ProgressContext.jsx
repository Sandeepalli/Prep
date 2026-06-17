import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const ProgressContext = createContext()
const STORAGE_KEY = 'prep.progress.v1'

const defaultState = {
  completed: {},   // id -> true (topics/cards/problems marked done)
  bookmarks: {},   // id -> true
  quizScores: {},  // quizId -> { best, last, attempts }
  cardReview: {},  // cardId -> { box, due } (Leitner spaced repetition)
  notes: {},       // id -> string
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) }
  } catch {
    return defaultState
  }
}

export function ProgressProvider({ children }) {
  const [state, setState] = useState(load)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const toggleComplete = useCallback((id) => {
    setState((s) => {
      const completed = { ...s.completed }
      if (completed[id]) delete completed[id]
      else completed[id] = true
      return { ...s, completed }
    })
  }, [])

  const setComplete = useCallback((id, value) => {
    setState((s) => {
      const completed = { ...s.completed }
      if (value) completed[id] = true
      else delete completed[id]
      return { ...s, completed }
    })
  }, [])

  const toggleBookmark = useCallback((id) => {
    setState((s) => {
      const bookmarks = { ...s.bookmarks }
      if (bookmarks[id]) delete bookmarks[id]
      else bookmarks[id] = true
      return { ...s, bookmarks }
    })
  }, [])

  const recordQuiz = useCallback((quizId, score, total) => {
    setState((s) => {
      const prev = s.quizScores[quizId] || { best: 0, attempts: 0 }
      const pct = Math.round((score / total) * 100)
      return {
        ...s,
        quizScores: {
          ...s.quizScores,
          [quizId]: {
            best: Math.max(prev.best, pct),
            last: pct,
            attempts: prev.attempts + 1,
            total,
            score,
          },
        },
      }
    })
  }, [])

  // Leitner system: box 1..5, correct -> box+1, wrong -> box 1
  const reviewCard = useCallback((cardId, knewIt) => {
    setState((s) => {
      const prev = s.cardReview[cardId] || { box: 1 }
      const box = knewIt ? Math.min(prev.box + 1, 5) : 1
      return {
        ...s,
        cardReview: { ...s.cardReview, [cardId]: { box, reviewedAt: Date.now() } },
      }
    })
  }, [])

  const setNote = useCallback((id, text) => {
    setState((s) => ({ ...s, notes: { ...s.notes, [id]: text } }))
  }, [])

  const resetAll = useCallback(() => setState(defaultState), [])

  const value = useMemo(
    () => ({
      ...state,
      toggleComplete,
      setComplete,
      toggleBookmark,
      recordQuiz,
      reviewCard,
      setNote,
      resetAll,
    }),
    [state, toggleComplete, setComplete, toggleBookmark, recordQuiz, reviewCard, setNote, resetAll],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export const useProgress = () => useContext(ProgressContext)
