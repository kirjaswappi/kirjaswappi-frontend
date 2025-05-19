export interface INewPassForm {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IGetOTPByEmailProps {
  methods: unknown;
}

export interface INewPasswordProps {
  methods: Record<string, unknown>;
  updateValues?: (password: string, confirmPassword: string) => void;
}
export interface OTPSchemaType {
  otp: string;
}
