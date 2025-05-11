export interface INewPassForm {
    email: string
    password: string
    confirmPassword: string
  }
  
  export interface IGetOTPByEmailProps {
    register: any
    errors: any
  }
  
  export interface INewPasswordProps {
    register: any
    errors: any
    updateValues?: (password: string, confirmPassword: string) => void
  }
  export interface OTPSchemaType {
    otp: string;
  }
  