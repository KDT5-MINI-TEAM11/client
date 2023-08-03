import { changePosition } from '@/api/admin';
import { POSITIONS } from '@/data/constants';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Badge, Modal, Select, Space, message } from 'antd';
import { Typography } from 'antd';
import { RefObject, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

const { Title } = Typography;

interface PromotionModalProps {
  isModalOpen: boolean;
  selectedWorker?: { userName: string; id: number; position: string };
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWorker: React.Dispatch<
    React.SetStateAction<
      | {
          userName: string;
          id: number;
          position: string;
        }
      | undefined
    >
  >;
}

export default function PromotionModal({
  isModalOpen,
  selectedWorker,
  setIsModalOpen,
  setSelectedWorker,
}: PromotionModalProps) {
  const [messageApi, contextHolder] = message.useMessage();

  const accessToken = useRecoilValue(AccessTokenAtom);
  const [selectedPosition, setSelectedPosition] = useState<
    '변경' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4'
  >('변경');

  const handleChangePosition = async () => {
    if (selectedPosition === '변경') {
      return;
    }
    try {
      const response = await changePosition(
        accessToken,
        selectedWorker?.id as number,
        selectedPosition as 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4',
      );
      if (response.status === 200) {
        messageApi.open({
          type: 'success',
          content: '서버에서 메세지 올거임', //수정
        });
        setSelectedWorker(
          (prev) =>
            ({
              ...prev,
              position: selectedPosition,
            } as { userName: string; id: number; position: string }),
        );
        setSelectedPosition('변경');
        return;
      }
    } catch (error) {
      messageApi.open({
        type: 'error',
        content: '서버에서 메세지 올거임??', //수정
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={<Title level={4}>{selectedWorker?.userName} 직책 변경</Title>}
        centered
        closeIcon={false}
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          handleChangePosition();
        }}
        onCancel={() => setIsModalOpen(false)}
      >
        <Space
          size="large"
          style={{ display: 'flex', padding: '20px 0', alignItems: 'center' }}
        >
          <Badge
            color={POSITIONS[selectedWorker?.position as string]?.color}
            count={selectedWorker?.position}
          />
          <Title style={{ margin: 0 }} level={5}>
            에서
          </Title>
          <Select
            value={selectedPosition}
            style={{ width: 120 }}
            onChange={(
              value: '변경' | 'LEVEL1' | 'LEVEL2' | 'LEVEL3' | 'LEVEL4',
            ) => setSelectedPosition(value)}
            options={[
              {
                value: 'LEVEL1',
                label: (
                  <Badge color={POSITIONS['LEVEL1'].color} count="LEVEL1" />
                ),
                disabled: selectedWorker?.position === 'LEVEL1',
              },
              {
                value: 'LEVEL2',
                label: (
                  <Badge color={POSITIONS['LEVEL2'].color} count="LEVEL2" />
                ),
                disabled: selectedWorker?.position === 'LEVEL2',
              },
              {
                value: 'LEVEL3',
                label: (
                  <Badge color={POSITIONS['LEVEL3'].color} count="LEVEL3" />
                ),
                disabled: selectedWorker?.position === 'LEVEL3',
              },
              {
                value: 'LEVEL4',
                label: (
                  <Badge color={POSITIONS['LEVEL4'].color} count="LEVEL4" />
                ),
                disabled: selectedWorker?.position === 'LEVEL4',
              },
            ]}
          />
          <Title style={{ margin: 0 }} level={5}>
            으로 변경
          </Title>
        </Space>
      </Modal>
    </>
  );
}
