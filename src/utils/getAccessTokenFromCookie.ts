export default function getAccessTokenFromCookie() {
  // 쿠키가 있으면 가져오고 없으면 null
  // 좋은 로직은 아님. 다른 쿠키가 없기 때문에 가능,
  const accessToken = document.cookie ? document.cookie.split('=')[1] : null;
  return accessToken;
}
