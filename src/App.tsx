import { ConfigProvider } from 'antd';
import { Route, Routes } from 'react-router-dom';
import NotFound from '@/page/notFound';
import Home from '@/page/home';
import koKR from 'antd/locale/ko_KR';
import MyAccount from '@/page/myAccount';
import MyLayout from '@/components/MyLayout';
import Vacation from '@/page/myAccount/vacation';
import MyAccountLayout from '@/page/myAccount/myAccoutLayout';
import ProtectedRoute from '@/components/ProtectedRoute';
import Signup from '@/page/signup';
import ProtectedManagerRoute from '@/components/ProtectedManagerRoute';
import Approve from '@/page/myAccount/admin/approve';
import Promote from './page/myAccount/admin/promote';
import AdminLayout from './page/myAccount/admin/adminLayout';

export default function App() {
  const theme = {
    token: {
      colorPrimary: '#03bafc',
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
              <Route element={<ProtectedManagerRoute />}>
                <Route element={<AdminLayout />}>
                  <Route path="myaccount/approve" element={<Approve />} />
                  <Route path="myaccount/promote" element={<Promote />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ConfigProvider>
  );
}
