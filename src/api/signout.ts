import { BASE_API_URL } from '@/data/constants';

export const signout = async () => {
  const response = await fetch(`${BASE_API_URL}/v1/auth/signout`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
  });
  return response;
};
