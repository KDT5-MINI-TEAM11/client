import axios from '@/api/axios';

export const changeMyInfo = async (
  accessToken: string | null,
  data: {
    userPassword?: string;
    phoneNumber?: string;
    profileThumbUrl?: string;
  },
) => {
  const response = await axios.patch('/v1/user/info', data, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
