import * as yup from "yup";
import { MIN_PASSWORD, OTP_LENGTH } from "../../../../utility/constant";

const emailStep = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Enter your email"),
});

const otpStep = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .length(OTP_LENGTH, `OTP must be exactly ${OTP_LENGTH} digits`),
});

const passwordStep = yup.object({
  password: yup
    .string()
    .required("Please enter Password")
    .min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters`),
  confirmPassword: yup
    .string()
    .required("Please enter Confirm Password")
    .oneOf([yup.ref("password")], "Password and Confirm Password do not match"),
});

export const validationSchemas = [emailStep, otpStep, passwordStep];