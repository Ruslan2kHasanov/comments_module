import * as yup from 'yup';
import { MAX_COMMENT_LEN } from '../../../utils/consts/appConsts';

export const createCommentSchema = yup.object().shape({
  text: yup.string().required('').max(MAX_COMMENT_LEN, `Максимальное кол-во символов ${MAX_COMMENT_LEN}`).trim(),
});
