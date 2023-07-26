import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/page/notFound';
import Home from '@/page/home';
import koKR from 'antd/locale/ko_KR';
import Signup from '@/page/signup';
import Singin from '@/page/signin';
import MyAccount from '@/page/myAccount';
import MyLayout from '@/components/MyLayout';

export default function App() {
  const theme = {
    token: {
      colorPrimary: '#ffc400',
    },
  };

  return (
    <ConfigProvider theme={theme} locale={koKR}>
      <Routes>
        <Route element={<MyLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Singin />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
