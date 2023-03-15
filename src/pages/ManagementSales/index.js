import React from "react";
import { getUser } from "helpers/parseJWT";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAddData } from "redux/addDataSlice";

const ManagementSales = () => {
  const { obe: userOBE } = useSelector(selectAddData);

  return (
    <>
      {userOBE?.includes(getUser().user) ? (
        <Redirect to="management-sales/OBE" />
      ) : (
        <Redirect to="management-sales/customer-management" />
      )}
    </>
  );
};

export default ManagementSales;
