import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

export const validateToken = async () => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return { isValid: false, reason: 'no-token' };
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      localStorage.removeItem('token');
      return { isValid: false, reason: 'expired' };
    }

    // 서버에 토큰 유효성 확인 요청
    const response = await axios.post('/api/auth/valid', { token }, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    return { isValid: response.data.isValid, reason: response.data.isValid ? 'valid' : 'invalid' };
  } catch (error) {
    console.error('Token validation error:', error);
    return { isValid: false, reason: 'error' };
  }
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
