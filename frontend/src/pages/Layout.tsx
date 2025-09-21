import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import './index.css'; // Import global styles

const Layout: React.FC = () => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.main}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;