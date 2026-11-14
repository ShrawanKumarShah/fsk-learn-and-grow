import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import LessonIllustration from '@components/LessonIllustration'
import { useFSKStore } from '@store/useFSKStore'

export default function Lesson() {
  const { levelId: levelIdParam, moduleId: moduleIdParam, lessonId } = useParams()
  const levelId = Number(levelIdParam)
  const moduleId = Number(moduleIdParam)
  const level = useFSKStore(state => state.levels.find(item => item.id === levelId))
  const completeLesson = useFSKStore(state => state.completeLesson)
  const addJournalEntry = useFSKStore(state => state.addJournalEntry)
  const [reflection, setReflection] = useState('')
  const [saved, setSaved] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({})

  const module = level?.modules?.find(item => item.id === moduleId)
  const lesson = module?.microLessons.find(item => item.id === lessonId)
  const completed = useFSKStore(state => state.completedLessons[`${levelId}-${moduleId}-${lessonId}`] ?? false)

  if (!level || !module || !lesson) return <div className="fsk-surface p-6">Lesson not found.</div>

  return (
    <article className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to={`/level/${level.id}/modules`} className="fsk-pill">Back to modules</Link>
        <span className="text-sm text-gray-600">{module.title}</span>
      </div>
      <section className="fsk-surface p-6 space-y-3">
        <h2 className="text-pine text-xl">{lesson.title}</h2>
        <LessonIllustration lessonId={lesson.id} title={lesson.title} />
        <p className="text-gray-700"><strong>What you’ll learn:</strong> {lesson.objective}</p>
        <p className="text-gray-700 whitespace-pre-wrap">{lesson.body}</p>
        {lesson.task && <div className="rounded-2xl bg-fsk-sky/30 p-4"><p className="text-pine font-medium">Try it · {lesson.task.time}</p><p className="mt-1 text-gray-700">{lesson.task.description}</p></div>}
        {lesson.quiz.length > 0 && <div className="space-y-4">
          <h3 className="text-pine font-medium">Quick question</h3>
          {lesson.quiz.map(question => {
            const selected = quizAnswers[question.id]
            const correct = selected === question.answerIndex
            return <fieldset key={question.id} className="rounded-2xl border border-fsk-sky/70 p-4">
              <legend className="px-1 text-gray-800">{question.prompt}</legend>
              <div className="mt-2 space-y-2">
                {question.options?.map((option, index) => <label key={option} className="flex cursor-pointer items-start gap-2 text-gray-700">
                  <input type="radio" name={question.id} checked={selected === index} onChange={() => setQuizAnswers(answers => ({ ...answers, [question.id]: index }))} />
                  <span>{option}</span>
                </label>)}
              </div>
              {selected !== undefined && <p className={`mt-3 text-sm font-medium ${correct ? 'text-green-700' : 'text-amber-700'}`} aria-live="polite">
                {correct ? 'That’s right. Keep going.' : 'Not quite yet. Choose another answer and try again.'}
              </p>}
            </fieldset>
          })}
        </div>}
      </section>
      <section className="fsk-surface p-6">
        <label className="block text-pine font-medium" htmlFor="lesson-reflection">Think about it</label>
        <p className="mt-1 text-gray-700">{lesson.journalPrompt}</p>
        <textarea id="lesson-reflection" className="mt-3 w-full rounded-2xl border px-3 py-2" value={reflection} onChange={event => setReflection(event.target.value)} placeholder="Write a few thoughts..." />
        <div className="mt-3 flex items-center justify-between gap-3">
          <button className="fsk-pill" disabled={!reflection.trim()} onClick={() => { addJournalEntry(level.id, reflection.trim()); setReflection(''); setSaved(true) }}>Save my thought</button>
          <button className="fsk-button" disabled={completed} onClick={() => completeLesson(level.id, module.id, lesson.id)}>{completed ? 'Lesson done' : 'I finished this lesson'}</button>
        </div>
        {saved && <p className="mt-2 text-sm text-green-700">Reflection saved to your level journal.</p>}
      </section>
    </article>
  )
}
