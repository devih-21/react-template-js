import axios from 'axios';
import qs from 'querystringify';

const RS_API_ENDPOINT = process.env.REACT_APP_RS_ENDPOINT;
const REMOBAY_API_ENDPOINT = process.env.REACT_APP_REMOBAY_ENDPOINT;

const TIMEOUT = 300000;

const getAuthToken = () => {
  return localStorage.getItem('token-id') || '';
};

const handleUrlApi = (keyword) => {
  switch (keyword) {
    case 'RS_API_ENDPOINT':
      return RS_API_ENDPOINT;
    case 'REMOBAY_API_ENDPOINT':
      return REMOBAY_API_ENDPOINT;
  }
  return RS_API_ENDPOINT;
};

const handleResponse = (r) => {
  if (!r) {
    window.location.href = '/login';
    return;
  }
  if ([401].includes(r?.status)) {
    window.location.href = '/login';
  } else {
    return r;
  }
};

const handleResponseAuth = (r) => {
  if (!r) {
    window.location.href = '/login';
    return;
  }
  if ([401, 404].includes(r?.status)) {
    return {
      status: 'FAILED',
      message: r?.data?.name,
    };
  } else {
    window.location.href = '/login';
  }
};

const redirectToSomethingWentWrongScreen = () => {
  return setTimeout(() => {
    window.location.href = '/500'; // direct and clear redux storage cache
  }, TIMEOUT);
};

export const rest = {
  get: async (api, endpoint, params, _, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            'token-id': auth,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen();
    try {
      const res = await axios.get(
        `${handleUrlApi(api) + endpoint}${
          JSON.stringify(params) !== '{}'
            ? '?' +
              qs.stringify({
                ...params,
              })
            : ''
        }`,
        options.headers ? options : {},
      );
      clearTimeout(handleTimeout);
      return res.data;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response);
    }
  },
  post: async (api, endpoint, params, _, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            'token-id': auth,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen();
    try {
      const res = await axios.post(handleUrlApi(api) + endpoint, params, options);
      clearTimeout(handleTimeout);
      return res;
    } catch (err) {
      clearTimeout(handleTimeout);

      return handleResponse(err?.response);
    }
  },
  put: async (api, endpoint, params, _, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            'token-id': auth,
          },
        };
      }
    }
    const handleTimeout = redirectToSomethingWentWrongScreen();
    try {
      const res = await axios.put(handleUrlApi(api) + endpoint, params, options);
      clearTimeout(handleTimeout);
      return res;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response);
    }
  },
  delete: async (api, endpoint, params, _, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            'token-id': auth,
          },
        };
      }
    }
    const handleTimeout = redirectToSomethingWentWrongScreen();
    try {
      const res = await axios.delete(
        `${handleUrlApi(api) + endpoint}${
          JSON.stringify(params) !== '{}'
            ? '?' +
              qs.stringify({
                ...params,
              })
            : ''
        }`,
        options,
      );
      clearTimeout(handleTimeout);
      return res;
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponse(err?.response);
    }
  },
  auth: async (api, endpoint, params, _, isAuth) => {
    let options = {};
    if (isAuth) {
      const auth = getAuthToken();
      if (auth) {
        options = {
          headers: {
            'token-id': auth,
          },
        };
      }
    }

    const handleTimeout = redirectToSomethingWentWrongScreen();
    try {
      const res = await axios.post(handleUrlApi(api) + endpoint, { ...params }, options);
      clearTimeout(handleTimeout);
      return {
        status: 'SUCCESS',
        message: res.data,
      };
    } catch (err) {
      clearTimeout(handleTimeout);
      return handleResponseAuth(err?.response);
    }
  },
};
