import DashboardLayout from '../component/layouts/index';
import NotFoundView from '../pages/notfound/index';
import {Navigate} from 'react-router-dom';
import Dashboard from '../pages/dashboard';

const routes = (isAUTH: boolean) => [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      {path: 'dashboard', element: <Dashboard />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {
    path: '/',
    element: <Navigate to="/app/dashboard" />,
    children: [
      {path: '/', element: <Navigate to="/app/dashboard" />},
      {path: '*', element: <Navigate to="/404" />},
    ],
  },
  {path: '404', element: <NotFoundView />},
];
export default routes;
