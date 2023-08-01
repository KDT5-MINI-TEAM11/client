import axios from '@/api/axios';

export const getMyAccount = async (accessToken: string | null) => {
  const response = await axios('/v1/user/info', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return response;
};
