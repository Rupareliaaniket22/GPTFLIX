import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = (error, errorInfo) => {
      console.error('Caught by Error Boundary:', error, errorInfo);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', (event) => {
      console.error('Unhandled Promise Rejection:', event.reason);
      setHasError(true);
    });

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  useEffect(() => {
    if (hasError) {
      gsap.fromTo(
        '.error-container',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      );
      gsap.fromTo(
        '.error-button',
        { scale: 0.8 },
        { scale: 1, duration: 0.5, ease: 'bounce.out', delay: 0.5 }
      );
    }
  }, [hasError]);

  if (hasError) {
    return (
      <div className="h-screen flex flex-col items-center z-50 justify-center bg-black text-white error-container">
        <h1 className="text-4xl font-bold text-red-500">
          ⚠️ Oops! Something went wrong.
        </h1>
        <p className="text-gray-400 mt-3 text-lg">
          We couldn't load this page. Please try again.
        </p>

        {/* Animated Home Button */}
        <Link
          to="/"
          className="error-button mt-6 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold shadow-lg transition-transform transform hover:scale-105"
        >
          🔄 Go Home
        </Link>
      </div>
    );
  }

  return children;
};

export default ErrorBoundary;
