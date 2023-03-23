import React from "react";
import logoUrl from "./tesla-svgrepo-com.svg";

export const PageLoader = () => {

  return (
    <div className="loader">
      <img src={logoUrl} className="white" alt="Loading..."/>
    </div>
  );
};
