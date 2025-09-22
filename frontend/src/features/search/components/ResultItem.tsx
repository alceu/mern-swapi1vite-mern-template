import React from "react";
import { Link } from "react-router-dom";
import styles from "./ResultItem.module.css";

interface ResultItemProps {
  name: string;
  type: "people" | "films";
  id: string;
}

const ResultItem: React.FC<ResultItemProps> = ({ name, type, id }) => {
  const detailsPath = type === "people" ? `/people/${id}` : `/films/${id}`;

  return (
    <div className={styles.itemContainer}>
      <p className={styles.name}>{name}</p>
      <Link to={detailsPath} className={styles.button}>
        SEE DETAILS
      </Link>
    </div>
  );
};

export default ResultItem;
