
import * as yup from 'yup';
import { MIN_PASSWORD } from '../../../../utility/constant';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Please enter email.')
    .email('Please Enter your valid email'),
  password: yup
    .string()
    .required('Please enter Password.')
    .min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters long`),
});