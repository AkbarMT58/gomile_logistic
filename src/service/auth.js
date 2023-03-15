import callAPI from "service/config";

export async function login(data, login) {
  const url = `${process.env.REACT_APP_URL_API_GATEWAY_LOGIN}/token`;
  return callAPI({
    url,
    method: "POST",
    data,
    login,
  });
}
