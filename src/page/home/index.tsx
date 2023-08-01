import { AccessTokenAtom, isSignedinSelector } from '@/recoil/AccessTokkenAtom';
import { theme } from 'antd';
import { useRecoilValue } from 'recoil';
import Signin from '../../components/Signin';
import useRefreshToken from '@/hooks/useRefreshToken';

export default function Home() {
  const {
    token: { colorPrimary, colorPrimaryBg, colorSuccess },
  } = theme.useToken();

  const accessToken = useRecoilValue(AccessTokenAtom);

  const isSignedin = useRecoilValue(isSignedinSelector);

  const { refreshAccessToken } = useRefreshToken();

  return (
    <>
      <Signin />
      <main
        style={{ filter: isSignedin ? '' : 'blur(4px)', userSelect: 'none' }}
      >
        홈🏠🏠🏠🏠 <span style={{ color: colorPrimary }}>사용하고 싶으색</span>
        <span style={{ backgroundColor: colorPrimaryBg }}>원하는 색을</span>
        <div>{accessToken?.slice(200)}</div>
        <span style={{ color: colorSuccess }}>
          theme에서 가져와서 사용theme에서 가져와서 사용theme에서 가져와서
          사용theme에서 가져와서 사용
        </span>
        <button onClick={refreshAccessToken}>리프레시</button>
      </main>
    </>
  );
}
