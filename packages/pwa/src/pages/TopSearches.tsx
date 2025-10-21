import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TopSearchesChart from "@pwa/features/topSearch/TopSearchesChart";

import styles from "./TopSearches.module.css";

const TopSearchesPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(location.hash === "#top-searches");

  useEffect(() => {
    setIsOpen(location.hash === "#top-searches");
  }, [location.hash]);

  const onClose = () => {
    navigate(
      { pathname: location.pathname, search: location.search, hash: "" },
      { state: location.state }
    );
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Top Searches Chart</h2>
          <button className={styles.closeButton} onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.chartsContainer}>
            <TopSearchesChart title="Top Film Searches" type="films" />
            <TopSearchesChart title="Top People Searches" type="people" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSearchesPage;
