import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    trendingAll: [],
    popularMovies: [],
    topRatedShows: [],
    topRatedMovies: [],
    horrorMovies: [],
    comedyMovies: [],
    crimeTV: [],
  },
  reducers: {
    setTrendingAll: (state, action) => {
      state.trendingAll = action.payload;
    },
    setPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    setTopRatedShows: (state, action) => {
      state.topRatedShows = action.payload;
    },
    setTopRatedMovies: (state, action) => {
      state.topRatedMovies = action.payload;
    },
    setHorrorMovies: (state, action) => {
      state.horrorMovies = action.payload;
    },
    setComedyMovies: (state, action) => {
      state.comedyMovies = action.payload;
    },
    setCrimeTV: (state, action) => {
      state.crimeTV = action.payload;
    },
    clearMovies: (state) => {
      state.trendingAll = [];
      state.popularMovies = [];
      state.topRatedShows = [];
      state.topRatedMovies = [];
      state.horrorMovies = [];
      state.comedyMovies = [];
      state.crimeTV = [];
    },
  },
});

export const {
  setTrendingAll,
  setPopularMovies,
  setTopRatedShows,
  setTopRatedMovies,
  setHorrorMovies,
  setComedyMovies,
  setCrimeTV,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
