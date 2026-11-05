import { useState } from 'react'
import { useUserContext } from '../../hooks/useContexts'
import ProfileModal from '../profile/ProfileModal'

function ProfileBadge() {
  const { user } = useUserContext()
  const [profileOpen, setProfileOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        data-el="Profile"
        aria-label="Open profile"
        onClick={() => setProfileOpen(true)}
        className="flex items-center gap-3 rounded-full pr-3 text-left hover:bg-current/10"
      >
        <img data-el="Profile image" src={user.avatar} alt="" className="size-12 shrink-0 rounded-full object-cover" />
        <span className="flex flex-col">
          <span data-el="Name">{user.name}</span>
          <span data-el="Level" className="text-sm">
            Lvl {user.level}
          </span>
        </span>
      </button>

      {profileOpen && <ProfileModal onClose={() => setProfileOpen(false)} />}
    </>
  )
}

export default ProfileBadge
