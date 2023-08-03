import { POSITIONS } from '@/data/constants';
import { Avatar, Badge, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PromotionModal from './promotionModal';
import { useEffect, useState } from 'react';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { useRecoilValue } from 'recoil';
import useRefreshToken from '@/hooks/useRefreshToken';
import { getWorkers } from '@/api/admin';

interface WorkerType {
  id: number;
  key: number;
  profileThumbUrl: string;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4' | 'MANAGER';
  createAt: string;
}

export default function Promote() {
  const accessToken = useRecoilValue(AccessTokenAtom);
  const { refreshAccessToken } = useRefreshToken();
  const [isWorkerListLoading, setIsWorkerListLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [workers, setWorkers] = useState<WorkerType[]>([]);
  const [selectedWorker, setSelectedWorker] = useState<{
    userName: string;
    id: number;
    position: string;
  }>();

  useEffect(() => {
    setIsWorkerListLoading(true);
    const getData = async () => {
      if (!accessToken) {
        return;
      }
      await refreshAccessToken();
      try {
        const response = await getWorkers(accessToken);
        if (response.status === 200) {
          const workersData = response.data.response as WorkerType[];
          // 성공했을때
          setWorkers(
            workersData.map((el) => {
              return { ...el, key: el.id };
            }),
          );
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '사원데이터를 불러오지 못했습니다.',
        );
      } finally {
        setIsWorkerListLoading(false);
      }
    };
    getData();
  }, [accessToken, selectedWorker]);

  const columns: ColumnsType<WorkerType> = [
    {
      title: '사진',
      dataIndex: 'profileThumbUrl',
      key: 'profileThumbUrl',
      render: (_, { profileThumbUrl }) => <Avatar src={profileThumbUrl} />,
      align: 'center',
    },
    {
      title: '사원',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
    },
    {
      title: '직책',
      dataIndex: 'position',
      key: 'position',
      render: (_, { position }) => (
        <Badge color={POSITIONS[position]?.color} count={position} />
      ),
      align: 'center',
    },

    {
      title: '입사일',
      key: 'createAt',
      dataIndex: 'createAt',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, { userName, position, id }) => (
        <>
          {position === 'MANAGER' ? (
            <></>
          ) : (
            <Button
              onClick={() => {
                setIsModalOpen(true);
                setSelectedWorker({ userName, position, id });
              }}
            >
              직책 변경
            </Button>
          )}
        </>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={workers}
        loading={isWorkerListLoading}
      />
      <PromotionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedWorker={selectedWorker}
        setSelectedWorker={setSelectedWorker}
      />
    </>
  );
}