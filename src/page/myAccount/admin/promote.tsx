import { POSITIONS } from '@/data/constants';
import { DUMMY_WORKERS } from '@/data/dummyData';
import { Avatar, Badge, Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import PromotionModal from './promotionModal';
import { useState } from 'react';

interface DataType {
  id: number;
  key: number;
  profileThumbUrl: string;
  userName: string;
  position: 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4';
  createAt: string;
}

export default function Promote() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<{
    userName: string;
    id: number;
    position: string;
  }>();

  const columns: ColumnsType<DataType> = [
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
        <Button
          onClick={() => {
            setIsModalOpen(true);
            setSelectedWorker({ userName, position, id });
          }}
        >
          직책 변경
        </Button>
      ),
      align: 'center',
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={DUMMY_WORKERS} />
      <PromotionModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        selectedWorker={selectedWorker}
      />
    </>
  );
}
