import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from "./Header.module.css";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenTopSearches = () => {
    navigate({ pathname: location.pathname, search: location.search, hash: "#top-searches" }, { state: location.state });
  };

  return (
    <header className={styles.header}>
      <div className={styles.leftPlaceholder} />
      <Link to="/" className={styles.titleLink}>
        <h1 className={styles.title}>SWStarter</h1>
      </Link>
      <button
        className={styles.chartButton}
        onClick={handleOpenTopSearches}
      >
        &#128202; {/* Bar chart icon */}
      </button>
    </header>
  );
};

export default Header;
