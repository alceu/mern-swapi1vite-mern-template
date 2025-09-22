import React from 'react';
import { Link } from 'react-router-dom';
import { useGetFilmByIdQuery } from '@features/api/swapiApi';

interface MovieLinkProps {
  filmId: string;
}

const MovieLink: React.FC<MovieLinkProps> = ({ filmId }) => {
  const {
    data: filmData,
    isLoading: filmIsLoading,
    error: filmError,
  } = useGetFilmByIdQuery(filmId);

  if (filmIsLoading) return <span>Loading movie...</span>;
  if (filmError) return <span>Error loading movie.</span>;

  return (
    <span>
      {filmData && (
        <Link to={`/films/${filmId}`}>
          {filmData.result.properties.title || "Unknown Movie"}
        </Link>
      )}
    </span>
  );
};

export default MovieLink;
