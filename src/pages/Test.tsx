import { useParams, Link } from 'react-router-dom'
import { useFSKStore } from '@store/useFSKStore'
import { useMemo, useState } from 'react'

export default function Test() {
  const { id } = useParams()
  const levelId = Number(id)
  const level = useFSKStore(s => s.levels.find(l => l.id === levelId))
  const levels = useFSKStore(s => s.levels)
  const savedProgress = useFSKStore(s => s.progress[levelId])
  const submitTest = useFSKStore(s => s.submitTest)
  const [answers, setAnswers] = useState<Record<string, number | null>>({})
  const [reflections, setReflections] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const score = useMemo(() => {
    if (!level) return 0
    return level.test.questions.reduce((acc, q) => {
      if (q.type === 'mcq' && q.answerIndex != null) {
        return acc + (answers[q.id] === q.answerIndex ? 1 : 0)
      }
      return acc
    }, 0)
  }, [answers, level])

  if (!level) return <div className="fsk-surface p-6">Level not found.</div>
  if (savedProgress?.passed && !submitted) return <div className="fsk-surface p-6 space-y-3">
    <h2 className="text-pine font-medium">Level check passed</h2>
    <p className="text-gray-700">You already passed this level. Your best score was {savedProgress.score} correct.</p>
    <Link to="/path" className="fsk-button">Go to Path</Link>
  </div>

  const scoredQuestions = level.test.questions.filter(question => question.type === 'mcq' && question.answerIndex != null)
  const answeredCount = scoredQuestions.filter(question => answers[question.id] !== undefined).length
  const passed = score >= level.test.passingScore
  const nextLevel = levels.find(item => item.id > level.id)

  return (
    <div className="space-y-4">
      <div className="fsk-surface p-6">
        <p className="text-pine font-medium">Level check: {level.title}</p>
        <p className="text-gray-700">{answeredCount} of {scoredQuestions.length} questions answered · {score} correct · Pass with {level.test.passingScore} of {scoredQuestions.length}</p>
        {submitted && (
          <div className={`mt-3 px-3 py-2 rounded-2xl ${passed ? 'bg-green-100 text-green-800' : 'bg-fsk-sunrise text-pine'}`}>
            {passed ? nextLevel ? `Great work! You passed and opened Level ${nextLevel.id}.` : 'Great work! You passed the final level.' : 'Not yet. Review your lessons and try again.'}
          </div>
        )}
      </div>
      {level.test.questions.map(q => (
        <div key={q.id} className="fsk-surface p-5">
          <p className="text-gray-800">{q.prompt}</p>
          {q.type === 'mcq' ? (
            <div className="mt-3 space-y-2">
              {q.options?.map((opt, idx) => (
                <label key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={q.id}
                    disabled={submitted}
                    checked={answers[q.id] === idx}
                    onChange={() => setAnswers(a => ({ ...a, [q.id]: idx }))}
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
          ) : (
            <textarea
              className="mt-3 w-full px-3 py-2 rounded-2xl border"
              disabled={submitted}
              placeholder="Reflect calmly..."
              value={reflections[q.id] ?? ''}
              onChange={(e) => setReflections(r => ({ ...r, [q.id]: e.target.value }))}
            />
          )}
        </div>
      ))}
      <div className="flex justify-end gap-2">
        {!submitted ? <button
          className="fsk-button"
          onClick={() => { submitTest(levelId, score, reflections); setSubmitted(true) }}
        >Submit level check</button> : passed ? (
          <Link to="/path" className="fsk-pill">Go to Path</Link>
        ) : (
          <button className="fsk-button" onClick={() => { setAnswers({}); setReflections({}); setSubmitted(false) }}>Try again</button>
        )}
      </div>
    </div>
  )
}
