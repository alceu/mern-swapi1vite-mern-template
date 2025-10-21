import React from "react";

import { useGetFilmByIdQuery } from "@pwa/api/swapi";
import LoadingSpinner from "@pwa/components/LoadingSpinner";

import styles from "./MovieLink.module.css";

interface MovieLinkProps {
  filmId: string;
  onMovieClick: (filmId: string) => void;
}

const MovieLink: React.FC<MovieLinkProps> = ({ filmId, onMovieClick }) => {
  const { data: film, isLoading, error } = useGetFilmByIdQuery(filmId);

  let content;

  if (isLoading) {
    content = <LoadingSpinner>Loading movie...</LoadingSpinner>;
  } else if (error) {
    content = <span>Error loading movie.</span>;
  } else if (film) {
    const { title } = film.properties;

    content = (
      <span>
        <span onClick={() => onMovieClick(filmId)} className={styles.movieLink}>
          {title}
        </span>
      </span>
    );
  }

  return content;
};

export default MovieLink;
