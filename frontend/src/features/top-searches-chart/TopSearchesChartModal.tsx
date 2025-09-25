import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/rootReducer";
import { closeModal } from "./index";
import TopSearchesChart from "./TopSearchesChart";
import styles from "./TopSearchesChartModal.module.css";
import { useGetTopSearchesQuery } from "@features/api/searchesStatsApi";

const TopSearchesChartModal: React.FC = () => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(
    (state: RootState) => state.features.topSearchesChart
  );

  const {
    data: filmSearches,
    isLoading: isLoadingFilms,
    error: errorFilms,
  } = useGetTopSearchesQuery({ type: "films" });
  const {
    data: peopleSearches,
    isLoading: isLoadingPeople,
    error: errorPeople,
  } = useGetTopSearchesQuery({ type: "people" });

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
          <div className={styles.chartsContainer}>
            <TopSearchesChart
              title="Movies"
              data={filmSearches}
              isLoading={isLoadingFilms}
              error={errorFilms}
            />
            <TopSearchesChart
              title="People"
              data={peopleSearches}
              isLoading={isLoadingPeople}
              error={errorPeople}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopSearchesChartModal;
