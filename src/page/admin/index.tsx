import { POSITIONS, REQUEST_STATE } from '@/data/constants';
import { Badge, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface DataType {
  id: string;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4' | 'MANAGER';
  type: 'vacation' | 'duty';
  startDate: string;
  endDate: string;
  state: 'pending' | 'resolve' | 'reject';
}

const columns: ColumnsType<DataType> = [
  {
    title: '사원',
    dataIndex: 'userName',
    key: 'userName',
    render: (_, { userName, position }) => (
      <>
        {userName}
        <Badge
          color={POSITIONS[position]?.color}
          count={position}
          style={{ marginLeft: 5 }}
        />
      </>
    ),
    align: 'center',
  },

  {
    title: '연차/당직',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type }) => <>{type === 'duty' ? '당직' : '연차'}</>,
    align: 'center',
  },
  {
    title: '시작일',
    dataIndex: 'startDate',
    key: 'startDate',
    sorter: (a, b) =>
      Number(a.startDate.replaceAll('-', '')) -
      Number(b.startDate.replaceAll('-', '')),
    align: 'center',
  },

  {
    title: '종료일',
    dataIndex: 'endDate',
    key: 'endDate',
    sorter: (a, b) =>
      Number(a.endDate.replaceAll('-', '')) -
      Number(b.endDate.replaceAll('-', '')),
    align: 'center',
  },

  {
    title: '승인여부',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { state }) => (
      <Tag
        color={REQUEST_STATE[state].color}
        style={{ width: 50, textAlign: 'center' }}
      >
        {REQUEST_STATE[state].label}
      </Tag>
    ),
    filters: [
      {
        text: '심사중',
        value: 'pending',
      },
      {
        text: '승인',
        value: 'resolve',
      },
      {
        text: '거절',
        value: 'reject',
      },
    ],
    onFilter: (value: string | number | boolean, record) =>
      record.state.includes(value as string),
    align: 'center',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { state }) => (
      <Space size="small">
        {state === 'pending' ? (
          <>
            <Button size="small" type="primary">
              승인
            </Button>
            <Button size="small" danger>
              거절
            </Button>
          </>
        ) : (
          <Button size="small" danger>
            취소
          </Button>
        )}
      </Space>
    ),
    align: 'center',
  },
];

const data: DataType[] = [
  {
    id: '1',
    userName: '배종윤',
    position: 'LEVEL1',
    type: 'duty',
    startDate: '2023-07-30',
    endDate: '2023-08-03',
    state: 'pending',
  },
  {
    id: '2',
    userName: '이정우',
    position: 'LEVEL2',
    type: 'vacation',
    startDate: '2023-07-31',
    endDate: '2023-08-04',
    state: 'resolve',
  },
  {
    id: '3',
    userName: '이호우',
    position: 'LEVEL3',
    type: 'vacation',
    startDate: '2023-08-01',
    endDate: '2023-08-04',
    state: 'reject',
  },
  {
    id: '4',
    userName: '남기훈',
    position: 'LEVEL4',
    type: 'duty',
    startDate: '2023-08-04',
    endDate: '2023-08-04',
    state: 'resolve',
  },
  {
    id: '5',
    userName: '박진영',
    position: 'LEVEL2',
    type: 'duty',
    startDate: '2023-08-03',
    endDate: '2023-08-04',
    state: 'reject',
  },
];

export default function Admin() {
  console.log(POSITIONS['LEVEL1']?.color);
  return <Table columns={columns} dataSource={data} />;
}
