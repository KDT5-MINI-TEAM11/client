import { BASE_API_URL } from '@/data/constants';
import {
  getAccessTokenFromCookie,
  setAccessTokenToCookie,
} from '@/utils/cookies';
import getPayloadFromJWT from '@/utils/getPayloadFromJWT';
import axios from 'axios';

export const customAxios = axios.create({
  baseURL: BASE_API_URL,
  timeout: 2000, // 2초간 아무 응답이 없으면 취소
});

customAxios.interceptors.request.use(
  async (req) => {
    const accessToken = getAccessTokenFromCookie();
    // accessToken이 없는 경우(로그아웃을 한 상태에서하는 요청들:회원가입, 이메일중복체크, 로그인 등..)
    if (!accessToken) {
      return req;
    }

    // 로그인 요청, 회원가입 등... 을 제외한 모든 요청은 accessToken을 필요로함
    req.headers.Authorization = `Bearer ${accessToken}`;

    // 요청단계에서 accessToken의 만료시간을 확인해서 5분 이하로 남았을 경우 요청을 보내기 전에 accessToken을 재발급 받는 로직

    // access토큰의 만료시간을 초로 나타낸 시간
    const expirationTime = getPayloadFromJWT(accessToken).exp as number;
    // 현재시간을 초로 나타냄
    const currentTime = Math.floor(new Date().getTime() / 1000);
    // 만료시간 > 5분 남은 경우
    const expirationLeft = expirationTime - currentTime;
    console.log(`만료 ${Math.floor(expirationLeft / 60)}분 남았습니다.`);
    // 만료시간이 여유 있으면 그냥 req를 return
    if (expirationLeft > 5 * 60) return req;

    //// 만료시간 <= 5분 인 경우

    // Bearer 토큰 없어도 된다. 있어도 되긴함
    req.headers.Authorization = null;

    const refreshToken = localStorage.getItem('refreshToken')
      ? localStorage.getItem('refreshToken')
      : null;

    // 이 요청은 axios instance에서 하면 안된다.
    const response = await axios.post(`${BASE_API_URL}/v2/auth/refresh-token`, {
      refreshToken,
    });

    // 새롭게 받은 refesh토큰 로컬저장소에 저장
    localStorage.setItem('refreshToken', response.data.response.refreshToken);
    // 새롭게 받은 access토큰 쿠키에 저장
    setAccessTokenToCookie(response.data.response.accessToken);
    console.log('토큰 재발급!');

    // 모든 access토큰이 필요한 요청에서 bearer를 새롭게 받은 access토큰으로 설정
    req.headers.Authorization = `Bearer ${response.data.response.accessToken}`;
    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },

  // 에러인 경우 intercept
  async (error) => {
    const status = error.response ? error.response.status : null;

    // accessToken이 만료가 되어서 401에러를 응답으로 받는경우 refreshToken을 통해 accessToken을 재발급 받는 로직
    // 위에서 5분 이하 or 만료가 된 경우 이미 accessToken을 재발급받는 로직이 있으므로 아래 식이 실행될 일은 없음
    if (status === 401) {
      const refreshToken = localStorage.getItem('refreshToken')
        ? localStorage.getItem('refreshToken')
        : null;

      // 이 요청은 axios instance에서 하면 안된다.
      const response = await axios.post(
        `${BASE_API_URL}/v2/auth/refresh-token`,
        {
          refreshToken,
        },
      );

      // 새롭게 받은 refesh토큰 로컬저장소에 저장
      localStorage.setItem('refreshToken', response.data.response.refreshToken);
      // 새롭게 받은 access토큰 쿠키에 저장
      setAccessTokenToCookie(response.data.response.accessToken);
      console.log('토큰 재발급!');
    }

    return Promise.reject(error);
  },
);
