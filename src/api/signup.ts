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

export const signup = async (values: valuseType) => {
  const { confirm_password, ...otherData } = values;

  const response = await axios.post(
    `${BASE_API_URL}/v1/auth/signup`,
    otherData,
  );
  return response;
};
