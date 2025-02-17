import React from 'react';
import { Link } from 'react-router-dom';
import AuthsPageLayout from 'components/organisms/AuthsPageLayout/AuthsPageLayout';
import regLogo from 'assets/reg_img.svg';
import RegForm from 'components/organisms/RegForm/RegForm';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';

const RegPage = () => (
  <AuthsPageLayout img={regLogo}>
    <h1>Регистрация</h1>
    <RegForm />
    <Link to={`/${APP_ROUTES.AUTH}`}>Уже есть аккаунт?</Link>
  </AuthsPageLayout>
);

export default RegPage;
