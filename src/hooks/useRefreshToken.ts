import axios from '@/api/axios';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import getPayloadFromJWT from '@/utils/getPayloadFromJWT';
import { useRecoilState } from 'recoil';
import deleteAccessTokenFromCookie from '@/utils/deleteAccessTokenFromCookie';
import setAccessTokenToCookie from '@/utils/setAccessTokenToCookie';

export default function useRefreshToken() {
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  const refreshAccessToken = async () => {
    const expirationTime = getPayloadFromJWT(accessToken)?.exp;
    const now = Math.floor(new Date().getTime() / 1000);
    // accessToken만료시간이 5분 미만으로 남은 경우
    if (expirationTime && expirationTime - now < 5 * 60) {
      try {
        const response = await axios.get('/v1/auth/refresh-token', {
          withCredentials: true,
        });
        const newAccessToken = response.data.response.accessToken;
        setAccessToken(newAccessToken);
        setAccessTokenToCookie(newAccessToken);
      } catch (error) {
        // 일단 에러인 경우 accessToken모두 삭제
        setAccessToken(null);
        deleteAccessTokenFromCookie();
      }
    } else {
      console.log(`만료 ${Math.floor((expirationTime - now) / 60)}분 남았어`);
    }
  };
  return refreshAccessToken;
}
