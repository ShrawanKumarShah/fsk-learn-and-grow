import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from '@components/Header'
import Home from '@pages/Home'
import Path from '@pages/Path'
import Level from '@pages/Level'
import Test from '@pages/Test'
import Profile from '@pages/Profile'
import Modules from '@pages/Modules'
import Lesson from '@pages/Lesson'
import { useFSKStore } from '@store/useFSKStore'

export default function App() {
  const theme = useFSKStore(s => s.theme)

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      root.style.backgroundColor = '#0b1d2a'
    } else {
      root.classList.remove('dark')
      root.style.backgroundColor = '#ffffff'
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-white fsk-gradient">
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/path" element={<Path />} />
          <Route path="/level/:id" element={<Level />} />
          <Route path="/level/:id/modules" element={<Modules />} />
          <Route path="/level/:levelId/module/:moduleId/lesson/:lessonId" element={<Lesson />} />
          <Route path="/test/:id" element={<Test />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <footer className="text-center text-sm text-gray-600 py-6">Calm • Educational • Growth</footer>
      </div>
    </div>
  )
}