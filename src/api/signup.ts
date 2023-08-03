import axios from '@/api/axios';

interface valuseType {
  confirm_password: string;
  phone: string;
  position: string;
  profileThumbUrl: string;
  userEmail: string;
  userPassword: string;
  userName: string;
}

export const signup = async (values: valuseType) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { confirm_password, ...otherData } = values;

  const response = await axios.post('/v1/auth/signup', otherData, {
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
  });
  return response;
};
