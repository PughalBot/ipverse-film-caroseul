import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FilmCarousel from '../components/FilmCarousel';
import FilmModal from '../components/FilmModal';
// Import the custom styles

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/top_rated', {
          params: {
            api_key: '710df61fb41b93387fe400fe16b3d0c2',
          },
        });
        setMovies(response.data.results.slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movies:', error);
        setError('Failed to fetch movies. Please try again later.');
        setLoading(false);
      }
    };

    fetchTopRatedMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  return (
    <div className="p-8 bg-black">
      <h1 className="text-3xl font-bold mb-6">Top-Rated Movies</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <>
          {movies.length > 0 && <FilmCarousel movies={movies} onMovieClick={handleMovieClick} />}
          {selectedMovie && <FilmModal movie={selectedMovie} onClose={handleCloseModal} />}
        </>
      )}
    </div>
  );
};

export default HomePage;
