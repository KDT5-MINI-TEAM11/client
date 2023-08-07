import RequesTag from '@/components/RequesTag';
import { IMySchedule } from '@/types/IMySchdule';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Typography } from 'antd';
import { DUTY_ANNUAL } from '@/data/constants';

const { Text } = Typography;

const columns: ColumnsType<IMySchedule> = [
  {
    title: (
      <Text type="secondary" style={{ fontSize: 10 }}>
        연/당
      </Text>
    ),
    dataIndex: 'scheduleType',
    key: 'scheduleType',
    align: 'center',
    render: (_, { scheduleType }) => <>{DUTY_ANNUAL[scheduleType].label}</>,
  },

  {
    title: (
      <Text type="secondary" style={{ fontSize: 10 }}>
        시작일
      </Text>
    ),
    dataIndex: 'startDate',
    key: 'startDate',
    align: 'center',
    render: (_, { startDate }) => <>{startDate.slice(5)}</>,
  },
  {
    title: (
      <Text type="secondary" style={{ fontSize: 10 }}>
        종료일
      </Text>
    ),
    dataIndex: 'endDate',
    key: 'endDate',
    align: 'center',
    render: (_, { endDate }) => <>{endDate.slice(5)}</>,
  },
  {
    title: (
      <Text type="secondary" style={{ fontSize: 10 }}>
        상태
      </Text>
    ),
    key: 'state',
    dataIndex: 'state',
    render: (_, { state }) => <RequesTag state={state} />,
    align: 'center',
  },
];

interface MyScheduleProps {
  schedule: IMySchedule[];
  loading: boolean;
  caption: string;
}
export default function MySchedule({
  schedule,
  loading,
  caption,
}: MyScheduleProps) {
  return (
    <Table
      caption={caption}
      rowClassName="myScheduleRow"
      pagination={{ defaultPageSize: 5 }}
      columns={columns}
      dataSource={schedule}
      size="small"
      loading={loading}
    />
  );
}
