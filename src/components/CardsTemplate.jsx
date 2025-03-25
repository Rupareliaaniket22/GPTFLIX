import React from 'react';
import { genreMap, IMAGE_BASE_URL } from '../utils/constants';
import { IoPlayCircleOutline } from 'react-icons/io5';
import { IoIosArrowDropdown } from 'react-icons/io';
import StarRating from './StarRating';
import { useNavigate } from 'react-router-dom';

const CardsTemplate = ({ movie, listName }) => {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-w-[40vw] h-[23vh] md:w-[80vw] sm:min-w-[15vw] sm:h-[24vh] hover:sm:min-w-[18vw] hover:sm:min-h-[26vh] transition-transform duration-300 ease-in-out group hover:scale-110 hover:z-50"
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
        className="absolute hidden md:flex top-0 left-0 w-full h-full bg-black bg-opacity-50  flex-col opacity-0 translate-y-5 
                   group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
      >
        {/* Buttons */}
        <div className="relative top-[15%] gap-3 flex w-full pb-2 pl-6">
          <button className="text-3xl text-white rounded-full hover:bg-opacity-70 transition">
            <IoPlayCircleOutline />
          </button>
          <button className="text-3xl text-white rounded-full hover:bg-opacity-70 transition">
            <IoIosArrowDropdown />
          </button>
        </div>

        {/* Movie Title and Details */}
        <div className="mt-[10%] hidden   md:flex flex-col gap-1 pl-6">
          <p className="text-lg sm:text-xl text-white font-semibold">
            {movie?.title ||
              movie?.original_title ||
              movie?.name ||
              movie?.original_name}
          </p>
          <p className="text-white text-xs sm:text-sm">
            {movie.release_date || movie.first_air_date}
          </p>
          <StarRating rating={movie.vote_average / 2} />
          <div className="flex gap-3 justify-start">
            {movie?.genre_ids.slice(0, 3).map((id) => (
              <p className="text-white text-xs sm:text-sm" key={id}>
                {genreMap[id]}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsTemplate;
