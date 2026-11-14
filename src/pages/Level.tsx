import { Link, useParams } from 'react-router-dom'
import { useFSKStore } from '@store/useFSKStore'

export default function Level() {
  const { id } = useParams()
  const levelId = Number(id)
  const level = useFSKStore(state => state.levels.find(item => item.id === levelId))
  const journal = useFSKStore(state => state.journal[levelId] ?? [])
  const addJournalEntry = useFSKStore(state => state.addJournalEntry)

  if (!level) return <div className="fsk-surface p-6">Level not found.</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/path" className="fsk-pill">Back to Path</Link>
        <div className="flex gap-2">
          <Link to={`/level/${level.id}/modules`} className="fsk-button">Lessons</Link>
          <Link to={`/test/${level.id}`} className="fsk-button">Level check</Link>
        </div>
      </div>
      <section className="fsk-surface p-6">
        <h2 className="text-pine text-lg">{level.title}</h2>
        <p className="mt-2 text-gray-700">Topic: {level.topic}</p>
        <p className="mt-4 text-gray-700">{level.notes}</p>
        {level.dailyHabits?.length ? <div className="mt-4">
          <p className="text-pine font-medium">Try each day</p>
          <ul className="mt-2 list-disc list-inside text-gray-700">{level.dailyHabits.map((habit, index) => <li key={index}>{habit}</li>)}</ul>
        </div> : null}
      </section>
      <section className="fsk-surface p-6">
        <p className="text-pine font-medium">What you’ll learn</p>
        <p className="mt-2 text-gray-700">{level.summary}</p>
      </section>
      <section className="fsk-surface p-6">
        <p className="text-pine font-medium">My thoughts</p>
        <form className="mt-3 flex items-center gap-2" onSubmit={event => {
          event.preventDefault()
          const form = event.currentTarget
          const entry = new FormData(form).get('entry')?.toString().trim()
          if (entry) addJournalEntry(levelId, entry)
          form.reset()
        }}>
          <input name="entry" className="flex-1 px-3 py-2 rounded-2xl border" placeholder="Write a thought..." />
          <button className="fsk-button">Save thought</button>
        </form>
        <ul className="mt-3 space-y-2">{journal.slice(-5).map((entry, index) => <li key={index} className="px-3 py-2 rounded-2xl bg-fsk-sky/40 text-gray-700">{entry}</li>)}</ul>
      </section>
    </div>
  )
}
