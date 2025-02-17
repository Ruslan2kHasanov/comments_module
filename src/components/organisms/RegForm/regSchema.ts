import * as yup from 'yup';

export const regSchema = yup.object().shape({
  password: yup.string().required('Поле обязательно для ввода').trim(),
  name: yup.string().required('Поле обязательно для ввода').trim(),
  re_password: yup
    .string()
    .required('Поле обязательно для ввода')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .trim(),
  email: yup.string().email('E-mail введен не правильно').required('Поле обязательно для ввода').trim(),
});
