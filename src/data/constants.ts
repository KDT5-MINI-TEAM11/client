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

export const MYACCOUNT_NAV_ITEMS = [
  {
    label: '내 정보',
    href: '/myaccount',
  },
  {
    label: '내 정보 수정',
    href: '/myaccount/edit',
  },
  {
    label: '내 연차, 당직',
    href: '/myaccount/vacation',
  },
];

export const POSITIONS: {
  [key: string]: { label: string; maxVacation: number };
} = {
  LEVEL1: {
    label: '레벨1',
    maxVacation: 15,
  },
  LEVEL2: {
    label: '레벨2',
    maxVacation: 18,
  },
  LEVEL3: {
    label: '레벨3',
    maxVacation: 21,
  },
  LEVEL4: {
    label: '레벨4',
    maxVacation: 24,
  },
  MANAGER: {
    label: '매니저',
    maxVacation: 27,
  },
};
