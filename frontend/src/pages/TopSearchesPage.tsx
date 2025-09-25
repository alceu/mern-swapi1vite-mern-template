import React from "react";
import { useNavigate } from "react-router-dom";
import TopSearchesChartModal from "@features/top-searches-chart/TopSearchesChartModal";

const TopSearchesPage: React.FC = () => {
  const navigate = useNavigate();

  const handleClose = () => {
    navigate(-1);
  };

  return <TopSearchesChartModal isOpen={true} onClose={handleClose} />;
};

export default TopSearchesPage;
