interface DataType {
  key: number;
  id: number;
  profileThumbUrl: string;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4';
  createAt: string;
}

export const DUMMY_WORKERS: DataType[] = [
  {
    key: 1,
    id: 1,
    userName: 'Kim',
    profileThumbUrl: 'imageurl',
    position: 'LEVEL1',
    createAt: '2021-08-03',
  },
  {
    id: 2,
    key: 2,
    userName: 'lee',
    profileThumbUrl: 'imageurl',
    position: 'LEVEL2',
    createAt: '2021-08-03',
  },
  {
    id: 3,
    key: 3,
    userName: 'park',
    profileThumbUrl: 'imageurl',
    position: 'LEVEL3',
    createAt: '2021-08-03',
  },
];
