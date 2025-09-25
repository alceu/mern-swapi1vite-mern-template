import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";

import styles from "./Layout.module.css";

const Layout: React.FC = () => {
  return (
    <>
      <div className={styles.container}>
        <Header />
        <div className={styles.main}>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
