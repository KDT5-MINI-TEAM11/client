import { customAxios } from '@/api/customAxios';

export const checkEmail = async (userEmail: string) => {
  const response = await customAxios.post('/v1/auth/checkEmail', userEmail, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
};

export const checkEmailAuth = async (data: {
  userEmail: string;
  userEmailAuth: string;
}) => {
  const response = await customAxios.post('/v1/auth/checkEmailAuth', data, {
    headers: { 'Content-Type': 'application/json' },
  });
  return response;
};
