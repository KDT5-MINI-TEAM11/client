import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/page/notFound';
import Home from '@/page/home';
import koKR from 'antd/locale/ko_KR';
import MyAccount from '@/page/myAccount';
import MyLayout from '@/components/MyLayout';
import Vacation from '@/page/myAccount/vacation';
import MyAccountLayout from '@/page/myAccount/myAccoutLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Signup from './page/signup';

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
          <Route element={<ProtectedRoute />}>
            <Route element={<MyAccountLayout />}>
              <Route path="/myaccount" element={<MyAccount />} />
              <Route path="myaccount/vacation" element={<Vacation />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
