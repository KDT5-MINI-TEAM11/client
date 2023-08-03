import React, { useState } from 'react';
import { ArrowUpOutlined, CheckOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';

const App: React.FC = () => {
  const navigate = useNavigate();

  const [current, setCurrent] = useState('approve');

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
  };

  const items: MenuProps['items'] = [
    {
      label: '연차 / 당직 승인',
      key: 'approve',
      icon: <CheckOutlined />,
      onClick: () => navigate('/myaccount/approve'),
    },
    {
      label: '사원 직책 변경',
      key: 'promote',
      icon: <ArrowUpOutlined />,
      onClick: () => navigate('/myaccount/promote'),
    },
  ];

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
      <Outlet />
    </>
  );
};

export default App;
