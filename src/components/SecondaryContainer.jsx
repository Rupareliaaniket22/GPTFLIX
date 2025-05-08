import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import ListTemplate from './ListTemplate';
import ShimmerUI from './ShimmerUI';

import {
  setTrendingAll,
  setPopularMovies,
  setTopRatedShows,
  setTopRatedMovies,
  setHorrorMovies,
  setComedyMovies,
  setCrimeTV,
} from '../utils/moviesSlice';

const fetchMovies = async (url, action, dispatch) => {
  try {
    const response = await fetch(url, API_OPTIONS);
    if (!response.ok) throw new Error('Failed to fetch');
    const data = await response.json();
    dispatch(action(data.results));
  } catch (err) {
    console.error('Error fetching:', err);
  }
};

const SecondaryContainer = () => {
  const dispatch = useDispatch();
  const {
    trendingAll,
    popularMovies,
    topRatedShows,
    topRatedMovies,
    horrorMovies,
    comedyMovies,
    crimeTV,
  } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!trendingAll) fetchMovies(TRENDING_ALL, setTrendingAll, dispatch);
    if (!popularMovies)
      fetchMovies(Popular_Movies_Link, setPopularMovies, dispatch);
    if (!topRatedShows)
      fetchMovies(TOP_RATED_SHOWS, setTopRatedShows, dispatch);
    if (!topRatedMovies)
      fetchMovies(TOP_RATED_MOVIES, setTopRatedMovies, dispatch);
    if (!horrorMovies)
      fetchMovies(POPULAR_HORROR_MOVIES, setHorrorMovies, dispatch);
    if (!comedyMovies)
      fetchMovies(POPULAR_COMEDY_MOVIES, setComedyMovies, dispatch);
    if (!crimeTV) fetchMovies(POPULAR_CRIME_TV, setCrimeTV, dispatch);
  }, [
    trendingAll,
    popularMovies,
    topRatedShows,
    topRatedMovies,
    horrorMovies,
    comedyMovies,
    crimeTV,
    dispatch,
  ]);

  if (
    !trendingAll ||
    !popularMovies ||
    !topRatedShows ||
    !topRatedMovies ||
    !horrorMovies ||
    !comedyMovies ||
    !crimeTV
  ) {
    return <ShimmerUI />;
  }

  return (
    <div className="relative   z-30 flex w-screen flex-col bg-[#141414] h-fit">
      <div className="md:-mt-[15vh]  overflow-x-hidden  bg-gradient-to-r w-screen bg-opacity-45">
        <ListTemplate
          list={trendingAll}
          title="Trending Shows and Movies"
          listName="trendingAll"
        />
        <ListTemplate
          list={topRatedShows}
          title="Top Rated Shows"
          listName="topRatedShows"
        />
        <ListTemplate
          list={topRatedMovies}
          title="Top Rated Movies"
          listName="topRatedMovies"
        />
        <ListTemplate
          list={horrorMovies}
          title="Horror Movies"
          listName="horrorMovies"
        />
        <ListTemplate
          list={popularMovies}
          title="Trending Movies"
          listName="popularMovies"
        />
        <ListTemplate list={crimeTV} title="Crime Shows" listName="crimeTV" />
        <ListTemplate
          list={comedyMovies}
          title="Comedy Movies"
          listName="comedyMovies"
        />
      </div>
    </div>
  );
};

export default SecondaryContainer;
