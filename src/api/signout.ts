import axios from '@/api/axios';

export const signout = async () => {
  const response = await axios('/v1/auth/signout');
  return response;
};
