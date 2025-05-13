export interface IRegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
export interface OTPSchemaType {
  otp: string;
}

export interface OTPFormValues {
  email: string;
  otp: string;
}
