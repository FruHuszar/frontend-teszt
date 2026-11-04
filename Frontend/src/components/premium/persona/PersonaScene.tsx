import PersonaCharacter from './PersonaCharacter'

// Placeholder for the 3D background (three.js), fills the screen behind the UI
function PersonaScene() {
  return (
    <div
      data-el="Persona Scene"
      aria-hidden="true"
      className="fixed inset-0 -z-10 bg-linear-to-b from-slate-900 to-rose-950"
    >
      <PersonaCharacter />
    </div>
  )
}

export default PersonaScene
