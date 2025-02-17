import React from 'react';
import { Button, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import { changeUserSchema } from 'components/organisms/ChangeUserForm/changeUserSchema';
import { useGetMeQuery, useUpdateUserMutation } from '../../../domain/user/userApi';

const ChangeUserForm = () => {
  const [api, contextHolder] = notification.useNotification();
  const { data: me } = useGetMeQuery();
  const [updateUser, updateUserStatus] = useUpdateUserMutation();
  const openNotification = () => {
    api.error({
      message: 'Не удалось обновить данные',
    });
  };

  const formik = useFormik({
    initialValues: {
      name: me?.name,
      email: me?.email,
      id: me?.id,
    },
    validationSchema: changeUserSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await updateUser(values).unwrap();
      } catch (e) {
        console.error(e);
        openNotification();
      } finally {
        formikHelpers.resetForm();
      }
    },
    enableReinitialize: true,
  });

  const onSubmitForm = () => formik.handleSubmit();

  return (
    <div className="profile_form">
      <Form>
        <Form.Item>
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            disabled
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
        <Button disabled={!formik.dirty || updateUserStatus.isLoading} type="primary" onClick={onSubmitForm}>
          Изменить
        </Button>
      </Form>
      {contextHolder}
    </div>
  );
};

export default ChangeUserForm;
