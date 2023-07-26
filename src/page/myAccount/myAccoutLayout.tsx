import React from 'react';
import {
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content, Sider } = Layout;

const items: MenuProps['items'] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(1).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `내계정${subKey}`,
      };
    }),
  };
});

export default function MyAccountLayout() {
  return (
    <Layout>
      <Layout>
        <Sider width={200} style={{ height: '100vh', background: 'white' }}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            items={items}
          />
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>홈</Breadcrumb.Item>
            <Breadcrumb.Item>내계정</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: 'white',
            }}
          >
            Content
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}
