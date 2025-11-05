import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext';
import { FiChevronRight, FiUserPlus } from "react-icons/fi";
import "./navbar.css"

const Navbar = () => {
  const { user, logout } = useAuth();
  const [dropdownopen, setDropdownopen] = useState(false);

  const profileLetter = user ? user.username.charAt(0).toUpperCase() :  'U';
  const handleProfileClick = () => {
    setDropdownopen(!dropdownopen);
  }
  const handleLogout = () => {
    logout();
    setDropdownopen(false);
  }
  return (
    <div className="nav-container">
      <div className="navlogo">
        <FiChevronRight size={40} color="blue" />
        CodeCollab
      </div>
      <div className="menu">
        <button id='b1'><FiUserPlus size={20} /> add Collaborators </button>
        <button> Share </button>
        <div className="profile-container">
          <div className="profile" onClick={handleProfileClick} >{profileLetter}</div>
          {dropdownopen && (
            <div className='dropdown'>
              <button>Settings</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>

      </div>

    </div>
  )
}

export default Navbar