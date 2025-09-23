import React from 'react';
import { useGetFilmByIdQuery } from '@features/api/swapiApi';
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

interface MovieLinkProps {
  filmId: string;
  onMovieClick: (filmId: string) => void;
}

const MovieLink: React.FC<MovieLinkProps> = ({ filmId, onMovieClick }) => {
  const {
    data: filmData,
    isLoading: filmIsLoading,
    error: filmError,
  } = useGetFilmByIdQuery(filmId);

  if (filmIsLoading) return <LoadingSpinner>Loading movie...</LoadingSpinner>;
  if (filmError) return <span>Error loading movie.</span>;

  return (
    <span>
      {filmData && (
        <span onClick={() => onMovieClick(filmId)} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
          {filmData.result.properties.title || "Unknown Movie"}
        </span>
      )}
    </span>
  );
};

export default MovieLink;
