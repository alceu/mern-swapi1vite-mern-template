import React from "react";
import styles from "./ResultItem.module.css";

interface ResultItemProps {
  name: string;
  type: "people" | "films";
  id: string;
  onResultClick: (id: string, type: "people" | "films") => void;
}

const ResultItem: React.FC<ResultItemProps> = ({ name, type, id, onResultClick }) => {
  return (
    <div className={styles.itemContainer}>
      <p className={styles.name}>{name}</p>
      <button onClick={() => onResultClick(id, type)} className={styles.button}>
        SEE DETAILS
      </button>
    </div>
  );
};

export default ResultItem;
