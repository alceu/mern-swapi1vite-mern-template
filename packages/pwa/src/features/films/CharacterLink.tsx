import React from "react";

import { useGetPersonByIdQuery } from "@pwa/api/swapiApi";
import LoadingSpinner from "@pwa/components/LoadingSpinner";

import styles from "./CharacterLink.module.css";

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

  let content;

  if (personIsLoading) {
    content = <LoadingSpinner>Loading character...</LoadingSpinner>;
  } else if (personError) {
    content = <span>Error loading character.</span>;
  } else if (personData) {
    content = (
      <span>
        <span
          onClick={() => onCharacterClick(charId)}
          className={styles.characterLink}
        >
          {personData.properties.name}
        </span>
      </span>
    );
  }

  return content;
};

export default CharacterLink;
