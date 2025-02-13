import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from 'components/organisms/Header/Header';
import Main from 'components/organisms/Main/Main';

const Layout = () => (
  <div>
    <Header />
    <Main>
      <Outlet />
    </Main>
  </div>
);

export default Layout;
