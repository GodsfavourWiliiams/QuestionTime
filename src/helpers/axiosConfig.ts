import axios from 'axios';
import { BASE_URL } from './useUrls';
import { TOKEN } from '@/lib/utils';

export const setAuthToken = (token: string) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.Token = `${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers['Token'];
  }
};

export const getAuthToken = () => {
  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  };
  if (typeof window !== 'undefined') {
    // Get's Cookie storage
    return getCookie(TOKEN.ACCESS);
  }
};

export const getAuthorizationHeader = () => getAuthToken();

// Creating axios client, preconfigured with base url and other fields
const axiosInstance = axios.create({
  baseURL: BASE_URL as string,
  timeout: 20000,
  timeoutErrorMessage:
    'Your request timed out, please check your internet connection',
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
    Token: getAuthorizationHeader(),
  },
});

export const cancelTokenSource = axios.CancelToken.source();

// Intercept requests
axiosInstance.interceptors.request.use(
  async (config: any) => {
    config.headers.Token = getAuthorizationHeader();
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

//Intercept responses
axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line prefer-promise-reject-errors
      reject(error);
    });
  }
);

export default axiosInstance;
