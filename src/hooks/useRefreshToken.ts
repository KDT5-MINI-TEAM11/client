import axios from '@/api/axios';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { setAccessTokenToCookie } from '@/utils/cookies';
import getPayloadFromJWT from '@/utils/getPayloadFromJWT';
import { useRecoilState } from 'recoil';

// 백엔드문제인지 프론트 문제인지 모르겠으나 문제 있음.

export default function useRefreshToken() {
  // 리코일에 저장한 access토큰
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  const refreshAccessToken = async () => {
    // aceeToken이 없는 경우(로그인이 안되어있는경우, 임의로 삭제한 경우) 아무것도 실행안함
    // 애초에 이 실행이 될 일이 없음
    if (!accessToken) {
      return;
    }
    // access토큰의 만료시간을 초로 나타낸 시간
    const expirationTime = getPayloadFromJWT(accessToken).exp as number;

    // 현재시간을 초로 나타냄
    const currentTime = Math.floor(new Date().getTime() / 1000);

    // 만료가 되었거나 만료시간이 5분 이내로 남은 경우
    if (expirationTime - currentTime < 5 * 60) {
      try {
        // httpOnly 쿠키에 담긴 refreshToken을 서버에 전송
        // httpOnly 쿠키는 자바스크립트로 접근할 수 없음
        const response = await axios('/v1/auth/refresh-token', {
          withCredentials: true,
        });

        // 새로 받은 access토큰
        const newAccessToken = response.data.response.accessToken;

        // recoil에 저장
        setAccessToken(newAccessToken);

        // 쿠키에 저장
        setAccessTokenToCookie(newAccessToken);

        console.log('accessToken 재발급완료');
      } catch (error) {
        console.log(error);
        // 일단 에러인 경우 accessToken을 쿠키와 recoil에서 모두 삭제
        // setAccessToken(null);
        // deleteAccessTokenFromCookie();
      }
    } else {
      console.log(
        `만료 ${Math.floor((expirationTime - currentTime) / 60)}분 남았습니다.`,
      );
    }
  };
  return { refreshAccessToken };
}
