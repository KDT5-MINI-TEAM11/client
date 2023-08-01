export default function setAccessTokenToCookie(accessToken: string) {
  const date = new Date();

  // 30분 추가
  date.setTime(date.getTime() + 30 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();

  // 쿠키에 accessToke, 만료시간, path지정
  const cookieString = `accessToken=${accessToken}; ${expires}; path=/`;
  document.cookie = cookieString;
}
