import React, { useState } from 'react';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';
import ShimmerUI from './ShimmerUI';
import { useSelector } from 'react-redux';

const MainContainer = () => {
  const { trendingAll } = useSelector((state) => state.movies);
  const movies = trendingAll;
  const [isAudioOn, setIsAudioOn] = useState(false);

  if (!movies) {
    return; // ✅ Safe fallback
  }
  const main_movie = movies[0];
  return (
    <>
      <div className="w-screen h-screen z-20 ">
        {
          <VideoTitle
            title={
              main_movie?.title ||
              main_movie?.original_title ||
              main_movie?.name ||
              main_movie?.original_name
            }
            overview={main_movie?.overview}
            isAudioOn={isAudioOn}
            setIsAudioOn={setIsAudioOn}
            id={main_movie?.id}
            type={main_movie?.media_type ? main_movie.media_type : 'movie'}
            listName="trendingAll"
          />
        }
        <VideoBackground
          movieId={main_movie?.id}
          mediaType={main_movie?.media_type ? main_movie?.media_type : 'movie'}
          isAudioOn={isAudioOn}
          fallBackImage={main_movie?.backdrop_path}
          poster_path={main_movie?.poster_path}
        />
      </div>
    </>
  );
};

export default MainContainer;
