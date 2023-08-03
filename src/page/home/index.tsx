import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Calendar, Layout, Modal } from 'antd';
import { useRecoilValue } from 'recoil';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import Signin from '@/page/home/signin';

export default function Home() {
  const accessToken = useRecoilValue(AccessTokenAtom);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!accessToken);

  // 로그아웃을 하면 isModalOpen이 !accessToken의 상태를 바로 반영하지 않음
  // 따라서 useEffect로 반영이 되도록함
  useEffect(() => {
    setIsModalOpen(!accessToken);
  }, [accessToken]);

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
          filter: accessToken ? '' : 'blur(5px)',
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
            <Calendar />
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
