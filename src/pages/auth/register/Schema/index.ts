import * as Yup from "yup";
import { MIN_PASSWORD, OTP_LENGTH } from "../../../../utility/constant";

export const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Please enter first name."),
  lastName: Yup.string().required("Please enter last name."),
  email: Yup.string()
    .email("Please enter a valid email.")
    .required("Please enter email."),
  password: Yup.string()
    .required("Please enter password.")
    .min(MIN_PASSWORD, `Password must be at least ${MIN_PASSWORD} characters long`),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export const otpSchema = Yup.object().shape({
    otp: Yup
      .string()
      .required("OTP is required")
      .length(OTP_LENGTH, `OTP must be ${OTP_LENGTH} digits`),
  });