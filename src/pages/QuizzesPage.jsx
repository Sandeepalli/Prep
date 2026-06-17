import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { useProgress } from '../context/ProgressContext'
import { quizzes } from '../data/quizzes'
import { CheckIcon, CloseIcon, RefreshIcon } from '../components/Icons'

export default function QuizzesPage() {
  const [params, setParams] = useSearchParams()
  const quizParam = params.get('quiz')
  const initial = quizzes.find((q) => q.track === quizParam) || quizzes[0]

  const [quizId, setQuizId] = useState(initial.id)
  const quiz = useMemo(() => quizzes.find((q) => q.id === quizId), [quizId])
  const { quizScores, recordQuiz } = useProgress()

  const [answers, setAnswers] = useState({}) // questionId -> chosen index
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setAnswers({})
    setSubmitted(false)
  }, [quizId])

  const score = quiz.questions.reduce((acc, q) => acc + (answers[q.id] === q.correct ? 1 : 0), 0)
  const total = quiz.questions.length
  const allAnswered = Object.keys(answers).length === total

  const submit = () => {
    setSubmitted(true)
    recordQuiz(quiz.id, score, total)
  }

  const retry = () => {
    setAnswers({})
    setSubmitted(false)
  }

  const changeQuiz = (id) => {
    setQuizId(id)
    const q = quizzes.find((x) => x.id === id)
    if (q) setParams({ quiz: q.track }, { replace: true })
  }

  const best = quizScores[quiz.id]?.best

  return (
    <div>
      <PageHeader title="Quizzes" blurb="Test your recall with scored multiple-choice quizzes. Best scores are saved." icon="code" color="from-accent-500 to-accent-600" />

      {/* Quiz selector */}
      <div className="mb-6 flex flex-wrap gap-2">
        {quizzes.map((q) => (
          <button
            key={q.id}
            onClick={() => changeQuiz(q.id)}
            className={`rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
              q.id === quizId ? 'bg-brand-500 text-white' : 'bg-white/5 text-slate-400 hover:bg-white/10'
            }`}
          >
            {q.title}
            {quizScores[q.id]?.best != null && (
              <span className="ml-2 text-xs text-accent-400">{quizScores[q.id].best}%</span>
            )}
          </button>
        ))}
      </div>

      <div className="mx-auto max-w-2xl">
        {/* Result banner */}
        {submitted && (
          <div className="card mb-6 p-6 text-center">
            <p className="text-sm text-slate-400">You scored</p>
            <p className={`mt-1 text-4xl font-extrabold ${score / total >= 0.7 ? 'text-accent-400' : 'text-amber-300'}`}>
              {Math.round((score / total) * 100)}%
            </p>
            <p className="mt-1 text-sm text-slate-400">{score} / {total} correct{best != null && ` · best ${best}%`}</p>
            <button onClick={retry} className="btn-primary mt-4"><RefreshIcon size={16} /> Retry</button>
          </div>
        )}

        {/* Questions */}
        <div className="space-y-4">
          {quiz.questions.map((q, qi) => {
            const chosen = answers[q.id]
            return (
              <div key={q.id} className="card p-5">
                <p className="font-semibold">
                  <span className="mr-2 text-brand-300">{qi + 1}.</span>{q.q}
                </p>
                <div className="mt-3 grid gap-2">
                  {q.options.map((opt, oi) => {
                    const isChosen = chosen === oi
                    const isCorrect = q.correct === oi
                    let cls = 'border-white/10 hover:border-brand-400/50'
                    if (submitted) {
                      if (isCorrect) cls = 'border-accent-500 bg-accent-500/10'
                      else if (isChosen) cls = 'border-rose-500 bg-rose-500/10'
                      else cls = 'border-white/5 opacity-60'
                    } else if (isChosen) {
                      cls = 'border-brand-400 bg-brand-500/10'
                    }
                    return (
                      <button
                        key={oi}
                        disabled={submitted}
                        onClick={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
                        className={`flex items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm transition-colors ${cls}`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckIcon size={16} className="shrink-0 text-accent-400" />}
                        {submitted && isChosen && !isCorrect && <CloseIcon size={16} className="shrink-0 text-rose-400" />}
                      </button>
                    )
                  })}
                </div>
                {submitted && (
                  <p className="mt-3 rounded-lg bg-white/5 p-3 text-xs text-slate-400">
                    <span className="font-semibold text-slate-300">Why: </span>{q.explain}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {!submitted && (
          <button onClick={submit} disabled={!allAnswered} className="btn-primary mt-6 w-full">
            {allAnswered ? 'Submit answers' : `Answer all ${total} questions`}
          </button>
        )}
      </div>
    </div>
  )
}
