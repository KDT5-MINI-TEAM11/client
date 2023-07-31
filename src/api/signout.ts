import axios from '@/api/axios';

export const signout = async () => {
  const response = await axios.post('/v1/auth/signout');
  return response;
};
