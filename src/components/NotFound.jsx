import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const NotFound = () => {
  useEffect(() => {
    gsap.fromTo(
      '.not-found-container',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
    );
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white not-found-container">
      <h1 className="text-6xl font-extrabold text-red-500">404</h1>
      <p className="text-gray-400 mt-2 text-lg">Page Not Found</p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
      >
        🔙 Go Home
      </Link>
    </div>
  );
};

export default NotFound;
