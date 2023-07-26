export const NAV_ITEMS = [
  {
    label: '홈',
    href: '/',
  },
  {
    label: '로그인',
    href: '/signin',
  },
  {
    label: '회원가입',
    href: '/signup',
  },
  {
    label: '내계정',
    href: '/myaccount',
  },
];

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=.*[a-zA-Z]).{8,16}$/;
