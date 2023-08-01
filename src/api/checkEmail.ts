import axios from 'axios';
import { BASE_API_URL } from '@/data/constants';

export const checkEmail = async (userEmail: string) => {
  const response = await axios.post(
    `${BASE_API_URL}/v1/auth/checkEmail`,
    userEmail,
    { headers: { 'content-type': 'application/json' } },
  );
  return response;
};
