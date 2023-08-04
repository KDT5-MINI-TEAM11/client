import axios from '@/api/axios';

export const scheduleList = async (
  accessToken: string | null,
  year: number,
  month: number,
) => {
  const response = await axios(
    `/dummy/user/schedule/??year=${year}&month=${month}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return response;
};
