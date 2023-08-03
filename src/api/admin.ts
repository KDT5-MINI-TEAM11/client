import axios from '@/api/axios';

export const getVacationRequests = async (accessToken: string | null) => {
  const response = await axios.get('/v1/admin/list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const approveRequest = async (
  accessToken: string | null,
  id: number,
) => {
  const response = await axios.put(
    '/v1/admin/approve',
    { id },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
