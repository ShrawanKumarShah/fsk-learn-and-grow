import * as Tabs from '@radix-ui/react-tabs'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

const tabs = [
  { value: '/', label: 'Home' },
  { value: '/path', label: 'Path' },
  { value: '/profile', label: 'Profile' }
]

export default function Header() {
  const location = useLocation()
  const current = tabs.find(t => t.value === '/' ? location.pathname === '/' : location.pathname.startsWith(t.value))?.value ?? '/'
  return (
    <div className="fsk-surface px-4 py-3 flex items-center justify-between backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img src="/favicon.svg" alt="FSK" className="h-8 w-8" />
        <span className="text-pine font-semibold">FSK Learn & Grow</span>
      </div>
      <div className="flex items-center gap-4">
        <Tabs.Root value={current} className="hidden sm:block">
          <Tabs.List className="flex gap-2">
            {tabs.map(t => (
              <Tabs.Trigger key={t.value} value={t.value} asChild>
                <Link to={t.value} className="px-3 py-1.5 rounded-2xl hover:bg-fsk-sky/40 text-pine">
                  {t.label}
                </Link>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
        </Tabs.Root>
        <ThemeToggle />
      </div>
    </div>
  )
}
