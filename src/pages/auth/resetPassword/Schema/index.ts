import * as yup from "yup";

export const emailSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Please enter email")
});

export const otpSchema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be exactly 6 digits")
});

export const passwordSchema = yup.object({
  password: yup
    .string()
    .required("Please enter Password")
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: yup
    .string()
    .required("Please enter Confirm Password")
    .oneOf([yup.ref("password")], "Password and Confirm Password do not match")
});
