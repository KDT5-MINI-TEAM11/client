import { customAxios } from '@/api/customAxios';

export const addScheduleRequest = async (scheduleData: {
  scheduleType: 'ANNUAL' | 'DUTY';
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
  const response = await customAxios('/dummy/user/schedule', {
    // 현재 더미임
  });
  return response;
};
