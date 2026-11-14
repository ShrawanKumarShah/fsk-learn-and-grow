import { Link, useParams } from 'react-router-dom'
import { useFSKStore } from '@store/useFSKStore'

export default function Modules() {
  const { id } = useParams()
  const levelId = Number(id)
  const level = useFSKStore(state => state.levels.find(item => item.id === levelId))
  const moduleProgress = useFSKStore(state => state.moduleProgress)
  const completedLessons = useFSKStore(state => state.completedLessons)
  const completeChallenge = useFSKStore(state => state.completeChallenge)
  const modules = level?.modules ?? []

  if (!level) return <div className="fsk-surface p-6">Level not found.</div>

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link to={`/level/${level.id}`} className="fsk-pill">Back to level</Link>
        <h2 className="text-pine font-medium">{level.title} · Lessons</h2>
      </div>
      {modules.length === 0 ? (
        <div className="fsk-surface p-6 text-gray-700">Lessons for this level are coming soon.</div>
      ) : modules.map(module => {
        const key = `${level.id}-${module.id}` as const
        const progress = moduleProgress[key]
        const completedCount = module.microLessons.filter(lesson => completedLessons[`${level.id}-${module.id}-${lesson.id}`]).length
        return (
          <section key={module.id} className="fsk-surface p-5 space-y-3">
            <h3 className="text-pine font-medium">Part {module.id}: {module.title}</h3>
            <p className="text-sm text-gray-600">{completedCount} of {module.microLessons.length} lessons done</p>
            <ul className="space-y-2">
              {module.microLessons.map((lesson, index) => (
                <li key={lesson.id} className="flex items-center justify-between gap-3">
                  <span className="text-gray-700">{index + 1}. {lesson.title}</span>
                  <div className="flex items-center gap-2">
                    {completedLessons[`${level.id}-${module.id}-${lesson.id}`] && <span className="fsk-pill">Done</span>}
                    <Link className="fsk-button" to={`/level/${level.id}/module/${module.id}/lesson/${lesson.id}`}>{completedLessons[`${level.id}-${module.id}-${lesson.id}`] ? 'Read again' : 'Start lesson'}</Link>
                  </div>
                </li>
              ))}
            </ul>
            <div className="rounded-2xl bg-fsk-sky/30 p-3">
              <p className="text-pine font-medium">Try it this week</p>
              <p className="mt-1 text-gray-700">{module.challenge}</p>
              <label className="mt-3 flex items-center gap-2 text-gray-700">
                <input type="checkbox" checked={progress?.challengeDone ?? false} disabled={progress?.challengeDone ?? false} onChange={() => completeChallenge(level.id, module.id)} />
                I did this challenge
              </label>
            </div>
          </section>
        )
      })}
    </div>
  )
}
