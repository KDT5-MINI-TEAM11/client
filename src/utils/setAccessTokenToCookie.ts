export default function setAccessTokenToCookie(accessToken: string) {
  const date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  const expires = 'expires=' + date.toUTCString();
  const cookieString = `accessToken=${accessToken}; ${expires}; path=/`;
  document.cookie = cookieString;
}
