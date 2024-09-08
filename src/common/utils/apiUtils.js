import axios from 'axios';

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // VUE_APP_API_BASE_URL를 VITE_API_BASE_URL로 변경
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Authorization' : ''
  },
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    // skipAuth 옵션이 true가 아닌 경우에만 토큰을 추가합니다.
    // if (!config.skipAuth) {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 403) {
      console.error('Access forbidden:', error.response.data);
      // 사용자에게 권한 없음 메시지 표시
      // 예: 로그인 페이지로 리다이렉트 또는 토큰 갱신 로직 실행
    }
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 인증되지 않은 경우 처리
          break;
        case 404:
          // 리소스를 찾을 수 없는 경우 처리
          break;
        default:
          // 기타 에러 처리
      }
    }
    return Promise.reject(error);
  }
);

export const apiRequest = async ({ url, method = 'GET', data = null, params = null, skipAuth = false }) => {
  try {
    console.log('Making API request to:', `${apiClient.defaults.baseURL}${url}`);
    const response = await apiClient({
      url,
      method,
      data,
      params,
      skipAuth // 새로운 옵션 추가
    });    
    return response;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const get = (url, params, skipAuth = false) => apiRequest({ url, method: 'GET', params, skipAuth });
export const post = (url, data, skipAuth = false) => apiRequest({ url, method: 'POST', data, skipAuth });
export const put = (url, data, skipAuth = false) => apiRequest({ url, method: 'PUT', data, skipAuth });
export const del = (url, skipAuth = false) => apiRequest({ url, method: 'DELETE', skipAuth });

export default {
  get,
  post,
  put,
  delete: del
};