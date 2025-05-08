import React from 'react';
import { genreMap, IMAGE_BASE_URL } from '../utils/Constants';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { IoIosArrowDropdown } from 'react-icons/io';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

const CardsTemplate = ({ movie, listName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-w-40 min-h-[27vh] md:min-w-52    sm:h-[24vh] hover:sm:min-w-[12vw] hover:sm:min-h-[26vh] transition-transform duration-300 ease-in-out group hover:scale-110 hover:z-50"
      onClick={() =>
        navigate(
          `/browse/${movie.media_type || 'movie'}/${movie.id}/${listName}`
        )
      }
    >
      {/* Movie Poster */}
      <img
        src={IMAGE_BASE_URL + movie.poster_path || movie.backdrop_path}
        alt="movie_poster"
        className="rounded-md group-hover:absolute w-full h-full "
      />

      {/* Overlay with Buttons and Title */}
      <div
        className="absolute hidden md:flex left-0 top-10 w-full h-full bg-gradient-to-t from-black/80 via-black/60 to-transparent 
             flex-col opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out p-4 "
      >
        {/* Buttons */}
        <div className="flex gap-3 text-white text-3xl ">
          <IoPlayCircleOutline className="hover:text-gray-300 transition duration-200" />
          <IoIosArrowDropdown className="hover:text-gray-300 transition duration-200" />
        </div>

        {/* Movie Title and Details */}
        <div className="flex flex-col text-white space-y-1">
          <p className="text-lg sm:text-xl font-semibold truncate">
            {movie?.title ||
              movie?.original_title ||
              movie?.name ||
              movie?.original_name}
          </p>
          <p className="text-xs sm:text-sm text-gray-300">
            {movie.release_date || movie.first_air_date}
          </p>
          <StarRating rating={movie.vote_average / 2} />
          <div className="flex flex-wrap gap-2 text-xs sm:text-sm text-gray-300">
            {movie?.genre_ids.slice(0, 3).map((id) => (
              <span key={id}>{genreMap[id]}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsTemplate;
