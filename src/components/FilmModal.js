import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FilmModal = ({ movie, onClose }) => {
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=710df61fb41b93387fe400fe16b3d0c2`);
        const castData = response.data.cast;
        setCast(castData);
      } catch (error) {
        console.error('Error fetching cast data:', error);
      }
    };

    if (movie) {
      fetchCast();
    }
  }, [movie]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-full md:max-w-[1080px] p-6 md:p-8 overflow-y-auto max-h-[80vh]">
        {movie && (
          <>
            <button className="absolute top-4 right-4 text-red-600 hover:text-red-800 transition-colors focus:outline-none" onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="flex flex-col items-center space-y-4 w-full">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} className="w-44 h-auto object-cover rounded-lg" />
              <h2 className="text-2xl font-bold">{movie.title}</h2>
              <p className="text-gray-500">Release Date: {movie.release_date}</p>
              <h3 className="text-lg font-bold mt-4">Overview</h3>
              <p>{movie.overview}</p>
              <h3 className="text-lg font-bold mt-4">Cast</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cast.map((actor) => (
                  <div key={actor.id} className="flex flex-col items-center">
                    <img src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`} alt={actor.name} className="w-24 h-32 object-cover rounded-lg" />
                    <p className="text-center mt-2">{actor.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FilmModal;
