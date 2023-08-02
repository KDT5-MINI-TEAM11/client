import axios from '@/api/axios';

export const checkEmail = async (userEmail: string) => {
  const response = await axios.post('/v1/auth/checkEmail', userEmail, {
    headers: { 'content-type': 'application/json' },
  });
  return response;
};

export const checkEmailAuth = async (data: {
  userEmail: string;
  userEmailAuth: string;
}) => {
  const response = await axios.post('/v1/auth/checkEmailAuth', data, {
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
};
