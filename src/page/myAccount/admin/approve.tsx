import { approveRejectPending, getVacationRequests } from '@/api/admin';
import { POSITIONS, REQUEST_STATE } from '@/data/constants';
import useRefreshToken from '@/hooks/useRefreshToken';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Badge, Button, Space, Table, Tag, message } from 'antd';
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

export default function Approve() {
  // antd message(화면 상단에 뜨는 메세지)기능
  const [messageApi, contextHolder] = message.useMessage();

  const [vacationRequests, setVacationRequests] = useState<
    VacationRequestType[]
  >([]);

  const [isvacationRequestsLoading, setIsvacationRequestsLoading] =
    useState(false);
  const [isAppoving, setIsApproving] = useState(false);

  const accessToken = useRecoilValue(AccessTokenAtom);

  const { refreshAccessToken } = useRefreshToken();

  useEffect(() => {
    setIsvacationRequestsLoading(true);
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      await refreshAccessToken();
      try {
        const response = await getVacationRequests(accessToken);
        if (response.status === 200) {
          const vacationRequestsData = response.data
            .response as VacationRequestType[];
          // 성공했을때
          setVacationRequests(
            vacationRequestsData.map((el) => {
              return { ...el, key: el.id };
            }),
          );
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

  // 승인
  const handleRequest = async (
    id: number,
    type: 'APPROVE' | 'REJECT' | 'PENDING',
  ) => {
    setIsApproving(true);
    try {
      const response = await approveRejectPending(accessToken, id, type);
      if (response.status === 200) {
        setVacationRequests(
          vacationRequests.map((request) =>
            request.id === id ? { ...request, state: type } : request,
          ),
        );
        messageApi.open({
          type: 'success',
          content: '서버에서 메세지 올거임', //수정
        });
      }
    } catch (error) {
      console.log(error);
      messageApi.open({
        type: 'error',
        content: '요청 실패', //수정
      });
    } finally {
      setIsApproving(false);
    }
  };

  const columns: ColumnsType<VacationRequestType> = [
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
                onClick={() => handleRequest(id, 'APPROVE')}
                disabled={isAppoving}
              >
                승인
              </Button>
              <Button
                type="primary"
                size="small"
                danger
                disabled={isAppoving}
                onClick={() => handleRequest(id, 'REJECT')}
              >
                거절
              </Button>
            </>
          ) : (
            <Button
              size="small"
              style={{ marginRight: 50 }}
              disabled={isAppoving}
              danger
              onClick={() => handleRequest(id, 'PENDING')}
            >
              취소
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={vacationRequests}
        loading={isvacationRequestsLoading}
      />
    </>
  );
}
