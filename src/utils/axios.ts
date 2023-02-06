import axios from 'axios';
import {get} from 'lodash';
import Cookies from 'js-cookie';
import {API_URL, USER_KEY} from './env';

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 180000; // 30 seconds
axios.interceptors.request.use(
  async (response) => {
    const originalConfig: any = response;
    const cookie = await Cookies.get('_q');
    const userToken = cookie !== undefined ? JSON.parse(cookie) : null;
    if (userToken) {
      originalConfig.headers.Authorization = `Bearer ${userToken?.access_token}`;
    }
    originalConfig.headers['Access-Control-Allow-Origin'] = '*';
    originalConfig.headers['user_key'] = USER_KEY;
    originalConfig.headers.Accept = 'application/json';
    originalConfig.headers['Content-Type'] = 'application/json; charset=utf-8';

    return originalConfig;
  },
  (error) => Promise.reject(error),
);
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (get(error, 'response.data.code', '') === '401' || get(error, 'response.data.message', '') === 'Unauthorized') {
      Cookies.remove('_q');
    }
    return Promise.reject(error);
  },
);

export default axios;
