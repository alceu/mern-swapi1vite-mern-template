import React from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  useGetFilmByIdQuery,
  useGetPersonByIdQuery,
} from "@features/api/swapiApi";
import styles from "./FilmDetails.module.css";

interface FilmDetailsProps {
  id: string;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({ id }) => {
  const navigate = useNavigate();
  const {
    data: filmData,
    error: filmError,
    isLoading: filmIsLoading,
  } = useGetFilmByIdQuery(id);

  if (filmIsLoading) return <div>Loading film details...</div>;
  if (filmError) return <div>Error loading film details.</div>;

  const characters = filmData?.result?.properties?.characters || [];

  return (
    <div className={styles.detailsContainer}>
      {filmData && <h2>{filmData.result.properties.title}</h2>}
      {filmData && (
        <div className={styles.contentColumns}>
          <div className={styles.openingCrawlColumn}>
            <h3>Opening Crawl</h3>
            <p>{filmData.result.properties.opening_crawl}</p>
          </div>
          <div className={styles.charactersColumn}>
            <h3>Characters</h3>
            <p>
              {characters.map((charUrl: string, index: number) => {
                const charId = charUrl.split("/").filter(Boolean).pop();
                return (
                  <React.Fragment key={charId}>
                    <CharacterLink charId={charId || ""} />
                    {index < characters.length - 1 && ", "}
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

interface CharacterLinkProps {
  charId: string;
}

const CharacterLink: React.FC<CharacterLinkProps> = ({ charId }) => {
  const {
    data: personData,
    isLoading: personIsLoading,
    error: personError,
  } = useGetPersonByIdQuery(charId);

  if (personIsLoading) return <span>Loading character...</span>;
  if (personError) return <span>Error loading character.</span>;

  return (
    <span>
      <Link to={`/people/${charId}`}>
        {personData?.result?.properties?.name || "Unknown Character"}
      </Link>
    </span>
  );
};

export default FilmDetails;
