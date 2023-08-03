import axios from '@/api/axios';

export const getVacationRequests = async (accessToken: string | null) => {
  const response = await axios.get('/v1/admin/list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const approveRejectPending = async (
  accessToken: string | null,
  id: number,
  type: 'APPROVE' | 'REJECT' | 'PENDING',
) => {
  const response = await axios.post(
    `/v1/admin/${type.toLowerCase()}`,
    { id },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};

export const getWorkers = async (accessToken: string | null) => {
  const response = await axios.get('/v1/admin/worker-list', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const changePosition = async (
  accessToken: string | null,
  id: number,
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4',
) => {
  const response = await axios.post(
    `/v1/admin/change-position`,
    { id, position },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
