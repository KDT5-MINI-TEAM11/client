import axios from '@/api/axios';

export const verificationEmail = async (userEmail: string) => {
  const response = await axios.post('/v1/auth/sendEmail', userEmail, {
    headers: { 'content-type': 'application/json' },
  });
  return response;
};
