import React from "react";

import { useGetFilmByIdQuery } from "@pwa/api/swapi";
import LoadingSpinner from "@pwa/components/LoadingSpinner";

import CharacterLink from "./CharacterLink";

import styles from "./Details.module.css";

interface DetailsProps {
  id: string;
  onBackToSearch: () => void;
  onCharacterClick: (charId: string) => void;
}

const Details: React.FC<DetailsProps> = ({
  id,
  onBackToSearch,
  onCharacterClick,
}) => {
  const { data: film, error, isLoading } = useGetFilmByIdQuery(id);

  let content;

  if (isLoading) {
    content = (
      <LoadingSpinner className={styles.mainSpinner}>
        Loading film details...
      </LoadingSpinner>
    );
  } else if (error) {
    content = <div>Error loading film details.</div>;
  } else if (film) {
    const { title, opening_crawl, characters } = film.properties;

    content = (
      <>
        <h2>{title}</h2>
        <div className={styles.contentColumns}>
          <div className={styles.openingCrawlColumn}>
            <h3>Opening Crawl</h3>
            <p>{opening_crawl}</p>
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
        <button onClick={onBackToSearch} className={styles.backButton}>
          Back to search
        </button>
      </>
    );
  }

  return <div className={styles.detailsContainer}>{content}</div>;
};

export default Details;
