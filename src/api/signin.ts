import { BASE_API_URL } from '@/data/constants';

export const signin = async (loginData: {
  userEmail: string;
  userPassword: string;
}) => {
  const response = await fetch(`${BASE_API_URL}/v1/auth/signin`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  return response;
};
