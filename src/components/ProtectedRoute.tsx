import { isSignedinSelector } from '@/recoil/AccessTokkenAtom';
import { Navigate, Outlet } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

export default function ProtectedRoute() {
  const isSignedin = useRecoilValue(isSignedinSelector);

  if (isSignedin) {
    return <Outlet />;
  }
  return <Navigate to={'/'} replace />;
}
