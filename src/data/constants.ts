export const BASE_API_URL = 'http://localhost:8080/api';

export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const PASSWORD_REGEX =
  /^(?=.*\d)(?=.*[!@#$%^&*()-+=])(?=.*[a-zA-Z]).{8,16}$/;

export const MYACCOUNT_NAV_ITEMS = [
  {
    label: '내 정보',
    href: '/myaccount',
  },
  {
    label: '내 연차, 당직',
    href: '/myaccount/vacation',
  },
];

export const POSITIONS: {
  [key: string]: { label: string; total_vacation: number };
} = {
  LEVEL1: {
    label: '레벨1',
    total_vacation: 15,
  },
  LEVEL2: {
    label: '레벨2',
    total_vacation: 18,
  },
  LEVEL3: {
    label: '레벨3',
    total_vacation: 21,
  },
  LEVEL4: {
    label: '레벨4',
    total_vacation: 24,
  },
  MANAGER: {
    label: '매니저',
    total_vacation: 27,
  },
};
