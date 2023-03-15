import Cookies from 'js-cookie';
import swal from 'sweetalert';
import { getUser } from 'helpers/parseJWT';
import Redirect from './Redirect';

const callAPI = async ({ url, method, data, token, login, bigInt = false }) => {
  let headers = {};
  try {
    if (token) {
      const tokenCookies = Cookies.get('oms_token');
      const expToken = Cookies.get('exp_token');
      const miliseconds = new Date().getTime() / 1000;
      if (miliseconds > expToken) {
        setTimeout(() => {
          swal('Oops', '', 'error', { button: false });
        }, 2000);
        Cookies.remove('oms_token');
        Cookies.remove('exp_token');
        window.location.href = '/login';
      }
      headers = {
        'Cache-Control': 'no-cache',
        Authorization: `Bearer ${tokenCookies}`,
      };
    } else if (!login) {
      headers = {
        key: 'omsjaya',
        'x-role': getUser().role,
        'x-user': getUser().user,
        xuser: getUser().user,
        xrole: getUser().role,
        xCode: 'ocijaya',
      };
    }

    if (token === 'false') {
      headers = {};
    }

    if (token === 'true') {
      headers = {
        key: 'omsjaya',
        'x-role': getUser().role,
        'x-user': getUser().user,
        xCode: 'ocijaya',
      };
    }

    if (method === 'POST' || method === 'DELETE' || method === 'PUT') {
      headers = { ...headers, 'Content-Type': 'application/json' };
    }

    const call = await fetch(url, {
      method: method,
      body: data,
      headers: headers,
    });
    if (call.status === 401) {
      Cookies.remove('oms_token');
      Cookies.remove('exp_token');
      setTimeout(() => {
        <Redirect path='/' />;
      }, 2000);

      throw new Error(
        'Your session is expired, you will be redirected to login page'
      );
    }

    if (call.status === 403 && login) {
      setTimeout(() => {
        <Redirect path='/' />;
      }, 1500);
      throw new Error('Username or password wrong !');
    }

    if (call.status === 403) {
      setTimeout(() => {
        <Redirect path='/' />;
      }, 1500);
      throw new Error('Forbidden access !');
    }

    if (call.status === 404) throw new Error('Data not found !');
    if (call.status === 500) throw new Error('Internal server error');
    
    if (bigInt === true) {
      const response = call;
      return response;
    } else {
      const response = await call.json();
      return response;
    }
  } catch (err) {
    swal('Oops', err.message, 'error', { button: false, timer: 3000 });
  }
};

export default callAPI;
