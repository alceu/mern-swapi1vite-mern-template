import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { closeModal } from "./index";
import TopSearchesChart from "./TopSearchesChart";
import styles from "./TopSearchesChartModal.module.css";

const TopSearchesChartModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(
    (state: RootState) => state.features.topSearchesChart
  );

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>Top Searches Chart</h2>
          <button
            className={styles.closeButton}
            onClick={() => dispatch(closeModal())}
          >
            Close
          </button>
        </div>
        <div className={styles.modalBody}>
          <TopSearchesChart />
        </div>
      </div>
    </div>
  );
};

export default TopSearchesChartModal;
