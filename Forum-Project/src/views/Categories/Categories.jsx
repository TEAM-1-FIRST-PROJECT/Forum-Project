import React from 'react';
import { useState } from 'react';

export const Categories = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const hideDropdown = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className={`inline-flex w-full justify-center px-3 py-2 text-white text-xl duration-500 mx-4 my-6 md:my-0 focus:outline-none`}
          id="menu-button"
          aria-expanded={showDropdown}
          aria-haspopup="true"
          onMouseEnter={toggleDropdown}
          onMouseLeave={hideDropdown}
        >
          Categories
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
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex="-1"
          onMouseEnter={toggleDropdown}
          onMouseLeave={hideDropdown}
        >
          <div className="py-1" role="none">
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">
              iPhone
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">
              Mac
            </a>
            <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">
              Watch
            </a>
            <form method="POST" action="#" role="none">
              <button type="submit" className="text-gray-700 block w-full px-4 py-2 text-left text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">
                View all
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
