import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faCircleInfo,
  faVolumeXmark,
  faVolumeHigh,
} from '@fortawesome/free-solid-svg-icons';
import React, { useEffect, useRef, useState } from 'react';
import useGetRatings from '../hooks/useGetRatings';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const VideoTitle = ({
  title,
  overview,
  isAudioOn,
  setIsAudioOn,
  id,
  type,
  listName,
}) => {
  const { ratings } = useGetRatings(type, id);
  const titleRef = useRef(null);
  const overviewRef = useRef(null);
  const buttonsRef = useRef(null);
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const MAX_LENGTH = 150; // Truncate length for mobile devices

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      titleRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )
      .fromTo(
        overviewRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        '-=0.4'
      )
      .fromTo(
        buttonsRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
        '-=0.3'
      );
  }, []);

  const formattedRating =
    ratings && ratings.length > 0
      ? typeof ratings === 'string'
        ? ratings
        : Array.isArray(ratings)
          ? ratings[0]?.rating || ratings[0] || 'PG-13'
          : 'PG-13'
      : 'PG-13';

  return (
    <>
      <div className="absolute   w-screen h-screen inset-0 bg-gradient-to-b from-black/50 via-black/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute top-[44vh] landscape:top-[15%] sm:top-[25%] md:top-[18%] w-screen left-0 h-full overflow-hidden flex flex-col items-start z-50 text-white ">
        <div className="relative w-full px-4 sm:px-8 md:px-12 lg:px-16 pb-16 md:pb-24 pt-32 md:pt-40">
          <h1
            ref={titleRef}
            className="text-3xl text-center sm:text-start sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight mb-3 sm:mb-4 md:mb-6 text-shadow-lg"
          >
            {title}
          </h1>

          {/* Overview with Read More only on mobile */}
          <div ref={overviewRef} className="mb-6 sm:mb-8 md:mb-10">
            <p className="text-sm text-center sm:text-start sm:text-base md:text-lg w-full sm:w-4/5 md:w-3/5 lg:w-1/2 leading-relaxed text-gray-200 transition-all duration-300">
              {/* Full overview on landscape mode (md and above) */}
              <span className="hidden md:inline">{overview}</span>

              {/* Truncated version on mobile */}
              <span className="inline md:hidden">
                {isExpanded || overview?.length <= MAX_LENGTH
                  ? overview
                  : `${overview?.substring(0, MAX_LENGTH)}... `}
                {overview?.length > MAX_LENGTH && (
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="text-blue-400 hover:underline ml-1"
                  >
                    {isExpanded ? 'Read Less' : 'Read More'}
                  </button>
                )}
              </span>
            </p>
          </div>

          {/* Controls section  */}
          <div
            ref={buttonsRef}
            className="flex flex-col justify-between items-center sm:flex-row md:items-start sm:items-center gap-4 sm:gap-6"
          >
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/browse/${type}/${id}/${listName}`)}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-white hover:bg-gray-200 text-black font-medium rounded-md transition-all duration-200 text-sm sm:text-base"
              >
                <FontAwesomeIcon icon={faPlay} />
                Play
              </button>
              <button
                onClick={() => navigate(`/browse/${type}/${id}/${listName}`)}
                className="flex items-center justify-center gap-2 px-6 sm:px-8 py-2 sm:py-3 bg-gray-700 bg-opacity-60 hover:bg-opacity-80 text-white font-medium rounded-md transition-all duration-200 backdrop-blur-sm text-sm sm:text-base"
              >
                <FontAwesomeIcon icon={faCircleInfo} />
                More Info
              </button>
            </div>

            <div className="flex   items-center gap-4 ml-0 sm:ml-auto">
              <button
                onClick={() => setIsAudioOn(!isAudioOn)}
                className="hidden md:flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gray-800 bg-opacity-50 hover:bg-opacity-70 border border-gray-600 text-lg sm:text-xl transition-all duration-200"
                aria-label={isAudioOn ? 'Mute audio' : 'Unmute audio'}
              >
                <FontAwesomeIcon
                  icon={isAudioOn ? faVolumeHigh : faVolumeXmark}
                />
              </button>

              {ratings && (
                <div className="flex items-center md:w-[8vw] w-[20vw] h-8 sm:h-10 px-3 py-1 bg-gray-800 bg-opacity-50 border-l-2 border-gray-400 rounded-r-sm">
                  <p className="text-xs w-full md:text-start sm:text-sm font-medium">
                    {formattedRating}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VideoTitle;
