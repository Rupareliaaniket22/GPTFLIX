import React, { useCallback, useEffect, useState } from 'react';
import { FaEye, FaStar, FaRobot } from 'react-icons/fa';
import {
  IoIosCloseCircle,
  IoIosCloseCircleOutline,
  IoMdClose,
} from 'react-icons/io';
import {
  API_OPTIONS,
  MULTI_SEARCH,
  QWEN_AI_API_OPTIONS,
  TRENDING_ALL,
} from '../utils/constants';
import { set } from 'lodash';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const SearchOverlay = ({ isSearchOpen, setIsSearchOpen }) => {
  const [query, setQuery] = useState('');
  const [useAI, setUseAI] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const placeholderTexts = [
    'Search for movies...',
    "Ask AI: 'Suggest a thriller'",
    "Try: 'Top Bollywood movies'",
    'Find best sci-fi shows',
  ];

  const { trendingAll } = useSelector((state) => state.movies);

  // Prevent body scrolling when overlay is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  async function getMovieSuggestions(query) {
    try {
      const response = await fetch(
        'https://openrouter.ai/api/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${QWEN_AI_API_OPTIONS}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'qwen/qwen-2-72b-instruct',
            messages: [
              {
                role: 'system',
                content:
                  'You are an AI movie recommendation assistant. Return 5 movies and shows as per the user prompt in comma separated format like this Nobody,John Wick,Avengers: Age of Ultron,IT,Internship',
              },
              { role: 'user', content: query },
            ],
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error('API Response Error:', response.status, errorText);
        throw new Error(`API Error: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      const content =
        data.choices?.[0]?.message?.content?.split(',') ||
        'No recommendations found';
      return content;
    } catch (error) {
      console.error('Error fetching movie suggestions:', error.message);
      return [];
    }
  }

  const getData = async (searchQuery) => {
    try {
      const response = await fetch(
        `${MULTI_SEARCH}&query=${encodeURIComponent(
          searchQuery
        )}&language=en-US&page=1&include_adult=false`,
        API_OPTIONS
      );
      if (!response.ok) {
        console.error(`TMDB API Error: ${response.statusText}`);
        return [];
      }
      const results = await response.json();
      return results.results || [];
    } catch (error) {
      console.error('Error fetching TMDB data:', error);
      return [];
    }
  };

  const handleSearch = useCallback(async () => {
    if (!query.trim()) return;
    setLoading(true);
    if (useAI) {
      try {
        const aiSuggestions = await getMovieSuggestions(query);

        if (!aiSuggestions.length) {
          setSuggestions([]);
          return;
        }

        const movieTitles = aiSuggestions;
        const movieDetails = await Promise.all(
          movieTitles.map(async (title) => {
            const results = await getData(title);
            return results.length > 0 ? results[0] : null;
          })
        );

        const validMovies = movieDetails.filter(Boolean);
        setSuggestions(validMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error in AI search:', error);
        setSuggestions([]);
        setError(
          'Error in searching movies Try again or use different keywords '
        );
        setLoading(false);
      }
    } else {
      setLoading(true);
      const results = await getData(query);
      setSuggestions(results);
      setLoading(false);
    }
  }, [useAI, query]);
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [useAI, handleSearch]);

  useEffect(() => {
    if (!useAI && query.length > 2) {
      const timeout = setTimeout(getData, 500);
      getData(query).then((results) => setSuggestions(results));
      return () => clearTimeout(timeout);
    }
  }, [query, useAI]);

  useEffect(() => {
    if (!isInputFocused) {
      const interval = setInterval(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholderTexts.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isInputFocused]);

  return (
    <>
      {isSearchOpen && (
        <div
          className="fixed  inset-0 bg-gradient-to-br from-black via-red-800 to-black bg-opacity-95 flex flex-col items-center justify-start z-[1000] transition-all duration-500 overflow-y-auto px-4 sm:px-6 pt-[calc(env(safe-area-inset-top)+1.5rem)] pb-6"
          onClick={(e) =>
            e.target === e.currentTarget && setIsSearchOpen(false)
          }
        >
          <button
            onClick={() => setIsSearchOpen(false)}
            className="absolute top-4 right-4 text-white text-2xl sm:text-3xl rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center hover:bg-white hover:text-black transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Close search overlay"
          >
            <IoIosCloseCircleOutline />
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-12 mb-6 animate-fade-in text-center">
            Find Your Next Watch
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-3xl animate-fade-in px-2 sm:px-0">
            <div className="relative w-full sm:flex-grow">
              <FaEye className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-500 text-xl sm:text-2xl animate-glow" />
              <input
                type="text"
                className="w-full pl-10 pr-10 py-3 sm:py-4 text-sm sm:text-base bg-gray-800 bg-opacity-70 text-white placeholder-gray-400 rounded-xl border border-gray-700 focus:border-red-600 focus:ring-2 focus:ring-red-500 focus:outline-none shadow-lg transition-all duration-300 hover:bg-opacity-90"
                placeholder={placeholderTexts[placeholderIndex]}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsInputFocused(true)}
                onBlur={() => setIsInputFocused(false)}
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2  text-lg focus:outline-none"
                  aria-label="Clear search"
                >
                  <IoMdClose className="text-gray-400" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 sm:gap-3 mt-3 sm:mt-0">
              <button
                onClick={handleSearch}
                className="px-3 py-2 sm:px-4 sm:py-2 bg-red-600 text-white text-sm sm:text-base rounded-xl hover:bg-red-700 transition-colors duration-300 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {useAI ? 'Ask AI' : 'Search'}
              </button>

              <div className="flex flex-col items-center gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setUseAI(!useAI);
                    setSuggestions([]);
                  }}
                  className={`relative p-2 sm:p-3 rounded-full cursor-pointer transition-all duration-300 ${
                    useAI
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                      : 'bg-gray-700 bg-opacity-50 hover:bg-opacity-70'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  title={useAI ? 'AI Search Enabled' : 'Enable AI Search'}
                >
                  {useAI ? (
                    <FaRobot className="text-xl sm:text-2xl text-white animate-bounce" />
                  ) : (
                    <FaStar className="text-xl sm:text-2xl text-gray-300" />
                  )}
                  {useAI && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-green-400 rounded-full animate-ping"></span>
                  )}
                </button>
                <span className="text-xs text-gray-300 font-medium">
                  Ask AI
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 w-full max-w-4xl text-white animate-fade-in px-2 sm:px-0">
            <h2 className="text-xl sm:text-2xl font-bold tracking-wide flex items-center justify-center gap-2 mb-4">
              <span className="text-xl sm:text-2xl">{!query && '🔥'}</span>
              {!query ? 'Trending Now' : 'Suggestions'}
            </h2>

            {loading ? (
              <p className="text-xl mt-32  sm:text-2xl font-bold tracking-wide flex items-center justify-center gap-2 mb-4 animate animate-pulse">
                Loading...
              </p>
            ) : error ? (
              <p className="text-red-400 text-xl text-center">{error}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                {(query ? suggestions : trendingAll || [])
                  .slice(0, 5)
                  .map((item) => (
                    <button
                      key={item.id}
                      onClick={() =>
                        navigate(`/browse/${item.media_type}/${item.id}`)
                      }
                      className="group relative p-2 sm:p-3 bg-gray-800 bg-opacity-60 rounded-lg hover:bg-opacity-80 transition-all duration-300 shadow-md hover:shadow-xl"
                    >
                      <img
                        className="w-full h-32 sm:h-40 md:h-48 object-cover rounded-md"
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w200${item.poster_path}`
                            : 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Image-not-found.png?20210521171500'
                        }
                        alt={item.title || item.name || item.original_name}
                        loading="lazy"
                      />
                      <p className="text-gray-200 text-xs sm:text-sm font-semibold mt-2 truncate group-hover:text-red-500 text-center">
                        {item.title || item.name || item.original_name}
                      </p>
                    </button>
                  ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SearchOverlay;
