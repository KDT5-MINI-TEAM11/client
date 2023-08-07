import { customAxios } from '@/api/customAxios';

export const scheduleList = async (year: number, month: number) => {
  const response = await customAxios(
    `/dummy/user/schedule/??year=${year}&month=${month}`,
  );
  return response;
};
