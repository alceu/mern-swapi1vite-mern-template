import React, { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

import Header from "./Header";
import TopSearchesPage from "./TopSearchesPage";

import styles from "./Layout.module.css";

const Layout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(location.hash === "#top-searches");

  useEffect(() => {
    setIsModalOpen(location.hash === "#top-searches");
  }, [location.hash]);

  const onCloseTopSearches = () => {
    navigate({ pathname: location.pathname, search: location.search, hash: "" }, { state: location.state });
  };

  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
      <TopSearchesPage isOpen={isModalOpen} onClose={onCloseTopSearches} />
    </>
  );
};

export default Layout;
