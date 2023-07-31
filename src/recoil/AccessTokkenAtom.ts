import getAccessTokenFromCookie from '@/utils/getAccessTokenFromCookie';
import { atom, selector } from 'recoil';

export const AccessTokenAtom = atom({
  key: 'AccessToken',
  default: getAccessTokenFromCookie(),
});

export const isSignedinSelector = selector({
  key: 'isSignedinSelector',
  get: ({ get }) => !!get(AccessTokenAtom),
});
