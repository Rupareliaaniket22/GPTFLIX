import React, { useEffect } from 'react';
import UserDropDown from './UserDropDown';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/Constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid, displayName, email }));
        if (location.pathname === '/') navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/');
      }
    });
    return () => unsubscribe();
  }, [dispatch]);
  const location = useLocation();
  return (
    <div
      className={`w-screen absolute  flex  justify-between pl-2 pt-4   md:px-2 sm:pl-5 ${location.pathname !== '/' ? 'md:pl-10 sm:pl-5' : 'lg:pl-48 landscape:pl-36'} bg-gradient-to-b  bg-opacity-70 z-50 from-black`}
    >
      <img
        src={LOGO}
        alt="logo"
        className="sm:w-44 sm:h-20 w-28 h-18 object-contain cursor-pointer "
        onClick={() => {
          if (location.pathname !== '/') {
            navigate('/browse');
          }
        }}
      ></img>
      {location.pathname !== '/' && <UserDropDown />}
    </div>
  );
};

export default Header;
