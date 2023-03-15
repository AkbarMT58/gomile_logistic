import Cookies from 'js-cookie';

function ResponseException(status, message) {
  this.message = message;
  this.status = status;
}

export default async function call_Ocistik_API({
  url,
  method,
  data,
  token,
  serverToken,
  local = false,
}) {
  try {
    const Xid = Cookies.get('Session_id');
    let headers = {
      Xid,
      'Content-Type': 'application/json',
      'cache-control': 'no-cache',
    };
    if (local) {
      headers = {
        ...headers,
        Xemail: `wahdangun@gmail.com`,
        key: `ocisuperkeren`,
      };
    } else {
      if (serverToken) {
        headers = { ...headers, Authorization: `Bearer ${serverToken}` };
      } else if (token) {
        const tokenCookies = Cookies.get('token');
        if (tokenCookies) {
          const jwtToken = atob(tokenCookies);
          headers = { ...headers, Authorization: `Bearer ${jwtToken}` };
        }
      }
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data,
    });

    if (response.status > 300) {
      switch (response.status) {
        case 400:
          throw new ResponseException(400, 'Bad request');
          break;
        case 429:
          throw new ResponseException(429, 'To many request');
          break;
        case 500:
          throw new ResponseException(
            500,
            'Terjadi Kesalahan, Silahkan coba lagi'
          );
          break;
        case 404:
          throw new ResponseException(404, 'Data tidak ditemukan');
          break;
        case 401:
          Cookies.remove('token');
          throw new ResponseException(401, 'Silahkan login');
          break;
      }
    }

    const result = await response.json();

    // if (result.status > 300) {
    switch (result.status) {
      case 429:
        throw new ResponseException(429, 'To many request');
        break;
      case 500:
        throw new ResponseException(
          500,
          'Terjadi Kesalahan, Silahkan coba lagi'
        );
        break;
    }
    // }

    return result;
  } catch (e) {
    return {
      status: e.status,
      message: e.message,
    };
  }
}
