import { getUserHeader } from '@/api/getUserHeader';
import { signout } from '@/api/signout';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import deleteAccessTokenFromCookie from '@/utils/deleteAccessTokenFromCookie';
import { Button, Space, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import UserInfo from '@/components/UserInfo';
import { IuserHeaderInfo } from '@/types/IuserHeaderInfo';
import { PoweroffOutlined } from '@ant-design/icons';

export default function MyHeader() {
  const {
    token: { colorPrimaryBg },
  } = theme.useToken();

  const [messageApi, contextHolder] = message.useMessage();

  const [isSigningout, setIsSigningout] = useState(false);

  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  const [userHeaderInfo, setUserHeaderInfo] = useState<IuserHeaderInfo>({
    userName: '',
    profileThumbNail: '',
    position: '',
    usedVacation: '',
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getUserHeader(accessToken);
        if (response.status === 200) {
          const userData = response.data.response;
          setUserHeaderInfo({
            profileThumbNail: userData.profileThumbNail,
            usedVacation: userData.usedVacation.toString(),
            userName: userData.userName,
            position: userData.position,
          });
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '사용자 정보를 불러오지 못했습니다.',
        );
      }
    };
    getData();
  }, [accessToken]);

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
      location.reload();
      setAccessToken(null);
      setIsSigningout(false);
      deleteAccessTokenFromCookie();
    }
  };

  return (
    <>
      {contextHolder}
      <Header style={{ backgroundColor: colorPrimaryBg }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/">홈</Link>
          {accessToken ? (
            <Space size="large">
              <UserInfo userHeaderInfo={userHeaderInfo} />
              <Button
                shape="circle"
                onClick={handleSignout}
                loading={isSigningout}
                disabled={isSigningout}
              >
                <PoweroffOutlined />
              </Button>
            </Space>
          ) : (
            <></>
          )}
        </div>
      </Header>
    </>
  );
}
