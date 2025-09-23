import React from 'react';
import styles from './LoadingSpinner.module.css';

interface LoadingSpinnerProps {
  children?: React.ReactNode;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ children }) => {
  return (
    <span className={styles.spinnerContainer}>
      <span className={styles.spinner}></span>
      {children || "Loading..."}
    </span>
  );
};

export default LoadingSpinner;
