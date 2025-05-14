// Main ResetPassword.jsx component
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import MessageToastify from "../../../components/shared/MessageToastify";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import {
  useLazySentOTPQuery,
  useLazyVerifyOTPQuery,
  useResetPasswordMutation,
} from "../../../redux/feature/auth/authApi";
import {
  setAuthMessage,
  setError,
  setOtp,
} from "../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../redux/hooks";
import { OTP_LENGTH } from "../../../utility/constant";
import { ResetPasswordValidation } from "./Schema";

// Import components
import GetOTPByEmail from "./_component/GetOTPByEmail";
import { NewPassword } from "./_component/NewPassword";
import ControllerFieldOTP from "../../../components/shared/ControllerFieldOTP";
import * as yup from "yup";
// Import interfaces
import type { INewPassForm, OTPSchemaType } from "./interface";

// Define a combined form type for the whole process
interface IResetPasswordForm {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPassword() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // SENT OTP & VERIFY PASSWORD QUERY
  const [sentOTP] = useLazySentOTPQuery();
  const [verifyOTP] = useLazyVerifyOTPQuery();
  //RESET PASSWORD MUTATION
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  // Redux state
  const {
    messageType,
    message: msg,
    isShow,
  } = useAppSelector((state) => state.notification);
  const { loading, error, message, otp } = useAppSelector(
    (state) => state.auth
  );
  const { step } = useAppSelector((state) => state.step);

  // Local state
  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // Set up form with the appropriate schema for the current step
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

  // Update OTP in form when it changes in Redux state
  useEffect(() => {
    methods.setValue("otp", otp.join(""));
  }, [otp, methods]);

  // Handle navigation back
  const handleBack = () => {
    if (step === 0) {
      navigate(-1);
    } else {
      dispatch(setStep(step - 1));
      dispatch(setMessages({ type: "", isShow: false, message: "" }));
    }
  };

  // Handle navigation to next step
  const handleNext = async () => {
    const isValid = await methods.trigger();
    if (isValid) {
      dispatch(setStep(step + 1));
    }
  };

  // OTP change handler
  const handleOTPChange = (value: string) => {
    dispatch(setOtp(value.split("")));
    methods.setValue("otp", value);
    if (methods.formState.errors.otp) {
      methods.clearErrors("otp");
    }
  };

  // Form submission handler
  const handleSubmit = async (data: IResetPasswordForm) => {
    setIsProcessing(true);
    dispatch(setError(""));
    dispatch(setMessages({ message: "", type: "", isShow: false }));

    try {
      // Step 1: Send OTP
      if (step === 0) {
        setUserEmail(data.email);
        const res = await sentOTP({ email: data.email });

        if (res?.data) {
          dispatch(
            setMessages({
              type: SUCCESS,
              isShow: true,
              message: "OTP sent successfully!",
            })
          );
          setTimeout(() => {
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
            dispatch(setAuthMessage(""));
            handleNext();
          }, 2000);
        }
      }
      // Step 2: Verify OTP
      else if (step === 1) {
        const res = await verifyOTP({
          email: userEmail,
          otp: data.otp,
        });

        if ("error" in res) {
          methods.setError("otp", {
            type: "manual",
            message: "The OTP you entered is incorrect",
          });
        } else {
          dispatch(
            setMessages({
              type: SUCCESS,
              isShow: true,
              message: "Email verified successfully!",
            })
          );
          setTimeout(() => {
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
            dispatch(setAuthMessage(""));
            handleNext();
          }, 2000);
        }
      }
      // Step 3: Reset Password
      else if (step === 2) {
        const resetData = {
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
          email: userEmail,
        };

        const res = await resetPassword(resetData);

        if (res?.data) {
          setResetSuccess(true);
          dispatch(
            setMessages({
              type: SUCCESS,
              isShow: true,
              message: "Password reset successfully!",
            })
          );
        } else if (res?.error) {
          let errorMessage = "Failed to reset password. Please try again.";

          if ("data" in res.error && res.error.data) {
            if (
              typeof res.error.data === "object" &&
              res.error.data !== null &&
              "message" in res.error.data
            ) {
              errorMessage = String(res.error.data.message);
            } else if (typeof res.error.data === "string") {
              errorMessage = res.error.data;
            }
          }

          dispatch(
            setMessages({
              type: ERROR,
              isShow: true,
              message: errorMessage,
            })
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      dispatch(
        setMessages({
          type: ERROR,
          isShow: true,
          message: "An error occurred. Please try again.",
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Redirect to login after successful password reset
  useEffect(() => {
    if (resetSuccess) {
      const timer = setTimeout(() => {
        console.log("Redirecting to login after successful reset");
        navigate("/auth/login");
        dispatch(setStep(0));
        dispatch(setOtp(Array(OTP_LENGTH).fill("")));
        dispatch(setMessages({ type: "", isShow: false, message: "" }));
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [resetSuccess, navigate, dispatch]);

  // Render OTP confirmation step
  const renderOtpStep = () => (
    <>
      <p className="text-sm font-light font-poppins text-center pt-8 pb-10">
        Enter the code we've sent to your Email
      </p>
      <ControllerFieldOTP
        name="otp"
        showErrorMessage={true}
        onOTPChange={handleOTPChange}
      />

      {isShow && msg && (
        <div className="mb-2 mt-2">
          <MessageToastify isShow={isShow} type={messageType} value={msg} />
        </div>
      )}

      <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
        <p>Haven't received a code?</p>
        <Button type="button" className="underline text-sm">
          Send again
        </Button>
      </div>
    </>
  );

  // Steps configuration
  const stepComponents = {
    0: <GetOTPByEmail />,
    1: renderOtpStep(),
    2: <NewPassword />,
  };

  console.log("Current step:", step);

  return (
    <div>
      <div className="container h-svh relative">
        <div className="pt-4 pb-6 flex items-center gap-2">
          <div className="cursor-pointer w-5" onClick={handleBack}>
            <Image src={leftArrowIcon || "/placeholder.svg"} alt="left" />
          </div>
          <h3 className="font-poppins text-base font-medium">
            Forget Password
          </h3>
        </div>

        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(handleSubmit)}
            className={
              step === 1
                ? "bg-white absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl"
                : ""
            }
          >
            {step === 1 && (
              <div className="text-center py-6 border-b border-[#E6E6E6]">
                <h1>Confirm your Email</h1>
              </div>
            )}

            <div className={step === 1 ? "px-6" : ""}>
              {stepComponents[step as keyof typeof stepComponents] || (
                <div>Invalid step: {step}</div>
              )}

              {isShow && msg && step !== 1 && (
                <div className="mb-2 mt-2">
                  <MessageToastify
                    isShow={isShow}
                    type={messageType}
                    value={msg}
                  />
                </div>
              )}

              <Button
                type="submit"
                disabled={isProcessing || isLoading}
                className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm mt-4"
              >
                {isProcessing || isLoading
                  ? "Loading..."
                  : step === 1
                  ? "OTP Verify"
                  : "Reset Password"}
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
