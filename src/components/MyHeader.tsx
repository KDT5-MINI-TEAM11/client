import { NAV_ITEMS } from '@/data/constants';
import { Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { Link } from 'react-router-dom';

export default function MyHeader() {
  return (
    <Header style={{ backgroundColor: 'palegreen' }}>
      <Space size="large">
        {NAV_ITEMS.map((item) => (
          <Link to={item.href}>{item.label}</Link>
        ))}
      </Space>
    </Header>
  );
}
