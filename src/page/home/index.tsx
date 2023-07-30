import { AccessTokenAtom } from '@/recoil/AccessTokkenAtom';
import { theme } from 'antd';
import { useRecoilValue } from 'recoil';

export default function Home() {
  const {
    token: { colorPrimary, colorPrimaryBg, colorSuccess },
  } = theme.useToken();

  const accessToken = useRecoilValue(AccessTokenAtom);

  return (
    <div>
      홈🏠🏠🏠🏠 <span style={{ color: colorPrimary }}>사용하고 싶으색</span>{' '}
      <span style={{ backgroundColor: colorPrimaryBg }}>원하는 색을</span>{' '}
      <div>{accessToken}</div>
      <span style={{ color: colorSuccess }}>theme에서 가져와서 사용</span>
    </div>
  );
}
