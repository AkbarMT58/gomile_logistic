import Cookies from "js-cookie";

const setUser = (data) => {
  Cookies.set("oms_token", data.access_token);
  Cookies.set("exp_token", data.exp);
};

const getUser = () => {
  const token = Cookies.get("oms_token");
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  const roles = parseJwt(token)?.roles;
  const role = parseJwt(token)?.roles[0];
  const division = parseJwt(token)?.division;
  const user = parseJwt(token)?.data.userName;
  const tokenData = parseJwt(token);
  return { roles, role, division, user, tokenData };
};

export { setUser, getUser };
