import { createBrowserRouter } from 'react-router-dom';
import Layout from 'components/organisms/Layout/Layout';
import MainPage from 'components/pages/MainPage/MainPage';
import ProfilePage from 'components/pages/ProfilePage/ProfilePage';
import { lazy, Suspense } from 'react';
import PageLoader from 'components/atoms/PageLoader/PageLoader';
import { PROJECT_ROOT_URL } from './utils/consts/appConsts';
import { APP_ROUTES } from './utils/consts/appRoutes';

const AuthPage = lazy(() => import('./components/pages/AuthPage/AuthPage'));
const RegPage = lazy(() => import('./components/pages/RegPage/RegPage'));

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: APP_ROUTES.PROFILE,
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: APP_ROUTES.AUTH,
    element: (
      <Suspense fallback={<PageLoader />}>
        <AuthPage />
      </Suspense>
    ),
  },
  {
    path: APP_ROUTES.REG,
    element: (
      <Suspense fallback={<PageLoader />}>
        <RegPage />
      </Suspense>
    ),
  },
  {
    path: '*',
    element: '404 NOT FOUND',
  },
];

export const routes = createBrowserRouter(routesConfig, {
  basename: PROJECT_ROOT_URL ?? '/',
});
