import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import { logoutUser } from '../../services/auth.services';

const ProfileSettings = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { setUser } = useContext(AuthContext);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const onLogout = () => {
    logoutUser()
      .then(() => {
        setUser({
          user: null
        })
      })
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className={`block mt-5 text-gray-800 hover:bg-indigo-500 hover:text-white"`}
          id="menu-button"
          aria-expanded={showDropdown}
          aria-haspopup="true"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          UserProfile
          <svg
            className={`-mr-1 h-5 w-5 ${showDropdown ? 'text-gray-900' : 'text-gray-400'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {showDropdown && (
        <div
          className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
        >
          <div className="py-1" role="none">
            <Link to="/newPost" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
              New Post
            </Link>
            <Link to="/settings" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
              Settings
            </Link>
            <Link to="/" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3"
              onClick={onLogout} >
              log Out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileSettings;