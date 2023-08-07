import axios from '@/api/axios';

export const MySchedule = async (accessToken: string | null) => {
  const response = await axios('/dummy/user/schedule', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
