import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email').required('Please enter email.'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters long')
    .required('Please enter password.'),
});