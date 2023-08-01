import axios from '@/api/axios';

export const getMyAccount = async () => {
  const response = await axios('/v1/user/info');

  return response;
};
