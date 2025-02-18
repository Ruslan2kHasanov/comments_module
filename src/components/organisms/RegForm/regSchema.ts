import * as yup from 'yup';

export const regSchema = yup.object().shape({
  password: yup
    .string()
    .required('Поле обязательно для ввода')
    .trim()
    .min(8, 'Пароль должен быть не менее 8 символов')
    .matches(/[A-Za-zА-Яа-я]/, 'Пароль должен содержать буквы')
    .matches(/[0-9]/, 'Пароль должен содержать цифры')
    .matches(/[!@#$%^&*(),.?":{}|<>_\-+=]/, 'Пароль должен содержать спец символ'),
  name: yup.string().required('Поле обязательно для ввода').trim(),
  re_password: yup
    .string()
    .required('Поле обязательно для ввода')
    .oneOf([yup.ref('password'), null], 'Пароли не совпадают')
    .trim(),
  email: yup.string().email('E-mail введен не правильно').required('Поле обязательно для ввода').trim(),
});
