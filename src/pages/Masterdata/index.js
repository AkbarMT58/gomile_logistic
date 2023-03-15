import React from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from 'react-router-dom';


const landing_home = () => {
  return (
    <>
     <Redirect to="masterdata/artikel" />

  
    </>
  );
};

export default landing_home;
