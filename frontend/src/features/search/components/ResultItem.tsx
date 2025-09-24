import React from "react";
import { useSelector } from "react-redux";
import { selectSearchType } from "@features/search";

import styles from "./ResultItem.module.css";

interface ResultItemProps {
  name: string;
  id: string;
  onResultClick: (id: string, type: "people" | "films") => void;
}

const ResultItem: React.FC<ResultItemProps> = ({
  name,
  id,
  onResultClick,
}) => {
  const type = useSelector(selectSearchType);

  return (
    <div className={styles.itemContainer}>
      <p className={styles.name}>{name}</p>
      <button onClick={() => onResultClick(id, type)} className={styles.button}>
        See details
      </button>
    </div>
  );
};

export default ResultItem;
