import { POSITIONS, REQUEST_STATE } from '@/data/constants';
import { DUMMY_VACATION_REQUESTS } from '@/data/dummyData';
import { IvacationRequest } from '@/types/IvacationRequest';
import { Badge, Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

const columns: ColumnsType<IvacationRequest> = [
  {
    title: '사원',
    dataIndex: 'userName',
    key: 'userName',
    render: (_, { userName, position }) => (
      <>
        <Badge
          color={POSITIONS[position]?.color}
          count={position}
          style={{ marginRight: 5 }}
        />
        {userName}
      </>
    ),
  },

  {
    title: '연차/당직',
    dataIndex: 'type',
    key: 'type',
    render: (_, { type }) => <>{type === 'DUTY' ? '당직' : '연차'}</>,
  },
  {
    title: '시작일',
    dataIndex: 'start_date',
    key: 'start_date',
    sorter: (a, b) =>
      Number(a.start_date.replaceAll('-', '')) -
      Number(b.start_date.replaceAll('-', '')),
  },

  {
    title: '종료일',
    dataIndex: 'end_date',
    key: 'end_date',
    sorter: (a, b) =>
      Number(a.end_date.replaceAll('-', '')) -
      Number(b.end_date.replaceAll('-', '')),
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
        value: 'PENDING',
      },
      {
        text: '승인',
        value: 'RESOLVE',
      },
      {
        text: '거절',
        value: 'REJECT',
      },
    ],
    onFilter: (value: string | number | boolean, record) =>
      record.state.includes(value as string),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, { state }) => (
      <Space size="small">
        {state === 'PENDING' ? (
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
  },
];

export default function Admin() {
  return <Table columns={columns} dataSource={DUMMY_VACATION_REQUESTS} />;
}
