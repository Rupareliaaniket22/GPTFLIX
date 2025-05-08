import React, { useEffect } from 'react';
import Header from './Header';
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import {
  API_OPTIONS,
  POPULAR_COMEDY_MOVIES,
  POPULAR_CRIME_TV,
  POPULAR_HORROR_MOVIES,
  Popular_Movies_Link,
  TOP_RATED_MOVIES,
  TOP_RATED_SHOWS,
  TRENDING_ALL,
} from '../utils/Constants';
import {
  setComedyMovies,
  setCrimeTV,
  setHorrorMovies,
  setPopularMovies,
  setTopRatedMovies,
  setTopRatedShows,
  setTrendingAll,
} from '../utils/moviesSlice';
import { useDispatch } from 'react-redux';

const Browse = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMovies = async (url, action) => {
      try {
        const response = await fetch(url, API_OPTIONS);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        dispatch(action(data.results));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchMovies(TRENDING_ALL, setTrendingAll);
    fetchMovies(Popular_Movies_Link, setPopularMovies);
    fetchMovies(TOP_RATED_SHOWS, setTopRatedShows);
    fetchMovies(TOP_RATED_MOVIES, setTopRatedMovies);
    fetchMovies(POPULAR_HORROR_MOVIES, setHorrorMovies);
    fetchMovies(POPULAR_COMEDY_MOVIES, setComedyMovies);
    fetchMovies(POPULAR_CRIME_TV, setCrimeTV);
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen w-screen">
      <Header />
      <MainContainer />
      <SecondaryContainer />
    </div>
  );
};

export default Browse;
