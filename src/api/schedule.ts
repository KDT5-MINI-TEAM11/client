import axios from '@/api/axios';

export const addScheduleRequest = async (
  accessToken: string | null,
  scheduleData: {
    scheduleType: 'ANNUAL' | 'DUTY';
    startDate: string;
    endDate: string;
  },
) => {
  const response = await axios.post('/v1/user/schedule/add', scheduleData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const cancelScheduleRequest = async (
  accessToken: string | null,
  id: number,
) => {
  const response = await axios.post(
    '/v1/user/schedule/cancel',
    { id },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
export const modifyScheduleRequest = async (
  accessToken: string | null,
  id: number,
) => {
  const response = await axios.patch(
    '/v1/user/schedule/modify',
    { id },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
