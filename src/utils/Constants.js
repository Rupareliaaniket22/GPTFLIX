export const LOGO =
  'https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png';
export const USER_ICON =
  'https://occ-0-4875-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABXz4LMjJFidX8MxhZ6qro8PBTjmHbxlaLAbk45W1DXbKsAIOwyHQPiMAuUnF1G24CLi7InJHK4Ge4jkXul1xIW49Dr5S7fc.png?r=e6e';

export const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + import.meta.env.VITE_TMDB_KEY,
  },
};

export const QWEN_AI_API_OPTIONS = import.meta.env.VITE_QWEN_KEY;

export const Popular_Movies_Link = 'https://api.themoviedb.org/3/movie/popular';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w1280';
export const genreMap = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Science Fiction',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};
export const TRENDING_ALL = 'https://api.themoviedb.org/3/trending/all/week';
export const TOP_RATED_SHOWS =
  'https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1';
export const TOP_RATED_MOVIES =
  'https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&region=US';
export const PROVIDER_NAME_ENDPOINT =
  'https://api.themoviedb.org/3/movie/1204892/watch/providers';
export const POPULAR_HORROR_MOVIES = `https://api.themoviedb.org/3/discover/movie?&with_genres=27&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&language=en-US`;
export const POPULAR_COMEDY_MOVIES = `https://api.themoviedb.org/3/discover/movie?&with_genres=35&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&language=en-US`;
export const POPULAR_CRIME_TV = `https://api.themoviedb.org/3/discover/tv?with_genres=80&sort_by=popularity.desc&include_adult=false&include_video=true&page=1&language=en-US`;
export const MULTI_SEARCH = `https://api.themoviedb.org/3/search/multi?`;
