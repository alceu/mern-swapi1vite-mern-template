import React from "react";
import { useNavigate } from "react-router-dom";
import { useGetPersonByIdQuery } from "@features/api/swapiApi";
import styles from "./PersonDetails.module.css";
import MovieLink from "./components/MovieLink";

interface PersonDetailsProps {
  id: string;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({ id }) => {
  const navigate = useNavigate();
  const { data, error, isLoading } = useGetPersonByIdQuery(id);

  const toTitleCase = (str: string) => {
    return str
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (isLoading) return <div>Loading details...</div>;
  if (error) return <div>Error loading details.</div>;

  return (
    <div className={styles.detailsContainer}>
      {data && <h2>{data.result.properties.name}</h2>}
      {data && (
        <div className={styles.contentColumns}>
          <div className={styles.detailsColumn}>
            <h3>Details</h3>
            <p>
              {[
                "birth_year",
                "gender",
                "eye_color",
                "hair_color",
                "height",
                "mass",
              ].map((key) => (
                <React.Fragment key={key}>
                  <span>{toTitleCase(key)}:</span> {data.result.properties[key]}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
          <div className={styles.filmsColumn}>
            <h3>Movies</h3>
            <p>
              {data.result.properties.films.map((filmUrl: string) => {
                const filmId = filmUrl.split("/").filter(Boolean).pop();
                return (
                  <React.Fragment key={filmId}>
                    <MovieLink filmId={filmId || ""} />
                    <br />
                  </React.Fragment>
                );
              })}
            </p>
          </div>
        </div>
      )}
      <button onClick={() => navigate(-1)} className={styles.backButton}>
        BACK TO SEARCH
      </button>
    </div>
  );
};

export default PersonDetails;
