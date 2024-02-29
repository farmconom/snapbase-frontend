import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import AppLayout from '../layout/AppLayout';
import Loadable from '../component/@share/Loadable';
// import Unauthorized from '../page/unauthorize/Unauthorized';

const Home = Loadable(lazy(() => import('../page/home/Home')));
const VerifyEmailPage = Loadable(
  lazy(() => import('../page/auth/VerifyEmailPage'))
);

const Error404 = Loadable(lazy(() => import('../page/miscellaneous/Error404')));

const routes: RouteObject = {
  path: '/',
  children: [
    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          path: '/',
          element: <Home />,
        },
        {
          path: '/verifiedEmail',
          element: <VerifyEmailPage />,
        },
        // {
        //   path: '/unauthorized',
        //   element: <Unauthorized />,
        // },
      ],
    },
    {
      path: '*',
      element: <Error404 />,
    },
  ],
};

export default routes;
