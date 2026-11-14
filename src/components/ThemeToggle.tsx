import { useFSKStore } from '@store/useFSKStore'

export default function ThemeToggle() {
  const theme = useFSKStore(s => s.theme)
  const setTheme = useFSKStore(s => s.setTheme)
  return (
    <button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="px-3 py-1.5 rounded-2xl bg-fsk-sky/60 hover:bg-fsk-sky text-pine"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  )
}