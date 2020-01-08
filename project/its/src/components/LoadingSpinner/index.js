import React from "react";
import "./style.scss";
const LoadingSpinner = () => {
  return (
    <div className="loadingSpinner_container">
      <div className="loadingSpinner" />
      <div className="loadingSpinner" />
      <div className="loadingSpinner" />
    </div>
  );
};

export default LoadingSpinner;
