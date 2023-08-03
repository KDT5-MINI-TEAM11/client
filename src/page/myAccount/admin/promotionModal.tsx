import { POSITIONS } from '@/data/constants';
import { Badge, Modal, Select, Space } from 'antd';
import { Typography } from 'antd';

const { Title } = Typography;

interface PromotionModalProps {
  isModalOpen: boolean;
  selectedWorker?: { userName: string; id: number; position: string };
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PromotionModal({
  isModalOpen,
  selectedWorker,
  setIsModalOpen,
}: PromotionModalProps) {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <Modal
      title={<Title level={4}>{selectedWorker?.userName} 직책 변경</Title>}
      centered
      closeIcon={false}
      open={isModalOpen}
      onOk={() => setIsModalOpen(false)}
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
          defaultValue="변경"
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            {
              value: 'LEVEL1',
              label: <Badge color={POSITIONS['LEVEL1'].color} count="LEVEL1" />,
              disabled: selectedWorker?.position === 'LEVEL1',
            },
            {
              value: 'LEVEL2',
              label: <Badge color={POSITIONS['LEVEL2'].color} count="LEVEL2" />,
              disabled: selectedWorker?.position === 'LEVEL2',
            },
            {
              value: 'LEVEL3',
              label: <Badge color={POSITIONS['LEVEL3'].color} count="LEVEL3" />,
              disabled: selectedWorker?.position === 'LEVEL3',
            },
            {
              value: 'LEVEL4',
              label: <Badge color={POSITIONS['LEVEL4'].color} count="LEVEL4" />,
              disabled: selectedWorker?.position === 'LEVEL4',
            },
          ]}
        />
        <Title style={{ margin: 0 }} level={5}>
          으로 변경
        </Title>
      </Space>
    </Modal>
  );
}
