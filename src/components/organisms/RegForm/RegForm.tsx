import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { regSchema } from 'components/organisms/RegForm/regSchema';
import { useCreateUserMutation } from '../../../domain/user/userApi';
import './index.scss';
import { APP_ROUTES } from '../../../utils/consts/appRoutes';

const RegForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const [reg, regStatus] = useCreateUserMutation();
  const navigate = useNavigate();
  const openNotification = () => {
    api.error({
      message: 'Не удалось зарегистрироваться',
    });
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      password: '',
      re_password: '',
    },
    validationSchema: regSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await reg(values).unwrap();
        navigate(`/${APP_ROUTES.AUTH}`);
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
    <div className="reg_form_wrapper">
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
        <Form.Item help={formik.touched.name && formik.errors.name}>
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Введите имя"
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
        <Form.Item help={formik.touched.re_password && formik.errors.re_password}>
          <Input.Password
            name="re_password"
            value={formik.values.re_password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            placeholder="Подтвердите пароль"
          />
        </Form.Item>
        <Button disabled={!formik.dirty || regStatus.isLoading} type="primary" onClick={onSubmitForm}>
          Регистрация
        </Button>
      </Form>
      {contextHolder}
    </div>
  );
};

export default RegForm;
