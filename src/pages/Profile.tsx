import { useState } from 'react'
import Badge from '@components/Badge'
import { useFSKStore } from '@store/useFSKStore'

export default function Profile() {
  const badges = useFSKStore(state => state.badges)
  const streak = useFSKStore(state => state.streakDays)
  const xp = useFSKStore(state => state.xp)
  const exportState = useFSKStore(state => state.exportState)
  const importState = useFSKStore(state => state.importState)
  const [importText, setImportText] = useState('')
  const [message, setMessage] = useState('')

  const handleExport = async () => {
    const data = exportState()
    try {
      await navigator.clipboard.writeText(data)
      setMessage('Progress copied to clipboard.')
    } catch {
      setImportText(data)
      setMessage('Clipboard is unavailable. Your progress JSON is in the box so you can copy it.')
    }
  }

  return (
    <div className="space-y-6">
      <div className="fsk-surface p-6">
        <p className="text-pine">Learning Streak</p>
        <p className="text-gray-700 text-2xl">{streak} {streak === 1 ? 'day' : 'days'}</p>
        <p className="mt-4 text-pine">Growth Points</p>
        <p className="text-gray-700 text-2xl">{xp}</p>
      </div>
      <div className="fsk-surface p-6">
        <p className="text-pine">Badges</p>
        <div className="mt-3">
          {badges.length === 0 ? <p className="text-gray-700">Your badges will appear here as you learn.</p> : badges.map(badge => <Badge key={badge} label={badge} />)}
        </div>
      </div>
      <div className="fsk-surface p-6">
        <p className="text-pine">Progress Data</p>
        <p className="mt-1 text-sm text-gray-700">Copy your progress to keep a backup, or paste a saved backup below.</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button className="rounded-2xl bg-fsk-ocean px-3 py-2 text-white" onClick={handleExport}>Copy progress</button>
          <textarea
            className="min-h-24 w-full flex-1 rounded-2xl border px-3 py-2"
            aria-label="Progress JSON to import or copy"
            placeholder="Paste a saved progress backup here"
            value={importText}
            onChange={event => setImportText(event.target.value)}
          />
          <button className="rounded-2xl bg-fsk-dusk px-3 py-2 text-white" onClick={() => {
            if (importState(importText)) setMessage('Progress imported successfully.')
            else setMessage('That progress backup could not be imported. Check the text and try again.')
          }}>Import progress</button>
        </div>
        {message && <p className="mt-3 text-sm text-gray-700" role="status">{message}</p>}
      </div>
    </div>
  )
}
