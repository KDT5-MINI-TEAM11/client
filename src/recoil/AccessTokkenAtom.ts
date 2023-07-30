import getAccessTokenFromCookie from '@/utils/getAccessTokenFromCookie';
import { atom } from 'recoil';

export const AccessTokenAtom = atom({
  key: 'AccessToken',
  default: getAccessTokenFromCookie(),
});

// export const ToUpperCaseToken = selector({
//   key: 'UpperToken',
//   get: ({ get }) => {
//     const AcessToken = get(AccessTokenAtom);
//     return AcessToken.toUpperCase();
//   },
// });
