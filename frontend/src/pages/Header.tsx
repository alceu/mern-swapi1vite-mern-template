import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openModal } from "@features/top-searches-chart";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <header className={styles.header}>
      <div className={styles.leftPlaceholder} />
      <Link to="/" className={styles.titleLink}>
        <h1 className={styles.title}>SWStarter</h1>
      </Link>
      <button
        className={styles.chartButton}
        onClick={() => dispatch(openModal())}
      >
        &#128202; {/* Bar chart icon */}
      </button>
    </header>
  );
};

export default Header;
