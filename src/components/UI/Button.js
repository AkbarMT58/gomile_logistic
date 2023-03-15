import React from "react";

const Button = ({ children, ...restPorops }) => {
  return <button {...restPorops}>{children}</button>;
};

export default Button;
