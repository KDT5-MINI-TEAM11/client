import { MySchedule } from '@/api/mySchedule';
import { modifyScheduleRequest } from '@/api/schedule';
import { REQUEST_STATE } from '@/data/constants';
import useRefreshToken from '@/hooks/useRefreshToken';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Select, Button, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

interface VacationRequestType {
  key: number;
  id: number;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4';
  type: 'ANNUAL' | 'DUTY';
  startDate: string;
  endDate: string;
  state: 'PENDING' | 'APPROVE' | 'REJECT';
}

export default function Vaction() {
  // antd message(화면 상단에 뜨는 메세지)기능
  const [messageApi, contextHolder] = message.useMessage();

  const [vacationRequests, setVacationRequests] = useState<
    VacationRequestType[]
  >([]);

  const [isvacationRequestsLoading, setIsvacationRequestsLoading] =
    useState(false);

  const [isModifying, setIsModifying] = useState(false);

  const accessToken = useRecoilValue(AccessTokenAtom);

  const { refreshAccessToken } = useRefreshToken();

  const { Option } = Select;

  useEffect(() => {
    setIsvacationRequestsLoading(true);
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      await refreshAccessToken();
      try {
        const response = await MySchedule(accessToken);
        if (response.status === 200) {
          const vacationRequestsData = response.data
            .response as VacationRequestType[];
          // 성공했을때
          setVacationRequests(
            vacationRequestsData.map((el) => {
              return { ...el, key: el.id };
            }),
          );
          console.log(setVacationRequests);
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '연가/당직 데이터를 불러오지 못했습니다.',
        );
      } finally {
        setIsvacationRequestsLoading(false);
      }
    };
    getData();
  }, [accessToken]);

  /*   const handleModify = async (id: number) => {
    setIsModifying(true)
    try {
      const response =  await modifyScheduleRequest(accessToken, id)
      if(response.status === 200) {

      }
    }
  }; */

  const columns: ColumnsType<VacationRequestType> = [
    {
      title: '연차/당직',
      dataIndex: 'type',
      key: 'type',
      render: (_, { type }) => (
        <div style={{ marginRight: 5 }}>
          {type === 'DUTY' ? '당직' : '연차'}
        </div>
      ),
      filters: [
        {
          text: '연차',
          value: 'ANNUAL',
        },
        {
          text: '당직',
          value: 'DUTY',
        },
      ],
      onFilter: (value: string | number | boolean, record) =>
        record.type.includes(value as string),
    },
    {
      title: '시작일',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) =>
        Number(a.startDate.replaceAll('-', '')) -
        Number(b.startDate.replaceAll('-', '')),
    },

    {
      title: '종료일',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) =>
        Number(a.endDate.replaceAll('-', '')) -
        Number(b.endDate.replaceAll('-', '')),
    },

    {
      title: '승인여부',
      key: 'tags',
      dataIndex: 'tags',
      render: (_, { state }) => (
        <Tag
          color={REQUEST_STATE[state]?.color}
          style={{ width: 50, textAlign: 'center' }}
        >
          {REQUEST_STATE[state]?.label}
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
      render: (_, { id, state }) => (
        <Space size="small">
          {state === 'PENDING' ? (
            <>
              <Button
                size="small"
                type="primary"
                /* onClick={() => handleRequest(id, 'APPROVE')} */
                disabled={isModifying}
              >
                승인
              </Button>
            </>
          ) : (
            <Button
              size="small"
              style={{ marginRight: 50 }}
              disabled={isModifying}
              danger
              /* onClick={() => handleRequest(id, 'PENDING')} */
            >
              취소
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const currentYear = new Date().getFullYear();

  const selectedYearsOptions = [];
  for (let i = 0; i <= 5; i++) {
    const year = currentYear - i;
    selectedYearsOptions.push(
      <Option key={year} value={year}>
        {year}
      </Option>,
    );
  }

  return (
    <>
      {contextHolder}
      <Select style={{ width: 100 }} defaultValue={currentYear}>
        {selectedYearsOptions}
      </Select>
      <Table
        size="small"
        columns={columns}
        dataSource={vacationRequests}
        loading={isvacationRequestsLoading}
      />
    </>
  );
}
