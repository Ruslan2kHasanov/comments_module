import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import { createCommentSchema } from 'components/organisms/CreateCommentForm/createCommentSchema';
import { useAuthMutation } from '../../../domain/user/userApi';
import './index.scss';

const AuthForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [auth, createCommentStatus] = useAuthMutation();
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
    validationSchema: createCommentSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await auth(values).unwrap();
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
        <Form.Item help={formik.touched && formik.errors.email}>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Введите e-mail"
            onPressEnter={onSubmitForm}
          />
        </Form.Item>
        <Form.Item help={formik.touched && formik.errors.password}>
          <Input.Password
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Введите пароль"
            onPressEnter={onSubmitForm}
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
