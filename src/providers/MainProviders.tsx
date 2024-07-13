import React from "react";
import reportWebVitals from "../reportWebVitals";
import "../index.css";

const MainProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <React.StrictMode>
      <div id="portal-root"></div>
      {children}
    </React.StrictMode>
  );
};

export default MainProviders;

reportWebVitals();
