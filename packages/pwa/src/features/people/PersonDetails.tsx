import { IPersonProperties } from "@swapi-mern/domain";
import React from "react";

import { useGetPersonByIdQuery } from "@pwa/api/swapiApi";
import LoadingSpinner from "@pwa/components/LoadingSpinner";

import MovieLink from "./MovieLink";

import styles from "./PersonDetails.module.css";

interface PersonDetailsProps {
  id: string;
  onBackToSearch: () => void;
  onMovieClick: (filmId: string) => void;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({
  id,
  onBackToSearch,
  onMovieClick,
}) => {
  const { data, error, isLoading } = useGetPersonByIdQuery(id);

  const toTitleCase = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  let content;

  if (isLoading) {
    content = (
      <LoadingSpinner className={styles.mainSpinner}>
        Loading person details...
      </LoadingSpinner>
    );
  } else if (error) {
    content = <div>Error loading details.</div>;
  } else if (data) {
    const detailKeys: (keyof IPersonProperties)[] = [
      "birth_year",
      "gender",
      "eye_color",
      "hair_color",
      "height",
      "mass",
    ];
    const films = data.properties.films;
    content = (
      <>
        <h2>{data.properties.name}</h2>
        <div className={styles.contentColumns}>
          <div className={styles.detailsColumn}>
            <h3>Details</h3>
            <p>
              {detailKeys.map((key) => (
                <React.Fragment key={key}>
                  <span>{toTitleCase(key)}:</span> {data.properties[key]}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className={styles.filmsColumn}>
            <h3>Movies</h3>
            <p>
              {!films.length ? (
                <>None.</>
              ) : (
                films.map((filmUrl: string, index: number) => {
                  const filmId = filmUrl.split("/").filter(Boolean).pop();
                  const hasNext = index < films.length - 1;

                  return (
                    filmId && (
                      <React.Fragment key={filmId}>
                        <MovieLink
                          filmId={filmId}
                          onMovieClick={onMovieClick}
                        />
                        {hasNext && <br />}
                      </React.Fragment>
                    )
                  );
                })
              )}
            </p>
          </div>
        </div>
        <button onClick={onBackToSearch} className={styles.backButton}>
          Back to search
        </button>
      </>
    );
  }

  return <div className={styles.detailsContainer}>{content}</div>;
};

export default PersonDetails;
