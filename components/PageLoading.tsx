import React from "react";

const PageLoading = () => {
  return (
    <div className="w-full h-1 fixed top-0 left-0 z-50">
      <div className="h-full bg-gradient-to-r from-default-400 to-default-600 animate-progress"></div>
    </div>
  );
};

export default PageLoading;
