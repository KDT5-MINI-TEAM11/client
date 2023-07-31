import axios from '@/api/axios';

export const getUserHeader = async (accessToken: string | null) => {
  const response = await axios.get('/v1/user/userHeader', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
