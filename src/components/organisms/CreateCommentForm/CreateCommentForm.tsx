import React from 'react';
import { AxiosError } from 'axios';
import { Button, Form, Input, notification } from 'antd';
import { useFormik } from 'formik';
import { createCommentSchema } from 'components/organisms/CreateCommentForm/createCommentSchema';
import UserAvatar from 'components/molecules/UserAvatar/UserAvatar';
import { useGetMeQuery } from '../../../domain/user/userApi';
import './index.scss';
import { useCreateCommentMutation } from '../../../domain/comment/commentsApi';

const CreateCommentForm: React.FC = () => {
  const { data: me } = useGetMeQuery();
  const [api, contextHolder] = notification.useNotification();
  const [createComment, createCommentStatus] = useCreateCommentMutation();
  const openNotification = (e: AxiosError) => {
    api.error({
      message: 'Ошибка создания комментария',
      description: e.message,
    });
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema: createCommentSchema,
    onSubmit: async (values, formikHelpers) => {
      try {
        await createComment(values).unwrap();
      } catch (e) {
        console.error(e);
        openNotification(e);
      } finally {
        formikHelpers.resetForm();
      }
    },
  });

  const onSubmitForm = () => formik.handleSubmit();
  const onResetForm = () => formik.resetForm();

  return (
    <div className="create_comment_wrapper">
      <Form>
        <Form.Item help={formik.touched && formik.errors.text} style={{ marginBottom: 10 }}>
          <Input
            name="text"
            value={formik.values.text}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="underlined"
            prefix={<UserAvatar avatarPath={me?.avatar} title={me?.name} />}
            placeholder="Напишите комментарий"
            onPressEnter={onSubmitForm}
          />
        </Form.Item>
        <div className="create_comment_wrapper__btns">
          <Button onClick={onResetForm}>Отмена</Button>
          <Button
            disabled={!formik.dirty || !!formik.errors.text || createCommentStatus.isLoading}
            type="primary"
            onClick={onSubmitForm}
          >
            Добавить
          </Button>
        </div>
      </Form>
      {contextHolder}
    </div>
  );
};

export default React.memo(CreateCommentForm);
