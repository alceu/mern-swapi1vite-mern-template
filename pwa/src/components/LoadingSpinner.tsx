import React from "react";

import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  children?: React.ReactNode;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  children,
  className = "",
}) => {
  return (
    <span className={`${styles.spinnerContainer} ${className}`}>
      <span className={styles.spinner}></span>
      {children || "Loading..."}
    </span>
  );
};

export default LoadingSpinner;
