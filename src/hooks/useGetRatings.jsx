import { useEffect, useState } from 'react';
import { API_OPTIONS } from '../utils/constants';

const useGetRatings = (type, id) => {
  const [ratings, setRatings] = useState(null);

  useEffect(() => {
    if (!id) return;

    const getRatings = async () => {
      try {
        let endpoint = '';

        if (type === 'movie') {
          endpoint = `https://api.themoviedb.org/3/movie/${id}/release_dates`;
        } else if (type === 'tv') {
          endpoint = `https://api.themoviedb.org/3/tv/${id}/content_ratings`;
        } else {
          console.error('Unsupported type:', type);
          return;
        }

        const response = await fetch(endpoint, API_OPTIONS);
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const data = await response.json();
        let rating = 'Not Rated';

        if (type === 'movie' && data.results) {
          const usRelease = data.results.find(
            (region) => region.iso_3166_1 === 'US'
          );
          rating = usRelease?.release_dates?.[0]?.certification || 'Not Rated';
        }

        if (type === 'tv' && data.results) {
          const usRating = data.results.find(
            (region) => region.iso_3166_1 === 'US'
          );
          rating = usRating?.rating || 'Not Rated';
        }

        setRatings(rating);
      } catch (error) {
        console.error('Error fetching ratings:', error);
        setRatings('Not Rated');
      }
    };

    getRatings();
  }, [id, type]);

  return { ratings };
};

export default useGetRatings;
