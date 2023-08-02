import axios from '@/api/axios';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import getPayloadFromJWT from '@/utils/getPayloadFromJWT';
import { useRecoilState } from 'recoil';
import setAccessTokenToCookie from '@/utils/setAccessTokenToCookie';

// 백엔드문제인지 프론트 문제인지 모르겠으나 문제 있음.

export default function useRefreshToken() {
  // 리코일에 저장한 access토큰
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  const refreshAccessToken = async () => {
    // access토큰의 만료시간을 초로 나타낸 시간
    const expirationTime = getPayloadFromJWT(accessToken)?.exp;

    // 현재시간을 초로 나타냄
    const nowToSecond = Math.floor(new Date().getTime() / 1000);

    // accessToken이 있고(로그인 되어있고) 만료시간이 5분 이내로 남은 경우
    if (expirationTime && expirationTime - nowToSecond < 5 * 60) {
      try {
        const response = await axios('/v1/auth/refresh-token', {
          withCredentials: true, // httpOnly인 경우 설정해줘야함
        });

        // 새로 받은 access토큰
        const newAccessToken = response.data.response.accessToken;

        // recoil에 저장
        setAccessToken(newAccessToken);

        // 쿠키에 저장
        setAccessTokenToCookie(newAccessToken);
        console.log('재발급완료');
      } catch (error) {
        console.log(error);
        // 일단 에러인 경우 accessToken을 쿠키와 recoil에서 모두 삭제
        // setAccessToken(null);
        // deleteAccessTokenFromCookie();
      }
      // acessToken이 null인 경우
    } else if (!expirationTime) {
      console.log('로그인 하슈');
      return;
    } else {
      console.log(
        `만료 ${Math.floor((expirationTime - nowToSecond) / 60)}분 남았습니다.`,
      );
    }
  };
  return { refreshAccessToken };
}
