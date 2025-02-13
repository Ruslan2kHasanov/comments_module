import { createBrowserRouter, Navigate } from 'react-router-dom';
import Layout from 'components/organisms/Layout/Layout';
import { APP_ROUTES } from 'utils/consts/appRoutes';
import { PROJECT_ROOT_URL } from './utils/consts/appConsts';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to={APP_ROUTES.MAIN} />,
      },
      {
        path: APP_ROUTES.MAIN,
        element: 'main-page',
      },
    ],
  },
  {
    path: '*',
    element: '404 NOT FOUND',
  },
];

export const routes = createBrowserRouter(routesConfig, {
  basename: PROJECT_ROOT_URL ?? '/',
});
