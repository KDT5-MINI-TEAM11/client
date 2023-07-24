import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <>
      <h1>레이아웃</h1>
      <Outlet />
    </>
  );
}
