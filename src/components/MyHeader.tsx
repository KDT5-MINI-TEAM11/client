import { signout } from '@/api/signout';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import deleteAccessTokenFromCookie from '@/utils/deleteAccessTokenFromCookie';
import { Button, Space, message } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export default function MyHeader() {
  const [messageApi, contextHolder] = message.useMessage();

  const [isSigningout, setIsSigningout] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  const handleSignout = async () => {
    setIsSigningout(true);
    try {
      const response = await signout();
      messageApi.open({
        type: 'success',
        content: response.data.response,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setAccessToken(null);
      setIsSigningout(false);
      deleteAccessTokenFromCookie();
      // 새로고침 필요함
    }
  };
  return (
    <>
      {contextHolder}
      <Header style={{ backgroundColor: 'palegreen' }}>
        <Space size="large">
          <Link to="/">홈</Link>
          {accessToken ? (
            <>
              <Link to="/myaccount">내계정</Link>
              <Button
                onClick={handleSignout}
                loading={isSigningout}
                disabled={isSigningout}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <></>
          )}
        </Space>
      </Header>
    </>
  );
}
