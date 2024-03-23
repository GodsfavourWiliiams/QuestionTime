import axios from 'axios';
import { BASE_URL } from './useUrls';
import { cookies } from 'next/headers';
import { TOKEN } from '@/lib/utils';

const axiosInstanceServer = () => {
  const cookieStore = cookies();
  const token = cookieStore.get(TOKEN.ACCESS)?.value;
  const instance = axios.create({
    baseURL: BASE_URL as string,
    timeout: 20000,
    timeoutErrorMessage:
      'Your request timed out, please check your internet connection',
    headers: {
      Accept: 'application/json',
      'content-type': 'application/json',
      Token: `${token}`,
    },
  });

  return instance;
};

export default axiosInstanceServer;
