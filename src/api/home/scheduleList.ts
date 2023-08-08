import { customAxios } from '@/api/customAxios';

export const scheduleList = async (year: number) => {
  // 추후에 엔드포인트 url 변경해야함 /v1/schedule/list?year=${year} 이거로
  const response = await customAxios(`/v1/user/schedule/list?year=${year}`);
  return response;
};
