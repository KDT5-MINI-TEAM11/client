export default function getAccessTokenFromCookie() {
  const accessToken = document.cookie ? document.cookie.split('=')[1] : null;
  return accessToken;
}
