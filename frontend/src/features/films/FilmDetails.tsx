import React from "react";
import { useGetFilmByIdQuery } from "@features/api/swapiApi";
import LoadingSpinner from "@components/LoadingSpinner";

import CharacterLink from "./CharacterLink";

import styles from "./FilmDetails.module.css";

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

  let content;

  if (filmIsLoading) {
    content = (
      <LoadingSpinner className={styles.mainSpinner}>
        Loading film details...
      </LoadingSpinner>
    );
  } else if (filmError) {
    content = <div>Error loading film details.</div>;
  } else {
    const characters = filmData?.result?.properties?.characters || [];
    content = (
      <>
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
          Back to search
        </button>
      </>
    );
  }

  return <div className={styles.detailsContainer}>{content}</div>;
};

export default FilmDetails;
