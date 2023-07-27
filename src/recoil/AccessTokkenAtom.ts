import { atom, selector } from 'recoil';

export const AccessTokenAtom = atom({
  key: 'AccessToken',
  default: 'accesstokkenfromlocalstorage',
});

export const ToUpperCaseToken = selector({
  key: 'UpperToken',
  get: ({ get }) => {
    const AcessToken = get(AccessTokenAtom);
    return AcessToken.toUpperCase();
  },
});
