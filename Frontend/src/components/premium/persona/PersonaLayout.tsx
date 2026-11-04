import type { ReactNode } from 'react'
import PersonaScene from './PersonaScene'

interface PersonaLayoutProps {
  children: ReactNode
}

// For now: the scene behind, the normal dashboard on top.
// Later the Persona boxes get their own placement here.
function PersonaLayout({ children }: PersonaLayoutProps) {
  return (
    <>
      <PersonaScene />
      {children}
    </>
  )
}

export default PersonaLayout
