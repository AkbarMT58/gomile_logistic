import React from 'react';

const LayoutCard = ({ children, classNames }) => {
  return (
    <div
      className={`${
        classNames ? classNames : ''
      } bg-white rounded-xl shadow-md py-3`}>
      {children}
    </div>
  );
};

export default LayoutCard;
