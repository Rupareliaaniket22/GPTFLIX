import React, { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import CardsTemplate from './CardsTemplate';

const ListTemplate = ({ list, title, listName }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      if (direction === 'left') {
        scrollRef.current.scrollTo({
          left: scrollLeft - scrollAmount,
          behavior: 'smooth',
        });
      } else {
        scrollRef.current.scrollTo({
          left: scrollLeft + scrollAmount,
          behavior: 'smooth',
        });
      }
    }
  };

  return (
    <div className="relative mt-2 overflow-x-hidden scrollbar-hide   flex flex-col  ">
      <h1 className="text-xl text-white font-bold px-4">{title}</h1>

      {/* Left Arrow */}
      <button
        className="absolute left-1 top-[50%] hidden md:block  z-[100] bg-black/50 p-1 rounded-full"
        onClick={() => scroll('left')}
      >
        <FontAwesomeIcon icon={faChevronLeft} className="text-white text-3xl" />
      </button>

      {/* Movie List */}
      <div
        ref={scrollRef}
        className=" flex px-4 py-2 gap-5 overflow-x-scroll overflow-y-hidden scrollbar-hide scroll-smooth"
      >
        {list?.map((movie) => (
          <CardsTemplate movie={movie} listName={listName} key={movie.id} />
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="absolute  top-[50%] hidden md:block right-1  z-50 bg-black/50 p-2 rounded-full"
        onClick={() => scroll('right')}
      >
        <FontAwesomeIcon
          icon={faChevronRight}
          className="text-white text-3xl"
        />
      </button>
    </div>
  );
};

export default ListTemplate;
