import axios from '@/api/axios';

export const scheduleList = async (year: number, month: number) => {
  const response = await axios(
    `/dummy/user/schedule/??year=${year}&month=${month}`,
    {
      headers: {
        'content-type': 'application/json',
      },
      withCredentials: true,
    },
  );
  return response;
};
