import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import { PresetProvider } from './contexts/PresetContext.tsx'
import { LayoutProvider } from './contexts/LayoutContext.tsx'
import { QuestProvider } from './contexts/QuestContext.tsx'
import { ShopProvider } from './contexts/ShopContext.tsx'
import { PlayerProvider } from './contexts/PlayerContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserProvider>
      <PresetProvider>
        <LayoutProvider>
          <QuestProvider>
            <ShopProvider>
              <PlayerProvider>
                <App />
              </PlayerProvider>
            </ShopProvider>
          </QuestProvider>
        </LayoutProvider>
      </PresetProvider>
    </UserProvider>
  </StrictMode>,
)
