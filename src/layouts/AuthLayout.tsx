import { Outlet, useLocation } from 'react-router-dom';
import routes from '../routes';
import { useEffect } from 'react';

const AuthLayout: React.FC = () => {
  const location = useLocation();

  // Find the current route in the routes array
  const currentRoute = routes
    .flatMap((route) => route.children || [])
    .find((route) => route.path === location.pathname.replace('/', ''));

  const title = 'Authentication | ' + currentRoute?.handle?.title;

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
