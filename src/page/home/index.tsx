import { isSignedinSelector } from '@/recoil/AccessTokkenAtom';
import { Layout, Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import Signin from '../../components/Signin';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useState } from 'react';
import Calendar from './calendar';

export default function Home() {
  const isSignedin = useRecoilValue(isSignedinSelector);
  const [isModalOpen, setIsModalOpen] = useState(!isSignedin);

  return (
    <>
      <Modal
        title="로그인"
        centered
        closeIcon={false}
        footer={null}
        open={isModalOpen}
      >
        <Signin setIsModalOpen={setIsModalOpen} />
      </Modal>
      <Layout
        style={{
          filter: isSignedin ? '' : 'blur(5px)',
          userSelect: 'none',
          height: 'calc(100vh - 60px)',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Sider width={300} style={{ background: 'white' }}></Sider>
        <Layout style={{ padding: '0 15px', flex: 1, height: '100%' }}>
          <Content
            style={{
              padding: '0 10px',
              background: 'white',
              height: '100%',
              overflow: 'auto',
            }}
          >
            <Calendar isSignedin={isSignedin} />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
