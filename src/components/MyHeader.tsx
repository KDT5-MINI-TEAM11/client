import { getUserHeader } from '@/api/getUserHeader';
import { signout } from '@/api/signout';
import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { Button, Skeleton, Space, message, theme } from 'antd';
import { Header } from 'antd/es/layout/layout';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import UserInfo from '@/components/UserInfo';
import { IuserHeaderInfo } from '@/types/IuserHeaderInfo';
import useRefreshToken from '@/hooks/useRefreshToken';
import { deleteAccessTokenFromCookie } from '@/utils/cookies';
import { IsManagerAtom } from '@/recoil/IsManagerAtom';

export default function MyHeader() {
  const setIsManager = useSetRecoilState(IsManagerAtom);

  // access토큰의 만료시간이 5분 이내로 남았을 때 새로운 토큰을 발급하는 커스텀훅
  const { refreshAccessToken } = useRefreshToken();

  const {
    token: { colorPrimaryBg },
  } = theme.useToken();

  // antd message(화면 상단에 뜨는 메세지)기능
  const [messageApi, contextHolder] = message.useMessage();

  // 로그아웃 통신 로딩 ui
  const [isSigningout, setIsSigningout] = useState(false);

  // 리코일 전역 access토큰
  const [accessToken, setAccessToken] = useRecoilState(AccessTokenAtom);

  // 네브바에 표시될 정보들
  const [userHeaderInfo, setUserHeaderInfo] = useState<IuserHeaderInfo>({
    userName: '',
    profileThumbNail: '',
    position: '',
    usedVacation: '',
  });

  const [isMyHeaderLoading, setIsMyHeaderLoading] = useState(false);

  useEffect(() => {
    // 모든 통신에는 loading이 있다. 그러면 모든 loading에는 ui가 필요함?
    setIsMyHeaderLoading(true);
    const getData = async () => {
      try {
        // access토큰이 없으면(로그인 상태가 아니면) 통실 할 이유가 없음
        // refreshAccessToken에도 accessToken이 null인 경우 처리가 있음 그런데 이렇게 위에서 미리 하는게 좋은건가? 질문
        if (!accessToken) {
          return;
        }
        // access토큰 만료가 5분 미만으로 남으면 재발급함
        await refreshAccessToken();
        const response = await getUserHeader(accessToken);
        if (response.status === 200) {
          const userData = response.data.response;
          setUserHeaderInfo({
            profileThumbNail: userData.profileThumbNail,
            usedVacation: userData.usedVacation.toString(),
            userName: userData.userName,
            position: userData.position,
          });
          setIsManager(userData.position === 'MANAGER');
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        console.log(
          error.response.data.error.message ||
            '사용자 정보를 불러오지 못했습니다.',
        );
      } finally {
        setIsMyHeaderLoading(false);
      }
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const handleSignout = async () => {
    // 로그아웃하는 시간동안 ui를 위해
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
      // 화면 전환없이(login input 값들이 남아있는 상태)에서 로그아웃을 하고 다시 로그인을 하려고 하면 login input 값들이 남아있기 때문에 강제 새로고침
      // ref를 지정해서 값을 초기화 하는 방법도 있음
      location.reload();

      // recoil 초기화
      setAccessToken(null);

      // 로딩 ui종료
      setIsSigningout(false);

      // 쿠키에서 삭제
      deleteAccessTokenFromCookie();
    }
  };

  return (
    <>
      {contextHolder}
      <Header style={{ backgroundColor: colorPrimaryBg, height: 60 }}>
        <div
          style={{
            height: 60,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Link to="/" style={{ fontSize: 30 }}>
            🏠
          </Link>
          {accessToken ? (
            <Space size="large">
              {isMyHeaderLoading ? (
                <div
                  style={{
                    margin: 'auto',
                    height: 60,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                  }}
                >
                  <Skeleton.Avatar
                    active
                    size={32}
                    shape="circle"
                    style={{ display: 'block' }}
                  />
                  <Skeleton.Input
                    active
                    style={{ width: 200, display: 'block' }}
                  />
                </div>
              ) : (
                <UserInfo userHeaderInfo={userHeaderInfo} />
              )}

              <Button
                type="primary"
                danger
                onClick={handleSignout}
                loading={isSigningout}
                disabled={isSigningout}
              >
                로그아웃
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
