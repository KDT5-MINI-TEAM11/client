import { Layout, Menu, MenuProps } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { MYACCOUNT_NAV_ITEMS } from '@/data/constants';
import { useState } from 'react';

const { Content, Sider } = Layout;

export default function MyAccountLayout() {
  const { pathname } = useLocation();
  const [selectedMenuKey, setSelectedMenuKey] = useState(() => pathname);

  const navigate = useNavigate();

  // 현재 접속중인 url의 뒷부분을 가져옴

  const items: MenuProps['items'] = MYACCOUNT_NAV_ITEMS.map((item) => ({
    key: item.href,
    label: item.label,
    onClick: () => {
      navigate(item.href);
      setSelectedMenuKey(item.href);
    },
  }));

  return (
    <Layout>
      <Sider
        width={200}
        style={{ minHeight: 'calc(100vh - 64px) ', background: 'white' }}
      >
        <Menu
          mode="inline"
          style={{ height: '100%', borderRight: 0 }}
          items={items}
          selectedKeys={[pathname === selectedMenuKey ? selectedMenuKey : '']}
        />
      </Sider>
      <Layout style={{ padding: 20 }}>
        <Content
          style={{
            padding: 24,
            background: 'white',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
