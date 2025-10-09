import React from "react";

import TopSearchesChartModal from "@pwa/features/top-searches-chart/TopSearchesChartModal";

interface TopSearchesPageProps {
  isOpen: boolean;
  onClose: () => void;
}

const TopSearchesPage: React.FC<TopSearchesPageProps> = ({
  isOpen,
  onClose,
}) => {
  return <TopSearchesChartModal isOpen={isOpen} onClose={onClose} />;
};

export default TopSearchesPage;
