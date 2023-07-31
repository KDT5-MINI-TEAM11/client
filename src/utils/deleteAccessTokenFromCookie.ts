export default function deleteAccessTokenFromCookie() {
  const date = new Date();
  const expires = 'expires=' + date.toUTCString();
  const cookieString = `accessToken=; ${expires}; path=/`;
  document.cookie = cookieString;
}
