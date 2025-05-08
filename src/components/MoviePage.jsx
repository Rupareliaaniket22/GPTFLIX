import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { API_OPTIONS, genreMap } from '../utils/Constants';
import useGetTrailer from '../hooks/useGetTrailer';
import Header from './Header';
import ShimmerUI from './ShimmerUI';
import { useSelector } from 'react-redux';

const MoviePage = () => {
  const { id, type, listName } = useParams();
  const navigate = useNavigate();
  const cachedMovie = useSelector((state) =>
    state.movies[listName]?.find((m) => String(m.id) === id)
  );

  const [movie, setMovie] = useState(cachedMovie);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(!cachedMovie);
  const { videoUrl } = useGetTrailer(id, type);

  useEffect(() => {
    if (cachedMovie) {
      setMovie(cachedMovie);
      return;
    }

    if (!id || !type) return;

    const fetchMovieDetails = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/${type}/${id}`,
          API_OPTIONS
        );

        if (!response.ok) throw new Error('Failed to fetch movie details');
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching movie:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id, type, cachedMovie]);

  if (error) {
    return (
      <div className="min-h-screen bg-[#141414] flex items-center justify-center">
        <p className="text-red-400 text-center text-lg font-semibold animate-pulse">
          Error: {error}
        </p>
      </div>
    );
  }

  if (isLoading || !movie) return <ShimmerUI />;

  return (
    <>
      <Header />
      <div className="absolute -top-20 text-white pt-10 bg-[#141414] min-h-screen">
        {/* Hero Section with Background */}
        <div className="relative w-screen h-[100vh] overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/70 to-transparent" />
          </div>

          {/* Movie Details Section */}
          <div className="relative z-10 h-full flex items-end">
            <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 pb-24">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 max-w-7xl mx-auto">
                {/* Poster */}
                <div className="flex-shrink-0 animate-fade-in-up">
                  <img
                    className="w-48 sm:w-64 md:w-72 h-auto rounded-xl shadow-2xl border-2 border-gray-800 transform hover:scale-105 transition-transform duration-300"
                    src={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png'
                    }
                    alt={movie.title || movie.name}
                    loading="lazy"
                  />
                </div>

                {/* Movie Details */}
                <div className="flex flex-col gap-4 sm:gap-6 w-full animate-fade-in-up animation-delay-200">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent text-center md:text-left">
                    {movie.title || movie.name}
                  </h1>

                  {/* Meta Info Row */}
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-gray-300">
                    {movie.release_date && (
                      <span>
                        {new Date(
                          movie.release_date || movie.first_air_date
                        ).getFullYear()}
                      </span>
                    )}

                    {movie.runtime && (
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
                        {`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
                      </span>
                    )}

                    {movie.vote_average && (
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
                        <span className="flex items-center gap-1 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-4 h-4"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {movie.vote_average.toFixed(1)}
                        </span>
                      </span>
                    )}

                    {movie.adult && (
                      <span className="flex items-center">
                        <span className="w-1 h-1 bg-gray-500 rounded-full mx-2" />
                        <span className="px-2 py-0.5 bg-red-600 text-white text-xs rounded">
                          18+
                        </span>
                      </span>
                    )}
                  </div>

                  <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl text-center md:text-left">
                    {movie.overview}
                  </p>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {(movie.genre_ids || movie.genres || []).map((genre) => {
                      const genreId =
                        typeof genre === 'object' ? genre.id : genre;
                      return (
                        <span
                          key={genreId}
                          className="bg-gray-800 px-3 py-1 rounded-full text-xs shadow-lg border border-gray-700 hover:border-gray-600 transition-colors duration-300"
                        >
                          {genreMap[genreId] ||
                            (typeof genre === 'object'
                              ? genre.name
                              : 'Unknown')}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Section with Netflix-Style Border */}
        {videoUrl && (
          <div className="relative z-20 px-4 sm:px-6 md:px-10 lg:px-16 -mt-12 mb-12">
            <div className="max-w-5xl mx-auto">
              <div className="relative">
                {/* Netflix-style gradient border */}
                <div className="absolute -inset-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-xl blur-sm opacity-75"></div>

                {/* Trailer container */}
                <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-800 shadow-2xl bg-black">
                  <iframe
                    className="w-full h-full"
                    src={`${videoUrl}&autoplay=1&mute=1&loop=1&controls=1`}
                    title="Movie Trailer"
                    frameBorder="0"
                    allow="autoplay; fullscreen; encrypted-media"
                    allowFullScreen
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information Section */}

        {/* Bottom Fade Effect */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#141414] to-transparent pointer-events-none" />
      </div>
    </>
  );
};

// Reusable Info Block Component
const InfoBlock = ({ label, children, className = '' }) => (
  <div className={className}>
    <span className="block text-xs font-semibold text-red-400 uppercase tracking-wider mb-1">
      {label}
    </span>
    <div className="text-gray-200">{children}</div>
  </div>
);

export default MoviePage;
