import * as yup from 'yup';

export const changeUserSchema = yup.object().shape({
  name: yup.string().required('Поле обязательно для ввода').trim(),
});
