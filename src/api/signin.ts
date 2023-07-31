import axios from '@/api/axios';

export const signin = async (loginData: {
  userEmail: string;
  userPassword: string;
}) => {
  const response = await axios.post('/v1/auth/signin', loginData, {
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  });
  return response;
};
