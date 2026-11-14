import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import WisdomDrops from '@components/WisdomDrops'
import TreeGrowth from '@components/TreeGrowth'
import { useFSKStore } from '@store/useFSKStore'

export default function Home() {
  const incrementStreak = useFSKStore(s => s.incrementStreak)
  const progress = useFSKStore(s => s.progress)
  const levels = useFSKStore(s => s.levels)
  const completedLessons = useFSKStore(s => s.completedLessons)
  const moduleProgress = useFSKStore(s => s.moduleProgress)
  const streakDays = useFSKStore(s => s.streakDays)
  const xp = useFSKStore(s => s.xp)
  useEffect(() => { incrementStreak() }, [incrementStreak])
  const totalSections = levels.reduce((total, level) => total + 1 + (level.modules ?? []).reduce((moduleTotal, module) => moduleTotal + module.microLessons.length + 1, 0), 0)
  const completedSections = levels.reduce((count, level) => {
    const passedTest = progress[level.id]?.passed ? 1 : 0
    const moduleSections = (level.modules ?? []).reduce((moduleCount, module) => {
      const key = `${level.id}-${module.id}` as const
      const lessonsDone = module.microLessons.filter(lesson => completedLessons[`${level.id}-${module.id}-${lesson.id}`]).length
      const challengeDone = moduleProgress[key]?.challengeDone ? 1 : 0
      return moduleCount + lessonsDone + challengeDone
    }, 0)
    return count + passedTest + moduleSections
  }, 0)
  const pct = totalSections === 0 ? 0 : (completedSections / totalSections) * 100
  return (
    <div className="space-y-6">
      <div className="fsk-surface p-6 fsk-gradient">
        <h1 className="text-pine text-xl">Welcome to FSK Learn &amp; Grow</h1>
        <p className="mt-2 text-gray-700">A gentle learning path for young learners: feelings, helpful habits, and kind choices.</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="fsk-pill">Streak {streakDays} {streakDays === 1 ? 'day' : 'days'}</span>
          <span className="fsk-pill">Growth points {xp}</span>
          <Link to="/path" className="fsk-button">Start Learning</Link>
        </div>
      </div>
      <WisdomDrops />
      <TreeGrowth progressPercent={pct} />
      <div className="fsk-surface p-5">
        <p className="text-pine font-medium">A small step for today</p>
        <p className="mt-2 text-gray-700">Choose one idea you learned and try it at home, at school, or with a friend.</p>
      </div>
    </div>
  )
}
