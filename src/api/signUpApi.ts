import { BASE_API_URL } from '@/data/constants';
import axios from 'axios';

interface valuseType {
  confirm_password: string;
  phone: string;
  position: string;
  profileThumbUrl: string;
  userEmail: string;
  userPassword: string;
  userName: string;
}

export const signUp = async (values: valuseType) => {
  const { confirm_password, ...otherData } = values;

  const res = await axios.post(
    `${BASE_API_URL}/v1/auth/signup`,
    JSON.stringify(otherData),
    {
      headers: {
        'content-type': 'application/json',
      },
    },
  );
  return res;
};
