import React from "react";

import TopSearchesChart from "./TopSearchesChart";
import styles from "./TopSearchesChartModal.module.css";

interface TopSearchesChartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopSearchesChartModal: React.FC<TopSearchesChartModalProps> = ({
  isOpen,
  onClose,
}) => {
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

export default TopSearchesChartModal;
