import React from 'react';
import AuthsPageLayout from 'components/organisms/AuthsPageLayout/AuthsPageLayout';
import AuthForm from 'components/organisms/AuthForm/AuthForm';
import { Link } from 'react-router-dom';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';

const AuthPage = () => {
  console.log('AuthPage');
  return (
    <AuthsPageLayout>
      <h1>Вход в аккаунт</h1>
      <AuthForm />
      <Link to={APP_ROUTES.REG}>Нет аккаунта?</Link>
    </AuthsPageLayout>
  );
};

export default AuthPage;
