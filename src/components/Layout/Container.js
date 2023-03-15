import React from "react";

const Container = ({ children }) => {
  return (
    <div className="p-2 overflow-x-scroll variant-scroll mx-auto w-full">
      {children}
    </div>
  );
};

export default Container;
