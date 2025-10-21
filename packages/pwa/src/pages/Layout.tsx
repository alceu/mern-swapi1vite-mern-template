import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import TopSearchesPage from "./TopSearches";

import styles from "./Layout.module.css";

const Layout: React.FC = () => (
  <>
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
    <TopSearchesPage />
  </>
);

export default Layout;
