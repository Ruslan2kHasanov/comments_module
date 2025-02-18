import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import { authSchema } from 'components/organisms/AuthForm/authSchema';
import { useAuthMutation } from '../../../domain/user/userApi';
import './index.scss';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';

const AuthForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [auth, createCommentStatus] = useAuthMutation();
  const navigate = useNavigate();

  const openNotification = () => {
    api.error({
      message: 'Неверный логин или пароль',
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: authSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await auth(values).unwrap();
        navigate(APP_ROUTES.MAIN);
      } catch (e) {
        console.error(e);
        openNotification();
      } finally {
        formikHelpers.resetForm();
      }
    },
  });

  const onSubmitForm = () => formik.handleSubmit();

  return (
    <div className="auth_form_wrapper">
      <Form>
        <Form.Item help={formik.touched.email && formik.errors.email}>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Введите e-mail"
          />
        </Form.Item>
        <Form.Item help={formik.touched.password && formik.errors.password}>
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Введите пароль"
          />
        </Form.Item>
        <Button disabled={!formik.dirty || createCommentStatus.isLoading} type="primary" onClick={onSubmitForm}>
          Войти
        </Button>
      </Form>
      {contextHolder}
    </div>
  );
};

export default AuthForm;
