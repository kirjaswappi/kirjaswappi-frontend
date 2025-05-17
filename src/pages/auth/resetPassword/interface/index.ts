export interface INewPassForm {
    email: string
    password: string
    confirmPassword: string
  }
  
  export interface IGetOTPByEmailProps {
    methods: any
  }
  
  export interface INewPasswordProps {
    methods: any
    updateValues?: (password: string, confirmPassword: string) => void
  }
  export interface OTPSchemaType {
    otp: string;
  }
  