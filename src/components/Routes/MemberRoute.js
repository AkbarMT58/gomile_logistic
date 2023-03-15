import React from "react";
import Cookies from "js-cookie";
import { Route, Redirect, withRouter } from "react-router-dom";

const MemberRoute = ({
  component: Component,
  match,
  path,
  location,
  ...rest
}) => {
  const ok = Cookies.get("oms_token");

  return (
    <Route
      {...rest}
      render={(props) =>
        ok ? <Component {...props} /> : <Redirect to={`/login`} />
      }
    />
  );
};

export default withRouter(MemberRoute);
