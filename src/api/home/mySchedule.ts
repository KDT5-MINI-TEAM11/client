import { customAxios } from '@/api/customAxios';

export const addScheduleRequest = async (scheduleData: {
  scheduleType: string;
  startDate: string;
  endDate: string;
}) => {
  const response = await customAxios.post(
    '/v1/user/schedule/add',
    scheduleData,
  );
  return response;
};

export const cancelScheduleRequest = async (id: number) => {
  const response = await customAxios.post('/v1/user/schedule/cancel', { id });
  return response;
};

export const getMySchedule = async () => {
  const response = await customAxios('/v1/user/schedule?year=2023', {
    // 년도 동적으로 변해야 함
  });
  return response;
};
