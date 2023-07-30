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
      const data = await response.json();
      messageApi.open({
        type: 'success',
        content: data.response,
      });
    } catch (error) {
      console.log(error);
    } finally {
      // 성공하든 실패하든 recoil상태에서 null로
      // 성공하든 실패하든 이면 굳이 통신을 할 이유가 있음? (토큰도 안보냄)
      // 쿠키 삭제 필요성?, 함수들 모듈화 하는게 맞는건지? 재사용 여부를 현재 어떻게 판단함?
      setAccessToken(null);
      setIsSigningout(false);
      deleteAccessTokenFromCookie();
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
            <>
              <Link to="/signin">로그인</Link>
              <Link to="signup">회원가입</Link>
            </>
          )}
        </Space>
      </Header>
    </>
  );
}
