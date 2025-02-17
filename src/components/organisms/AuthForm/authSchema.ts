import * as yup from 'yup';

export const authSchema = yup.object().shape({
  password: yup.string().required('Поле обязательно для ввода').trim(),
  email: yup.string().email('E-mail введен не правильно').required('Поле обязательно для ввода').trim(),
});
