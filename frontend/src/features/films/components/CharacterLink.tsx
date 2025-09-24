import React from "react";
import { useGetPersonByIdQuery } from "@features/api/swapiApi";
import LoadingSpinner from "@components/LoadingSpinner/LoadingSpinner";

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

  if (personIsLoading)
    return <LoadingSpinner>Loading character...</LoadingSpinner>;
  if (personError) return <span>Error loading character.</span>;

  return (
    <span>
      <span
        onClick={() => onCharacterClick(charId)}
        className={styles.characterLink}
      >
        {personData?.result?.properties?.name || "Unknown Character"}
      </span>
    </span>
  );
};

export default CharacterLink;
