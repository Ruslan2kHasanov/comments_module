import { createBrowserRouter } from 'react-router-dom';
import Layout from 'components/organisms/Layout/Layout';
import MainPage from 'components/pages/MainPage/MainPage';
import { PROJECT_ROOT_URL } from './utils/consts/appConsts';

export const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
