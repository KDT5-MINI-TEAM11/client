export default function deleteAccessTokenFromCookie() {
  const date = new Date();
  // 쿠키는 따로 삭제 방법이 있지 않고 만료시간을 현재로 줘서 자동적으로 삭제되게
  const expires = 'expires=' + date.toUTCString();
  const cookieString = `accessToken=; ${expires}; path=/`;
  document.cookie = cookieString;
}
