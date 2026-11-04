import { Fragment, useEffect, useRef, useState } from 'react'
import { PREMIUM } from './components/premium/registry'
import type { PremiumTheme } from './models/premium'

const routines = [
  { id: 'r1', title: 'Morning meditation', reward: '+20 XP · +10 coins · +5 Soul', done: true },
  { id: 'r2', title: 'Deep work 4 hours', reward: '+60 XP · +25 coins · +8 Study', done: true },
  { id: 'r3', title: 'Evening workout', reward: '+40 XP · +15 coins · +6 Health', done: false },
]

const todos = [
  { id: 't1', title: 'Finish thesis chapter', reward: '+50 XP · +20 coins · +6 Study', done: false },
  { id: 't2', title: 'Call grandma', reward: '+15 XP · +5 coins · +4 Social', done: true },
  { id: 't3', title: 'Clean the room', reward: '+20 XP · +8 coins · +3 Soul', done: false },
]

const todaySessions = [
  { id: 's1', title: 'Mind Reset', subtitle: '30 min meditation', start: '09:00', end: '09:30', startLabel: '9:00 AM', endLabel: '9:30 AM', enabled: true },
  { id: 's2', title: 'Deep Work', subtitle: 'Focus sprint', start: '11:00', end: '15:00', startLabel: '11:00 AM', endLabel: '3:00 PM', enabled: true },
  { id: 's3', title: 'Workout', subtitle: 'Evening routine', start: '18:00', end: '19:00', startLabel: '6:00 PM', endLabel: '7:00 PM', enabled: false },
  { id: 's4', title: 'Wind Down', subtitle: 'Reading', start: '21:30', end: '22:00', startLabel: '9:30 PM', endLabel: '10:00 PM', enabled: false },
]

const upcomingSessions = [
  { id: 'u1', title: 'Language Practice', subtitle: 'Flashcards', start: '2026-11-05T08:00', end: '2026-11-05T08:30', startLabel: 'Thu 8:00 AM', endLabel: '8:30 AM', enabled: true },
  { id: 'u2', title: 'Long Run', subtitle: '10 km', start: '2026-11-07T07:00', end: '2026-11-07T08:00', startLabel: 'Sat 7:00 AM', endLabel: '8:00 AM', enabled: false },
]

function App() {
  const [questTab, setQuestTab] = useState<'routines' | 'todos'>('routines')
  const [sessionTab, setSessionTab] = useState<'today' | 'upcoming'>('today')
  const [theme, setTheme] = useState('default')
  const [themeModalOpen, setThemeModalOpen] = useState(false)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const shownQuests = questTab === 'routines' ? routines : todos
  const shownSessions = sessionTab === 'today' ? todaySessions : upcomingSessions

  const premium: PremiumTheme | undefined = PREMIUM[theme]
  const ThemeLayout = premium ? premium.Layout : Fragment

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (themeModalOpen && !dialog.open) dialog.showModal()
    if (!themeModalOpen && dialog.open) dialog.close()
  }, [themeModalOpen])

  function chooseTheme(key: string) {
    setTheme(key)
    setThemeModalOpen(false)
  }

  return (
    <div className="flex min-h-dvh flex-col gap-4 pt-4 pb-24 lg:h-dvh lg:overflow-hidden lg:pb-4">
      <header
        data-el="Header"
        className="mx-auto flex w-[90vw] flex-col items-center gap-x-6 gap-y-3 rounded-3xl bg-(--color-theme-moduls) px-6 py-3 sm:flex-row sm:flex-wrap sm:justify-between md:flex-nowrap md:rounded-full md:py-2"
      >
        <div data-el="Profile" className="flex items-center gap-3">
          <img
            data-el="Profile image"
            src="/src/assets/images/levi_avatar.jpg"
            className="size-12 shrink-0 rounded-full"
            alt="Profile image, you"
          />
          <div className="flex flex-col">
            <span data-el="Name">Huszár Levi</span>
            <span data-el="Level" className="text-sm">Lvl 91</span>
          </div>
        </div>

        <div data-el="XP" className="order-last flex w-full items-center gap-3 md:order-none md:max-w-md md:flex-1">
          <div
            data-el="XP Bar"
            role="progressbar"
            aria-label="Experience points"
            aria-valuemin={0}
            aria-valuemax={3400}
            aria-valuenow={2108}
            className="h-2 flex-1 rounded-full bg-gray-200"
          >
            <div className="h-full rounded-full bg-(image:--gradient)" style={{ width: 'max(1em, 62%)' }} />
          </div>
          <span data-el="XP Text" className="shrink-0 text-sm">2108 / 3400 XP</span>
        </div>

        <nav data-el="User menu" aria-label="User menu">
          <ul className="flex flex-wrap items-center justify-center gap-1">
            <li>
              <button type="button" aria-label="Notifications" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">notifications</span>
              </button>
            </li>
            <li>
              <button type="button" aria-label="Dashboard layout" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">grid_view</span>
              </button>
            </li>
            <li data-el="Coins" className="flex items-center gap-1 px-2">
              <span aria-hidden="true" className="material-symbols-outlined">monetization_on</span>
              <data value="6767">6767</data>
              <span className="sr-only">coins</span>
            </li>
            <li>
              <button
                type="button"
                aria-label="Change theme"
                onClick={() => setThemeModalOpen(true)}
                className="grid size-10 place-items-center rounded-full"
              >
                <span aria-hidden="true" className="material-symbols-outlined">palette</span>
              </button>
            </li>
            <li>
              <button type="button" aria-label="Shop" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">shopping_cart</span>
              </button>
            </li>
            <li className="basis-full text-center sm:basis-auto">
              <button type="button" className="px-3 py-2 text-sm">Log out</button>
            </li>
          </ul>
        </nav>
      </header>

      <ThemeLayout>
        <main
          data-el="Dashboard"
          className="mx-auto grid w-[90vw] flex-1 grid-cols-1 gap-4 md:grid-cols-2 lg:min-h-0 lg:grid-cols-3 lg:grid-rows-2"
        >
          <section
            data-el="Music Player"
            aria-labelledby="player-title"
            className="flex flex-col gap-3 rounded-3xl bg-(--color-theme-moduls) p-5 lg:col-start-1 lg:row-start-1 lg:min-h-0 lg:overflow-y-auto"
          >
            <h2 id="player-title">Music Player</h2>
            <div data-el="Waveform" aria-hidden="true" className="min-h-16 flex-1 rounded-xl border border-dashed" />
            <p className="self-end text-sm">
              <time dateTime="PT1M10S">1:10</time> / <time dateTime="PT3M44S">3:44</time>
            </p>
            <div role="group" aria-label="Playback controls" className="flex items-center justify-center gap-4">
              <button type="button" aria-label="Previous track" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">skip_previous</span>
              </button>
              <button type="button" aria-label="Play" className="grid size-12 place-items-center rounded-full border">
                <span aria-hidden="true" className="material-symbols-outlined">play_arrow</span>
              </button>
              <button type="button" aria-label="Next track" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">skip_next</span>
              </button>
            </div>
          </section>

          <section
            data-el="Today's Sessions"
            aria-labelledby="sessions-title"
            className="flex flex-col gap-3 rounded-3xl bg-(--color-theme-moduls) p-5 lg:col-start-1 lg:row-start-2 lg:min-h-0 lg:overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 id="sessions-title">Today's Sessions</h2>
              <span data-el="Session count" className="grid size-7 place-items-center rounded-full border text-sm">
                {todaySessions.length}
                <span className="sr-only"> sessions today</span>
              </span>
            </div>

            <div role="tablist" aria-label="Session range" className="grid grid-cols-2 gap-1 rounded-full border p-1">
              <button
                type="button"
                role="tab"
                id="tab-today"
                aria-selected={sessionTab === 'today'}
                aria-controls="sessions-panel"
                onClick={() => setSessionTab('today')}
                className="rounded-full py-1 aria-selected:bg-current/15"
              >
                Today's Sessions
              </button>
              <button
                type="button"
                role="tab"
                id="tab-upcoming"
                aria-selected={sessionTab === 'upcoming'}
                aria-controls="sessions-panel"
                onClick={() => setSessionTab('upcoming')}
                className="rounded-full py-1 aria-selected:bg-current/15"
              >
                Upcoming
              </button>
            </div>

            <div
              id="sessions-panel"
              role="tabpanel"
              aria-labelledby={sessionTab === 'today' ? 'tab-today' : 'tab-upcoming'}
              className="min-h-0 flex-1 overflow-y-auto"
            >
              <ol className="ml-1.5 flex flex-col gap-3 border-l">
                {shownSessions.map((session) => (
                  <li key={session.id} className="relative flex items-center gap-3 py-1 pl-5">
                    <span aria-hidden="true" className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rounded-full border bg-(--color-theme-moduls)" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate">{session.title}</p>
                      <p className="truncate text-xs">{session.subtitle}</p>
                    </div>
                    <p className="flex shrink-0 flex-col items-end text-xs">
                      <time dateTime={session.start}>{session.startLabel}</time>
                      <span className="sr-only">to</span>
                      <time dateTime={session.end}>{session.endLabel}</time>
                    </p>
                    <input
                      type="checkbox"
                      role="switch"
                      aria-label={`Enable ${session.title}`}
                      defaultChecked={session.enabled}
                      className="size-5 shrink-0"
                    />
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <section
            data-el="Balance Radar"
            aria-labelledby="radar-title"
            className="flex flex-col gap-4 rounded-3xl bg-(--color-theme-moduls) p-5 md:col-span-2 lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:min-h-0 lg:overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 id="radar-title">Balance Radar</h2>
              <button type="button" aria-label="Edit balance categories" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">edit</span>
              </button>
            </div>
            <figure className="grid flex-1 place-items-center lg:min-h-0">
              <div data-el="Radar Chart" className="aspect-square w-full max-w-sm rounded-full border border-dashed" />
              <figcaption className="sr-only">Balance across Soul, Social, Health, Study and Productivity</figcaption>
            </figure>
          </section>

          <section
            data-el="Today's Quests"
            aria-labelledby="quests-title"
            className="flex flex-col gap-3 rounded-3xl bg-(--color-theme-moduls) p-5 lg:col-start-3 lg:row-start-1 lg:min-h-0 lg:overflow-y-auto"
          >
            <div className="flex items-center justify-between">
              <h2 id="quests-title">Today's Quests</h2>
              <a href="#" className="text-sm">View All</a>
            </div>

            <div role="tablist" aria-label="Quest type" className="grid grid-cols-2 gap-1 rounded-full border p-1">
              <button
                type="button"
                role="tab"
                id="tab-routines"
                aria-selected={questTab === 'routines'}
                aria-controls="quests-panel"
                onClick={() => setQuestTab('routines')}
                className="rounded-full py-1 aria-selected:bg-current/15"
              >
                Routines
              </button>
              <button
                type="button"
                role="tab"
                id="tab-todos"
                aria-selected={questTab === 'todos'}
                aria-controls="quests-panel"
                onClick={() => setQuestTab('todos')}
                className="rounded-full py-1 aria-selected:bg-current/15"
              >
                To-dos
              </button>
            </div>

            <div
              id="quests-panel"
              role="tabpanel"
              aria-labelledby={questTab === 'routines' ? 'tab-routines' : 'tab-todos'}
              className="min-h-0 flex-1 overflow-y-auto"
            >
              <ul className="flex flex-col gap-2">
                {shownQuests.map((quest) => (
                  <li key={quest.id} className="rounded-2xl border px-4 py-2">
                    <label className="group flex cursor-pointer items-center gap-3">
                      <input type="checkbox" defaultChecked={quest.done} className="size-5 shrink-0" />
                      <span className="flex flex-col">
                        <span className="group-has-checked:line-through">{quest.title}</span>
                        <span className="text-xs">{quest.reward}</span>
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section
            data-el="Streak"
            aria-labelledby="streak-title"
            className="flex flex-col gap-4 rounded-3xl bg-(--color-theme-moduls) p-5 lg:col-start-3 lg:row-start-2 lg:min-h-0 lg:overflow-y-auto"
          >
            <h2 id="streak-title">Streak</h2>
            <span aria-hidden="true" className="material-symbols-outlined self-center">local_fire_department</span>
            <p data-el="Streak count" className="mt-auto flex items-baseline gap-2">
              <span className="text-6xl">14</span>
              day streak
            </p>
            <button type="button" className="flex items-center gap-2 self-start rounded-full border px-4 py-2">
              <span aria-hidden="true" className="material-symbols-outlined">ac_unit</span>
              Freeze for today
            </button>
          </section>
        </main>
      </ThemeLayout>

      <button
        type="button"
        data-el="Mixer button"
        aria-label="Open mixer"
        className="fixed right-6 bottom-6 grid size-14 place-items-center rounded-full border bg-(--color-theme-moduls)"
      >
        <span aria-hidden="true" className="material-symbols-outlined">tune</span>
      </button>

      <dialog
        ref={dialogRef}
        data-el="Theme Modal"
        aria-labelledby="theme-modal-title"
        onClose={() => setThemeModalOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setThemeModalOpen(false)
        }}
        className="m-auto w-[min(90vw,32rem)] rounded-3xl bg-(--color-theme-moduls) text-inherit backdrop:bg-black/50"
      >
        <div className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <h2 id="theme-modal-title">Themes</h2>
            <form method="dialog">
              <button aria-label="Close" className="grid size-10 place-items-center rounded-full">
                <span aria-hidden="true" className="material-symbols-outlined">close</span>
              </button>
            </form>
          </div>

          <ul className="grid grid-cols-2 gap-3">
            <li>
              <button
                type="button"
                aria-pressed={theme === 'default'}
                onClick={() => chooseTheme('default')}
                className="w-full rounded-2xl border p-4 aria-pressed:bg-current/15"
              >
                Default
              </button>
            </li>
            {Object.values(PREMIUM).map((premiumTheme) => (
              <li key={premiumTheme.key}>
                <button
                  type="button"
                  aria-pressed={theme === premiumTheme.key}
                  onClick={() => chooseTheme(premiumTheme.key)}
                  className="w-full rounded-2xl border p-4 aria-pressed:bg-current/15"
                >
                  {premiumTheme.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  )
}

export default App