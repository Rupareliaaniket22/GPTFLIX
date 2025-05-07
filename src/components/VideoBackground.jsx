import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import useGetTrailer from '../hooks/useGetTrailer';
import { API_OPTIONS, IMAGE_BASE_URL } from '../utils/constants';

const VideoBackground = ({
  movieId,
  isAudioOn,
  mediaType,
  fallBackImage,
  poster_path,
}) => {
  const { videoUrl } = useGetTrailer(movieId, mediaType);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth < 768);
    checkScreenSize(); // Run on mount
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="absolute w-screen   md:-top-32  min-h-screen -z-50 ">
      {isMobile && (
        <img
          src={IMAGE_BASE_URL + (poster_path || fallBackImage)}
          alt="movie_backdrop"
          className="absolute w-screen h-screen object-cover z-0"
          loading="lazy"
        />
      )}

      {!isMobile && videoUrl && (
        <>
          <img
            src={IMAGE_BASE_URL + fallBackImage}
            alt="movie_backdrop"
            className="absolute min-w-screen -z-50  min-h-screen object-cover"
          />
          <ReactPlayer
            url={videoUrl}
            playing
            loop
            muted={!isAudioOn}
            width="100vw"
            height="140vh"
            controls={false}
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                  controls: 0,
                  showinfo: 0,
                  disablekb: 1,
                  fs: 0,
                  iv_load_policy: 3,
                  playsinline: 1,
                },
              },
            }}
            className="absolute  -top-10  left-0 w-full h-full scale-y-150  object-cover transform  translate-y-[-10vh] -z-50"
          />
        </>
      )}
      <div className=" hidden md:flex items-center w-screen justify-center h-full text-base sm:text-lg text-white">
        Loading video...
      </div>
    </div>
  );
};

export default VideoBackground;
