import React, { useState, useRef, useEffect } from 'react';
import { signOut } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../utils/firebase';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { USER_ICON } from '../utils/Constants';
import { IoSearch } from 'react-icons/io5';
import SearchOverlay from './SearchOverlay';
import { clearMovies } from '../utils/moviesSlice';

const UserDropDown = () => {
  const displayName = useSelector((state) => state.user?.displayName);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  // Close dropdown if user clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    signOut(auth);
    dispatch(clearMovies);
  };

  return (
    <div className="p-3  px-5 sm:px-2 md:px-5 flex w-screen gap-1  items-center justify-end   relative">
      {/* Search Icon */}
      <IoSearch
        className="text-white text-2xl md:text-4xl cursor-pointer hover:text-gray-300 transition duration-300"
        onClick={() => setIsSearchOpen(!isSearchOpen)}
      />
      {isSearchOpen && (
        <SearchOverlay
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}

      {/* User Section */}
      <div
        className="flex items-center  cursor-pointer  ml-4 relative"
        ref={dropdownRef}
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <img
          src={USER_ICON}
          alt="UserLogo"
          className="w-8 h-8 md:w-10 md:h-10 rounded-md object-cover border border-gray-300"
        />
        <div className="hidden md:flex flex-col ml-2">
          <span className="text-white text-xs font-light">Hello,</span>
          <span className="text-white text-sm md:text-lg font-semibold">
            {displayName ? displayName.split(' ')[0] : 'User'}
          </span>
        </div>

        {/* Dropdown Menu */}
        {isDropdownOpen && (
          <div className="absolute top-12 right-12 md:right-0 w-full mt-2 shadow-xl rounded-lg transition-all duration-300 opacity-100 z-[999] ">
            <button
              onClick={handleSignOut}
              className="p-1 min-w-20   text-white bg-red-600 font-medium rounded-md hover:bg-red-700 transition z-[999] duration-300 focus:outline-none text-xs md:text-base"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDropDown;
