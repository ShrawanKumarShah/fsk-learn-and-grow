import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import levelsData from '@data/levels.json'

export type Question = {
  id: string
  type: 'mcq' | 'reflection' | 'short'
  prompt: string
  options?: string[]
  answerIndex?: number | null
}

export type MicroLesson = {
  id: string
  title: string
  objective: string
  body: string
  audioScript: string
  imagePrompt: string
  task: { description: string, time: string }
  journalPrompt: string
  quiz: Question[]
}

export type Module = {
  id: number
  title: string
  microLessons: MicroLesson[]
  challenge: string
}

export type Level = {
  id: number
  title: string
  topic: string
  notes: string
  summary: string
  dailyHabits?: string[]
  modules?: Module[]
  test: {
    questions: Question[]
    passingScore: number
  }
  badgesOnCompletion?: string[]
}

type LevelProgress = {
  score: number
  passed: boolean
  reflections: Record<string, string>
}

type ModuleKey = `${number}-${number}`
type LessonKey = `${number}-${number}-${string}`

type Theme = 'light' | 'dark'

type FSKState = {
  levels: Level[]
  unlockedLevelId: number
  progress: Record<number, LevelProgress>
  moduleProgress: Record<ModuleKey, { completedLessons: number, totalLessons: number, challengeDone: boolean }>
  completedLessons: Record<LessonKey, boolean>
  xp: number
  streakDays: number
  lastActiveDate: string | null
  badges: string[]
  theme: Theme
  wisdomIndex: number
  journal: Record<number, string[]>
  unlockNext: (levelId: number) => void
  submitTest: (levelId: number, score: number, reflections: Record<string, string>) => void
  setTheme: (t: Theme) => void
  incrementStreak: () => void
  importState: (data: string) => boolean
  exportState: () => string
  addJournalEntry: (levelId: number, entry: string) => void
  completeLesson: (levelId: number, moduleId: number, lessonId: string) => void
  completeChallenge: (levelId: number, moduleId: number) => void
}

const initialUnlocked = 1
const localDateKey = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export const useFSKStore = create<FSKState>()(
  persist(
    (set, get) => ({
      levels: levelsData as Level[],
      unlockedLevelId: initialUnlocked,
      progress: {},
      moduleProgress: {},
      completedLessons: {},
      xp: 0,
      streakDays: 0,
      lastActiveDate: null,
      badges: [],
      theme: 'light',
      wisdomIndex: 0,
      journal: {},
      unlockNext: (levelId) => {
        const { levels } = get()
        const idx = levels.findIndex(l => l.id === levelId)
        if (idx >= 0 && idx < levels.length - 1) {
          const nextId = levels[idx + 1].id
          set({ unlockedLevelId: Math.max(get().unlockedLevelId, nextId) })
        }
      },
      submitTest: (levelId, score, reflections) => {
        const level = get().levels.find(l => l.id === levelId)
        if (!level) return
        const passed = score >= level.test.passingScore
        set(state => {
          const previous = state.progress[levelId]
          const alreadyPassed = previous?.passed ?? false
          const xpReward = !previous ? (passed ? 50 : 10) : (!alreadyPassed && passed ? 40 : 0)
          return {
            progress: {
              ...state.progress,
              [levelId]: {
                score: Math.max(previous?.score ?? 0, score),
                passed: alreadyPassed || passed,
                reflections: { ...previous?.reflections, ...reflections }
              }
            },
            badges: passed ? Array.from(new Set([...state.badges, `Level ${levelId} Passed`, ...(level.badgesOnCompletion ?? [])])) : state.badges,
            xp: state.xp + xpReward
          }
        })
        if (passed) get().unlockNext(levelId)
      },
      setTheme: (t) => set({ theme: t }),
      incrementStreak: () => {
        const now = new Date()
        const today = localDateKey(now)
        const last = get().lastActiveDate
        if (last === today) return
        const yesterdayDate = new Date(now)
        yesterdayDate.setDate(yesterdayDate.getDate() - 1)
        const yesterday = localDateKey(yesterdayDate)
        const next = last === yesterday ? get().streakDays + 1 : 1
        set({ streakDays: next, lastActiveDate: today })
      },
      importState: (data: string) => {
        try {
          const parsed = JSON.parse(data) as Partial<FSKState>
          set(state => ({
            unlockedLevelId: Math.max(parsed.unlockedLevelId ?? state.unlockedLevelId, initialUnlocked),
            progress: parsed.progress ?? state.progress,
            moduleProgress: parsed.moduleProgress ?? state.moduleProgress,
            completedLessons: parsed.completedLessons ?? state.completedLessons,
            xp: parsed.xp ?? state.xp,
            streakDays: parsed.streakDays ?? state.streakDays,
            lastActiveDate: parsed.lastActiveDate ?? state.lastActiveDate,
            badges: parsed.badges ?? state.badges,
            theme: parsed.theme ?? state.theme,
            wisdomIndex: parsed.wisdomIndex ?? state.wisdomIndex,
            journal: parsed.journal ?? state.journal
          }))
          return true
        } catch {
          return false
        }
      },
      exportState: () => {
        const { unlockedLevelId, progress, moduleProgress, completedLessons, xp, streakDays, lastActiveDate, badges, theme, wisdomIndex, journal } = get()
        return JSON.stringify({ unlockedLevelId, progress, moduleProgress, completedLessons, xp, streakDays, lastActiveDate, badges, theme, wisdomIndex, journal }, null, 2)
      },
      addJournalEntry: (levelId, entry) => {
        set(state => ({
          journal: {
            ...state.journal,
            [levelId]: [...(state.journal[levelId] ?? []), entry]
          }
        }))
      },
      completeLesson: (levelId, moduleId, lessonId) => {
        const key: LessonKey = `${levelId}-${moduleId}-${lessonId}`
        if (get().completedLessons[key]) return
        const modKey: ModuleKey = `${levelId}-${moduleId}`
        const level = get().levels.find(l => l.id === levelId)
        const total = level?.modules?.find(m => m.id === moduleId)?.microLessons.length ?? 0
        set(state => {
          const prev = state.moduleProgress[modKey] ?? { completedLessons: 0, totalLessons: total, challengeDone: false }
          return {
            completedLessons: { ...state.completedLessons, [key]: true },
            moduleProgress: { ...state.moduleProgress, [modKey]: { ...prev, completedLessons: Math.min(prev.completedLessons + 1, total) } },
            xp: state.xp + 10
          }
        })
      },
      completeChallenge: (levelId, moduleId) => {
        const modKey: ModuleKey = `${levelId}-${moduleId}`
        const level = get().levels.find(l => l.id === levelId)
        const total = level?.modules?.find(m => m.id === moduleId)?.microLessons.length ?? 0
        set(state => {
          const prev = state.moduleProgress[modKey] ?? { completedLessons: 0, totalLessons: total, challengeDone: false }
          if (prev.challengeDone) return state
          return {
            moduleProgress: { ...state.moduleProgress, [modKey]: { ...prev, challengeDone: true } },
            xp: state.xp + 30
          }
        })
      }
    }),
    {
      name: 'fsk-learn-grow',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        unlockedLevelId: state.unlockedLevelId,
        progress: state.progress,
        moduleProgress: state.moduleProgress,
        completedLessons: state.completedLessons,
        xp: state.xp,
        streakDays: state.streakDays,
        lastActiveDate: state.lastActiveDate,
        badges: state.badges,
        theme: state.theme,
        wisdomIndex: state.wisdomIndex,
        journal: state.journal
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...(persistedState as Partial<FSKState>),
        levels: currentState.levels
      })
    }
  )
)
