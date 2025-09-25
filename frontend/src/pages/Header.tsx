import React from "react";
import { Link } from "react-router-dom";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.leftPlaceholder} />
      <Link to="/" className={styles.titleLink}>
        <h1 className={styles.title}>SWStarter</h1>
      </Link>
      <Link to="/top-searches" className={styles.chartButton}>
        &#128202; {/* Bar chart icon */}
      </Link>
    </header>
  );
};

export default Header;
