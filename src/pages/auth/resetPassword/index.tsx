import type React from "react";
import { useEffect, useState } from "react";
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
import GetOTPByEmail from "./_component/GetOTPByEmail";
import NewPassword from "./_component/NewPassword";
import type { INewPassForm, OTPSchemaType } from "./interface";
import {
  emailSchema,
  otpSchema,
  passwordSchema,
  ResetPasswordValidation,
} from "./Schema";
import OTPInput from "react-otp-input";
import * as yup from "yup";
export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // API [SENT OTP, VERIFY OTP, RESET PASSWORD]
  const [sentOTP] = useLazySentOTPQuery();
  const [verifyOTP] = useLazyVerifyOTPQuery();
  const [resetPassword] = useResetPasswordMutation();

  // NOTIFICATION REDUX STATE
  // const {
  //   messageType,
  //   message: msg,
  //   isShow,
  // } = useAppSelector((state) => state.notification);
  // AUTH REDUX SELECTOR
  const { loading, error, message, otp } = useAppSelector(
    (state) => state.auth
  );
  // STEP FROM REDUX
  const { step } = useAppSelector((state) => state.step);
  // const [step, setStep] = useState<number>(0);

  // FORM SETUP
  const methods = useForm({
    resolver: yupResolver(
      ResetPasswordValidation[step] as yup.ObjectSchema<any>
    ),
    mode: "onChange",
  });

  const {
    handleSubmit,
    trigger,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = methods;
  console.log(errors);
  // const passwordMethods = useForm<
  //   Pick<INewPassForm, "password" | "confirmPassword">
  // >({
  //   resolver: yupResolver(passwordSchema),
  //   mode: "all",
  //   criteriaMode: "all",
  //   reValidateMode: "onChange",
  //   shouldFocusError: true,
  // });

  // useEffect(() => {
  //   otpMethods.setValue("otp", otp.join(""));
  // }, [otp, otpMethods]);

  // // Handler functions
  // const handleOTPChange = (value: string) => {
  //   dispatch(setOtp(value.split("")));
  //   if (value.length === 0) {
  //     otpMethods.setError("otp", {
  //       type: "manual",
  //       message: "OTP is required",
  //     });
  //   } else if (otpMethods.formState.errors.otp) {
  //     otpMethods.clearErrors("otp");
  //   }
  // };

  // const handleSendOTP = async (data: Pick<INewPassForm, "email">) => {
  //   try {
  //     setIsProcessing(true);
  //     dispatch(setError(""));
  //     dispatch(setMessages({ message: "", type: "", isShow: false }));
  //     setUserEmail(data.email);

  //     const res = await sentOTP({ email: data.email });
  //     if (res?.data) {
  //       dispatch(
  //         setMessages({
  //           type: SUCCESS,
  //           isShow: true,
  //           message: "OTP sent successfully!",
  //         })
  //       );
  //       setTimeout(() => {
  //         dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //         dispatch(setAuthMessage(""));
  //         dispatch(setStep(step + 1));
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error sending OTP:", error);
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // const handleVerifyOTP = async ({ otp: otpString }: OTPSchemaType) => {
  //   setIsProcessing(true);
  //   try {
  //     const res = await verifyOTP({ email: userEmail, otp: otpString });
  //     if ("error" in res) {
  //       otpMethods.setError("otp", {
  //         type: "manual",
  //         message: "The OTP you entered is incorrect",
  //       });
  //     } else {
  //       dispatch(
  //         setMessages({
  //           type: SUCCESS,
  //           isShow: true,
  //           message: "Email verified successfully!",
  //         })
  //       );
  //       setTimeout(() => {
  //         otpMethods.clearErrors("otp");
  //         dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //         dispatch(setAuthMessage(""));
  //         dispatch(setStep(step + 1));
  //       }, 2000);
  //     }
  //   } catch (error) {
  //     console.error("Error verifying OTP:", error);
  //     otpMethods.setError("otp", {
  //       type: "manual",
  //       message: "An error occurred during verification",
  //     });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // const handleResetPassword = async (
  //   data: Pick<INewPassForm, "password" | "confirmPassword">
  // ) => {
  //   if (!userEmail) {
  //     dispatch(
  //       setMessages({
  //         type: ERROR,
  //         isShow: true,
  //         message:
  //           "Email is required for password reset. Please go back to step 1.",
  //       })
  //     );
  //     return;
  //   }

  //   const resetData = {
  //     newPassword: data.password,
  //     confirmPassword: data.confirmPassword,
  //     email: userEmail,
  //   };

  //   try {
  //     setIsProcessing(true);
  //     const res = await resetPassword(resetData);

  //     if (res?.data) {
  //       setResetSuccess(true);
  //       dispatch(
  //         setMessages({
  //           type: SUCCESS,
  //           isShow: true,
  //           message: "Password reset successfully!",
  //         })
  //       );
  //     } else if (res?.error) {
  //       let errorMessage = "Failed to reset password. Please try again.";

  //       if ("data" in res.error && res.error.data) {
  //         if (
  //           typeof res.error.data === "object" &&
  //           res.error.data !== null &&
  //           "message" in res.error.data
  //         ) {
  //           errorMessage = String(res.error.data.message);
  //         } else if (typeof res.error.data === "string") {
  //           errorMessage = res.error.data;
  //         }
  //       }

  //       dispatch(
  //         setMessages({
  //           type: ERROR,
  //           isShow: true,
  //           message: errorMessage,
  //         })
  //       );
  //     } else {
  //       dispatch(
  //         setMessages({
  //           type: ERROR,
  //           isShow: true,
  //           message: "Failed to reset password. Please try again.",
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     dispatch(
  //       setMessages({
  //         type: ERROR,
  //         isShow: true,
  //         message: "An error occurred while resetting password.",
  //       })
  //     );
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  // Form submission
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const submissionHandlers = {
  //     0: () => emailMethods.handleSubmit(handleSendOTP)(),
  //     1: () => otpMethods.handleSubmit(handleVerifyOTP)(),
  //     2: () => passwordMethods.handleSubmit(handleResetPassword)(),
  //   };

  //   const handler = submissionHandlers[step as keyof typeof submissionHandlers];
  //   if (handler) handler();
  // };

  // Form validation
  // const checkingFieldErrorOrApiError = () => {
  //   const errorCheckers = {
  //     0: () => {
  //       const errorMessage =
  //         emailMethods.formState.errors.email?.message || error;
  //       return { isShow: !!errorMessage, msg: errorMessage || "", type: ERROR };
  //     },
  //     1: () => ({ isShow: false, msg: "", type: "" }),
  //     2: () => {
  //       const errorMessage =
  //         passwordMethods.formState.errors.password?.message ||
  //         passwordMethods.formState.errors.confirmPassword?.message ||
  //         error;
  //       return { isShow: !!errorMessage, msg: errorMessage || "", type: ERROR };
  //     },
  //   };

  //   const checker = errorCheckers[step as keyof typeof errorCheckers];
  //   return checker ? checker() : { isShow: false, msg: "", type: "" };
  // };

  // Navigation
  // const handleBack = () => {
  //   if (step === 0) {
  //     navigate(-1);
  //   } else {
  //     if (step === 1) otpMethods.clearErrors("otp");
  //     dispatch(setStep(step - 1));
  //   }
  // };

  // Update password values from child component
  // const updatePasswordValues = (password: string, confirmPassword: string) => {
  //   setPasswordFormValues({ password, confirmPassword });
  // };

  // Effects
  // useEffect(() => {
  //   if (step !== 1) {
  //     const { isShow, msg, type } = checkingFieldErrorOrApiError();
  //     if (isShow && msg) {
  //       dispatch(setMessages({ type, isShow, message: msg }));
  //     } else if (!isShow) {
  //       dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //     }
  //   }
  // }, [
  //   emailMethods.formState.errors,
  //   passwordMethods.formState.errors,
  //   error,
  //   message,
  //   step,
  //   dispatch,
  // ]);

  useEffect(() => {
    dispatch(setError(""));
  }, [location.pathname, dispatch]);

  // useEffect(() => {
  //   if (resetSuccess) {
  //     const timer = setTimeout(() => {
  //       console.log("Redirecting to login after successful reset");
  //       navigate("/auth/login");
  //       dispatch(setStep(0));
  //       dispatch(setOtp(Array(6).fill("")));
  //       dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //     }, 1500);

  //     return () => clearTimeout(timer);
  //   }
  // }, [resetSuccess, navigate, dispatch]);

  // useEffect(() => {
  //   if (step === 0) {
  //     otpMethods.clearErrors("otp");
  //   }
  // }, [step, otpMethods]);

  // useEffect(() => {
  //   if (error || message) {
  //     const errorMessage = error || message;
  //     if (errorMessage) {
  //       dispatch(
  //         setMessages({
  //           type: error ? ERROR : SUCCESS,
  //           isShow: true,
  //           message: errorMessage,
  //         })
  //       );
  //     }
  //   }
  // }, [error, message, dispatch]);

  // useEffect(() => {
  //   const emailValue = emailMethods.watch("email");
  //   if (emailValue && emailValue.length > 0) {
  //     dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //   }
  // }, [emailMethods.watch("email"), dispatch]);

  // useEffect(() => {
  //   if (step === 2) {
  //     const password = passwordMethods.watch("password");
  //     const confirmPassword = passwordMethods.watch("confirmPassword");

  //     if (password || confirmPassword) {
  //       dispatch(setMessages({ type: "", isShow: false, message: "" }));
  //     }
  //   }
  // }, [
  //   passwordMethods.watch("password"),
  //   passwordMethods.watch("confirmPassword"),
  //   step,
  //   dispatch,
  // ]);

  // Render step components
  // const renderEmailStep = () => <GetOTPByEmail methods={emailMethods} />;

  // const renderOtpStep = () => (
  //   <>
  //     <p className="text-sm font-light font-poppins text-center pt-8 pb-10">
  //       Enter the code we've sent to your Email
  //     </p>
  //     <div className="flex gap-2 justify-between mb-5">
  //       <OTPInput
  //         value={otp.join("")}
  //         onChange={handleOTPChange}
  //         numInputs={6}
  //         shouldAutoFocus
  //         inputType="text"
  //         renderInput={(props) => (
  //           <input
  //             {...props}
  //             maxLength={1}
  //             inputMode="numeric"
  //             placeholder="-"
  //             className={`max-w-10 h-10 mb-5 bg-[#E7E7E7] ${
  //               otpMethods.formState.errors.otp
  //                 ? "border border-rose-500"
  //                 : "border border-[#D9D9D9]"
  //             } rounded-md text-center text-base font-normal focus:outline-none transition-all duration-150`}
  //             style={{ backgroundColor: "#E7E7E7" }}
  //           />
  //         )}
  //         containerStyle={{
  //           display: "flex",
  //           justifyContent: "space-between",
  //           width: "100%",
  //         }}
  //       />
  //     </div>

  //     {otpMethods.formState.errors.otp && (
  //       <MessageToastify
  //         isShow={true}
  //         type={ERROR}
  //         value={otpMethods.formState.errors.otp.message}
  //       />
  //     )}

  //     {isShow && msg && (
  //       <div className="mb-2 mt-2">
  //         <MessageToastify isShow={isShow} type={messageType} value={msg} />
  //       </div>
  //     )}

  //     <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
  //       <p>Haven't received a code?</p>
  //       <Button type="button" className="underline text-sm">
  //         Send again
  //       </Button>
  //     </div>
  //   </>
  // );

  // const renderPasswordStep = () => (
  //   <NewPassword
  //     methods={passwordMethods}
  //     updateValues={updatePasswordValues}
  //   />
  // );

  // Button text based on step
  // const getButtonText = () => {
  //   if (loading || isProcessing) return "Loading...";
  //   return step === 1 ? "OTP Verify" : "Continue";
  // };

  // Button click handler
  // const handleButtonClick = async () => {
  //   if (step === 2) {
  //     try {
  //       const isValid = await passwordMethods.trigger();

  //       if (isValid) {
  //         const formData = passwordMethods.getValues();
  //         handleResetPassword(formData);
  //       } else {
  //         const passwordError =
  //           passwordMethods.formState.errors.password?.message;
  //         const confirmError =
  //           passwordMethods.formState.errors.confirmPassword?.message;

  //         const errorMessage =
  //           confirmError || passwordError || "Please check password fields";
  //         dispatch(
  //           setMessages({
  //             type: ERROR,
  //             isShow: true,
  //             message: errorMessage,
  //           })
  //         );
  //       }
  //     } catch (error) {
  //       console.error("Error validating form:", error);
  //       dispatch(
  //         setMessages({
  //           type: ERROR,
  //           isShow: true,
  //           message: "Error validating password fields",
  //         })
  //       );
  //     }
  //   }
  // };

  // Steps configuration
  // const stepComponents = {
  //   0: renderEmailStep,
  //   1: renderOtpStep,
  //   2: renderPasswordStep,
  // };

  // HANDLING NEXT STEP
  const handleSubmitFn = async (data) => {
    const valid = await trigger();
    if (valid) {
      if (step == 0) {
        if (data.email) {
          const resp = await sentOTP({ email: data.email });
          if (resp?.data) {
            dispatch(setStep(step + 1));
          }
        }
      } else if (step == 1) {
        if (data.otp.join("")) {
          const resp = await verifyOTP({
            email: data.email,
            opt: data.otp.join(""),
          });
          if (resp) {
            dispatch(setStep(step + 1));
          }
        }
      } else if (step === 2) {
      }
    }
  };

  return (
    <div>
      <div className="container h-svh relative">
        <div className="pt-4 pb-6 flex items-center gap-2">
          <div
            className="cursor-pointer w-5"
            // onClick={handleBack}
          >
            <Image src={leftArrowIcon || "/placeholder.svg"} alt="left" />
          </div>
          <h3 className="font-poppins text-base font-medium">
            Forget Password
          </h3>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit((data) => handleSubmitFn(data))}>
            {step === 0 && <GetOTPByEmail />}
            <Button
              type="submit"
              className="bg-primary text-white w-full py-4 rounded-lg flex items-center justify-center  font-poppins text-base font-medium"
            >
              Continue
            </Button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
