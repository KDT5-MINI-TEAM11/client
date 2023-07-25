import { theme } from 'antd';

export default function Home() {
  const {
    token: { colorPrimary, colorPrimaryBg, colorSuccess },
  } = theme.useToken();

  return (
    <div>
      홈🏠🏠🏠🏠 <span style={{ color: colorPrimary }}>사용하고 싶으색</span>{' '}
      <span style={{ backgroundColor: colorPrimaryBg }}>원하는 색을</span>{' '}
      <span style={{ color: colorSuccess }}>theme에서 가져와서 사용</span>
    </div>
  );
}
