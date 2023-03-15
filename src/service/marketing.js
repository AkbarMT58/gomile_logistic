import callAPI from 'service/config';

let baseUrl = process.env.REACT_APP_URL_API_GATEWAY;
let baseUrlGolang = process.env.REACT_APP_URL_API_GATEWAY_GOLANG;

let baseUrlNewGolang = process.env.REACT_APP_URL_API_GATEWAY_NEW_GOLANG;
let tokenize = true;
let noHeader = 'false';

if (process.env.REACT_APP_ENV === 'DEVELOPMENT') {
  baseUrl = process.env.REACT_APP_URL_API_OMS_DEV;
  baseUrlGolang = process.env.REACT_APP_URL_API_GATEWAY_GOLANG;
  tokenize = false;
  noHeader = 'true';
}

export async function sendBlastEmail(data) {
    const url = `${baseUrlNewGolang}/list-email-template/send`;
    return callAPI({
        url,
        method: 'POST',
        token: true,
        data: data
    });
}

export async function getEmailTemplate() {
    const url = `${baseUrlNewGolang}/list-email-template`;
    return callAPI({
      url,
      method: 'GET',
      token: true,
    });
}

export async function createEmailTemplate(data) {
    const url = `${baseUrlNewGolang}/list-email-template`;
    return callAPI({
        url,
        method: 'POST',
        token: true,
        data: data
    });
}

export async function updateEmailTemplate(data) {
    const url = `${baseUrlNewGolang}/list-email-template`;
    return callAPI({
        url,
        method: 'PUT',
        token: true,
        data: data
    });
}

export async function deleteEmailTemplate(id) {
    const url = `${baseUrlNewGolang}/list-email-template/${id}`;
    return callAPI({
        url,
        method: 'DELETE',
        token: true,
    });
}

