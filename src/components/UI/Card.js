import React from "react";

const Card = ({ children, ...restPorps }) => {
  return <div {...restPorps}>{children}</div>;
};

export default Card;
