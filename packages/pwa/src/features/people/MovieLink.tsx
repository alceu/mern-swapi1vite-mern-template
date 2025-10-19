import React from "react";

import { useGetFilmByIdQuery } from "@pwa/api/swapiApi";
import LoadingSpinner from "@pwa/components/LoadingSpinner";

import styles from "./MovieLink.module.css";

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

  let content;

  if (filmIsLoading) {
    content = <LoadingSpinner>Loading movie...</LoadingSpinner>;
  } else if (filmError) {
    content = <span>Error loading movie.</span>;
  } else if (filmData) {
    content = (
      <span>
        <span onClick={() => onMovieClick(filmId)} className={styles.movieLink}>
          {filmData.properties.title}
        </span>
      </span>
    );
  }

  return content;
};

export default MovieLink;
