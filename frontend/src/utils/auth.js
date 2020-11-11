import { httpStatusCode, BASE_URL } from '../utils/utils.js';

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((response) => {
      if (response.status === httpStatusCode.OK) {
        return response.json();
      }
      else {
        const err = new Error();
        err.message = String(httpStatusCode.BAD_REQUEST);
        return err;
      }
  })
  .then((res) => {
    return res;
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password })
  })
  .then((response) => {
      const err = new Error();
      if (response.status === httpStatusCode.OK) {
        return response.json();
      }
        else if (response.status === httpStatusCode.BAD_REQUEST) {
          err.message = String(httpStatusCode.BAD_REQUEST);
          return err;
        }
        else if (response.status === httpStatusCode.UNAUTHORIZED) {
          err.message = String(httpStatusCode.UNAUTHORIZED);
          return err;
        }
        else {
          return err;
        }
  })
  .then((res) => {
    return res;
  });
};

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => {
      if (res.status === httpStatusCode.UNAUTHORIZED) {
        const err = new Error();
        err.message = String(httpStatusCode.UNAUTHORIZED);
        return err;
      }
      return res.json();
    })
    .then(data => {
      return data;
    });
}
