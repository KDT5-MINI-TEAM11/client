import { REQUEST_STATE } from '@/data/constants';
import { Tag } from 'antd';

export default function RequesTag({
  state,
}: {
  state: 'APPROVE' | 'REJECT' | 'PENDING';
}) {
  return (
    <Tag
      color={REQUEST_STATE[state]?.color}
      style={{ width: 50, textAlign: 'center' }}
    >
      {REQUEST_STATE[state]?.label}
    </Tag>
  );
}
