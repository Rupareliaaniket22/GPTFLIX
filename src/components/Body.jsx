import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';
import Footer from './Footer';
// Lazy-loaded components
import('./Login'));
const Browse = lazy(() => import('./Browse'));
const MoviePage = lazy(() => import('./MoviePage'));
const NotFound = lazy(() => import('./NotFound'));

// Custom Loading Fallback Component
const LoadingFallback = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="relative">
        {/* Netflix-style loading animation */}
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-red-600 mt-4 text-xl font-semibold">Loading...</p>
      </div>
    </div>
  );
};

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Login />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/browse',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <Browse />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/browse/:type/:id/:listName',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <MoviePage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '/browse/:type/:id',
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <MoviePage />
        </Suspense>
      </ErrorBoundary>
    ),
  },
  {
    path: '*', // Catch all unknown routes
    element: (
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <NotFound />
        </Suspense>
      </ErrorBoundary>
    ),
  },
]);

const Body = () => {

  return (
    <div className="bg-[#141414] min-h-screen text-white">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
