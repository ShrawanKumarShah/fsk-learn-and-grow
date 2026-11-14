import { Link } from 'react-router-dom'
import { useFSKStore } from '@store/useFSKStore'

export default function Path() {
  const levels = useFSKStore(state => state.levels)
  const unlocked = useFSKStore(state => state.unlockedLevelId)
  const progress = useFSKStore(state => state.progress)

  return (
    <div className="space-y-4">
      <p className="px-1 text-sm text-gray-600">Pass a level check to open the next level. Lessons and challenges also help your growth tree grow.</p>
      {levels.map(level => {
        const locked = level.id > unlocked
        const passed = progress[level.id]?.passed
        return <section key={level.id} className="fsk-surface p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-pine font-medium">Level {level.id}: {level.title}</p>
              <p className="text-gray-700">{level.summary}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {passed && <span className="fsk-pill bg-green-100 text-green-700">Check passed</span>}
              {locked ? <span className="fsk-pill">Locked</span> : <>
                <Link to={`/level/${level.id}`} className="fsk-button">Overview</Link>
                <Link to={`/level/${level.id}/modules`} className="fsk-button">Modules</Link>
              </>}
            </div>
          </div>
        </section>
      })}
    </div>
  )
}
