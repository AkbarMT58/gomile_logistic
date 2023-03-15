import React from "react";

const Input = ({ children, ...restPorps }) => {
  return (
    <div className="mb-2 border border-gray-300 rounded-md">
      <input {...restPorps}>{children}</input>
    </div>
  );
};

export default Input;
