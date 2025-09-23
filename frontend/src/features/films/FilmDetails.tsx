import React from "react";
import {
  useGetFilmByIdQuery,
  useGetPersonByIdQuery,
} from "@features/api/swapiApi";
import styles from "./FilmDetails.module.css";
import LoadingSpinner from '@components/LoadingSpinner/LoadingSpinner';

interface FilmDetailsProps {
  id: string;
  onBackToSearch: () => void;
  onCharacterClick: (charId: string) => void;
}

const FilmDetails: React.FC<FilmDetailsProps> = ({
  id,
  onBackToSearch,
  onCharacterClick,
}) => {
  const {
    data: filmData,
    error: filmError,
    isLoading: filmIsLoading,
  } = useGetFilmByIdQuery(id);

  if (filmIsLoading) return <LoadingSpinner>Loading film details...</LoadingSpinner>;
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
              {!characters.length ? (
                <>None.</>
              ) : (
                characters.map((charUrl: string, index: number) => {
                  const charId = charUrl.split("/").filter(Boolean).pop();
                  const hasNext = index < characters.length - 1;
                  return (
                    charId && (
                      <React.Fragment key={charId}>
                        <CharacterLink
                          charId={charId}
                          onCharacterClick={onCharacterClick}
                        />
                        {hasNext && ", "}
                      </React.Fragment>
                    )
                  );
                })
              )}
            </p>
          </div>
        </div>
      )}
      <button onClick={onBackToSearch} className={styles.backButton}>
        BACK TO SEARCH
      </button>
    </div>
  );
};

interface CharacterLinkProps {
  charId: string;
  onCharacterClick: (charId: string) => void;
}

const CharacterLink: React.FC<CharacterLinkProps> = ({
  charId,
  onCharacterClick,
}) => {
  const {
    data: personData,
    isLoading: personIsLoading,
    error: personError,
  } = useGetPersonByIdQuery(charId);

  if (personIsLoading) return <LoadingSpinner>Loading character...</LoadingSpinner>;
  if (personError) return <span>Error loading character.</span>;

  return (
    <span>
      <span
        onClick={() => onCharacterClick(charId)}
        style={{ cursor: "pointer", textDecoration: "underline" }}
      >
        {personData?.result?.properties?.name || "Unknown Character"}
      </span>
    </span>
  );
};

export default FilmDetails;
