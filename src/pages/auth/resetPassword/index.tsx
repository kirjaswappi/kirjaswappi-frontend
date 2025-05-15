import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { OTP_LENGTH } from "../../../utility/constant";
import { ResetPasswordValidation } from "./Schema";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import {
  useLazySentOTPQuery,
  useLazyVerifyOTPQuery,
  useResetPasswordMutation,
} from "../../../redux/feature/auth/authApi";
import { setOtp } from "../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../redux/hooks";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import MessageToastify from "../../../components/shared/MessageToastify";
import GetOTPByEmail from "./_component/GetOTPByEmail";
import ConfirmOTP from "./_component/ConfirmOTP";
import { NewPassword } from "./_component/NewPassword";
import leftArrowIcon from "../../../assets/leftArrow.png";
import * as yup from "yup";

// INTERFACE FOR RESET PASSWORD FORM FIELDS
interface IResetPasswordForm {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

// FUNCTION TO GET ERROR MESSAGE FROM API RESPONSE
const getErrorMessage = (error: any, email?: string) => {
  const message =
    error?.data?.error?.message ||
    error?.data?.message ||
    error?.data ||
    error?.error ||
    "An error occurred";
  return message.includes("not exist")
    ? `User ${email} does not exist.`
    : message;
};

// MAIN COMPONENT FOR RESET PASSWORD PAGE
export default function ResetPassword() {
  // INITIALIZE DISPATCH AND NAVIGATE HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // INITIALIZE API HOOKS
  const [sentOTP] = useLazySentOTPQuery();
  const [verifyOTP] = useLazyVerifyOTPQuery();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  // GET STATE FROM REDUX STORE
  const { step } = useAppSelector((state) => state.step);
  const { otp, error } = useAppSelector((state) => state.auth);
  const {
    messageType,
    message: msg,
    isShow,
  } = useAppSelector((state) => state.notification);
  // LOCAL STATE FOR USER EMAIL AND RESET SUCCESS
  // const [userEmail, setUserEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // INITIALIZE REACT HOOK FORM WITH VALIDATION
  const methods = useForm<IResetPasswordForm>({
    resolver: yupResolver(
      ResetPasswordValidation[step] as yup.ObjectSchema<any>
    ),
    mode: "onSubmit",
    defaultValues: {
      email: "",
      otp: otp.join(""),
      password: "",
      confirmPassword: "",
    },
  });

  const { trigger, setValue } = methods;

  // UPDATE OTP FIELD WHEN OTP STATE CHANGES
  useEffect(() => setValue("otp", otp.join("")), [otp, setValue]);

  // HANDLE BACK BUTTON CLICK
  const handleBack = () =>
    step === 0 ? navigate(-1) : dispatch(setStep(step - 1));
  // HANDLE NEXT STEP
  const handleNext = async () =>
    (await trigger()) && dispatch(setStep(step + 1));
  // HANDLE OTP INPUT CHANGE
  const handleOTPChange = (value: string) => {
    dispatch(setOtp(value.split("")));
    setValue("otp", value);
    methods.formState.errors.otp && methods.clearErrors("otp");
  };
  // HANDLE FORM SUBMISSION
  const handleSubmit = async (data: IResetPasswordForm) => {
    // CLEAR PREVIOUS MESSAGES
    dispatch(setMessages({ message: "", type: "", isShow: false }));

    try {
      // STEP 0: SEND OTP TO EMAIL
      if (step === 0) {
        // setUserEmail(data.email);
        const res = await sentOTP({ email: data.email });
        res.data
          ? showSuccess("OTP sent successfully!", handleNext)
          : dispatch(
              setMessages({
                type: ERROR,
                isShow: true,
                message: getErrorMessage(res.error, data.email),
              })
            );
        // STEP 1: VERIFY OTP
      } else if (step === 1) {
        const res = await verifyOTP({ email: data.email, otp: data.otp });
        res.error
          ? methods.setError("otp", {
              type: "manual",
              message: error || "",
            })
          : showSuccess("Email verified successfully!", handleNext);
        // STEP 2: RESET PASSWORD
      } else if (step === 2) {
        console.log("Submitting reset password with data:", data);
        const res = await resetPassword({
          email: data.email,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        });
        res.data
          ? (setResetSuccess(true), showSuccess("Password reset successfully!"))
          : dispatch(
              setMessages({
                type: ERROR,
                isShow: true,
                message: getErrorMessage(res.error),
              })
            );
      }
    } catch (error) {
      dispatch(
        setMessages({ type: ERROR, isShow: true, message: "An error occurred" })
      );
    }
  };

  // SHOW SUCCESS MESSAGE AND EXECUTE OPTIONAL CALLBACK
  const showSuccess = (message: string, callback?: () => void) => {
    dispatch(setMessages({ type: SUCCESS, isShow: true, message }));
    setTimeout(() => {
      dispatch(setMessages({ type: "", isShow: false, message: "" }));
      callback?.();
    }, 2000);
  };

  // REDIRECT TO LOGIN PAGE AFTER SUCCESSFUL PASSWORD RESET
  useEffect(() => {
    resetSuccess &&
      setTimeout(() => {
        dispatch(setStep(0));
        dispatch(setOtp(Array(OTP_LENGTH).fill("")));
        navigate("/auth/login");
      }, 1500);
  }, [resetSuccess]);

  // COMPONENTS FOR EACH STEP
  const stepComponents = [
    <GetOTPByEmail />,
    <ConfirmOTP handleOTPChange={handleOTPChange} />,
    <NewPassword />,
  ];

  // RENDER RESET PASSWORD PAGE
  return (
    <div className="container h-svh relative">
      {/* HEADER WITH BACK BUTTON AND TITLE */}
      <div className="pt-4 pb-6 flex items-center gap-2">
        <div className="cursor-pointer w-5" onClick={handleBack}>
          <Image src={leftArrowIcon} alt="back" />
        </div>
        <h3 className="font-poppins text-base font-medium">FORGET PASSWORD</h3>
      </div>

      {/* FORM PROVIDER FOR REACT HOOK FORM */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={
            step === 1
              ? "bg-white absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl"
              : ""
          }
        >
          {/* STEP 1 HEADER */}
          {step === 1 && (
            <div className="text-center py-6 border-b border-[#E6E6E6]">
              <h1>CONFIRM YOUR EMAIL</h1>
            </div>
          )}

          <div className={step === 1 ? "px-6" : ""}>
            {/* RENDER STEP COMPONENT */}
            {stepComponents[step] || <div>INVALID STEP: {step}</div>}

            {/* SHOW MESSAGE TOAST IF NEEDED */}
            {isShow && msg && (
              <div className="mb-2 mt-2 px-6">
                <MessageToastify isShow={true} type={messageType} value={msg} />
              </div>
            )}

            {/* SHOW SUBMIT BUTTON IF NOT ON OTP STEP */}
            {step !== 1 && (
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm mt-4"
                style={{ fontFamily: "Poppins" }}
              >
                {isLoading ? "LOADING..." : step === 2 ? "CONFIRM" : "CONTINUE"}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
