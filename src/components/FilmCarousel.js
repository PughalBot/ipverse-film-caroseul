import React, { useState } from 'react';

const FilmCarousel = ({ movies, onMovieClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleMovies = Array(10).fill(null).map((_, index) => movies[index % movies.length]);

  const handleClickNext = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, movies.length - 1));
  };

  const handleClickPrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  return (
    <div className="relative w-full">
      <div className="flex overflow-hidden">
        <button
          className="hidden md:flex absolute z-10 top-1/2 left-4 transform -translate-y-1/2 focus:outline-none"
          onClick={handleClickPrev}
          disabled={currentIndex}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-600 hover:text-red-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="flex transition-transform ease-in-out duration-300" style={{ transform: `translateX(-${currentIndex * (100 / Math.min(movies.length, 5))}%)` }}>
          {visibleMovies.length > 0 ? (
            visibleMovies.map((movie) => (
              <div key={movie.id} className="w-96 p-4">
              <div className='h-[750px] border-2 border-red-600 rounded-lg'>
                <div className="cursor-pointer p-8 flex items-center" onClick={() => onMovieClick(movie)}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-full h-[16rem] md:h-[20rem] lg:h-[24rem] object-cover rounded-lg" />
                </div>
                <h2 className="mt-4 pl-2 text-red-60 text-2xl font-bold">{movie.title}</h2>
                <p className="mt-2 pl-2 text-white text-gray-500">{movie.overview}</p>
              </div>
              </div>
            ))
          ) : (
            <div className="w-full p-4">No movies available.</div>
          )}
        </div>
        <button
          className="hidden md:flex absolute z-10 top-1/2 right-4 transform -translate-y-1/2 focus:outline-none"
          onClick={handleClickNext}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-red-600 hover:text-red-800 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilmCarousel;
