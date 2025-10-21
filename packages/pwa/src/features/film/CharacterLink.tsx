import React from "react";

import { useGetPersonByIdQuery } from "@pwa/api/swapi";
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
  const { data: person, isLoading, error } = useGetPersonByIdQuery(charId);

  let content;

  if (isLoading) {
    content = <LoadingSpinner>Loading character...</LoadingSpinner>;
  } else if (error) {
    content = <span>Error loading character.</span>;
  } else if (person) {
    const { name } = person.properties;

    content = (
      <span>
        <span
          onClick={() => onCharacterClick(charId)}
          className={styles.characterLink}
        >
          {name}
        </span>
      </span>
    );
  }

  return content;
};

export default CharacterLink;
