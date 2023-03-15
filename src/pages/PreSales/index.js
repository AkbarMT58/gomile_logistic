import { getUser } from "helpers/parseJWT";
import React from "react";
import { Redirect } from "react-router-dom";

const index = () => {
  return (
    <>
      {getUser().role === "admin" ? (
        <Redirect to="pre-sales/voucher-generator" />
      ) : (
        <Redirect to="pre-sales/sales-request" />
      )}
    </>
  );
};

export default index;
