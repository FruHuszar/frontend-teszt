import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <header>
        {/* balra, profile */}
        <div>
          <img src="" alt="Profile image, you"/>
          <span>Huszár Levi</span>
          <span>Lvl 91</span>
          <span>progress bar</span>
        </div>
        {/* jobbra, settings */}
        <div>
          <span>6767 COIN ICON</span>
          <span>THEME ICON</span>
          <span>SHOP ICON</span>
        </div>
      </header>
      {/*dashboard, 3 column*/}
      <section>
        {/* Todo List / Rutin List */}
        {/* Streak */}

        {/* radar chart */}

        {/* Upcoming */}
        {/* Vibe controller, csak ne legyen vibe a neve */}
      </section>
    </>
  )
}

export default App
