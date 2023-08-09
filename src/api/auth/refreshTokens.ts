import { BASE_API_URL } from '@/data/constants';
import {
  deleteAccessTokenFromCookie,
  setAccessTokenToCookie,
} from '@/utils/cookies';
import axios from 'axios';

export default async function refreshAccessToken() {
  try {
    const response = await axios(`${BASE_API_URL}/v2/auth/refresh-token`, {
      // refreshToken,
    });
    if (response.status === 200) {
      // localStorage.setItem('refreshToken', response.data.response.refreshToken);
      setAccessTokenToCookie(response.data.response.accessToken);
      return response.data.response.accessToken;
    }
  } catch (error) {
    deleteAccessTokenFromCookie();
    localStorage.removeItem('refreshToken');
    throw error;
  }
}
