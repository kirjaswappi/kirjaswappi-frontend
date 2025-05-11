import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
import { emailSchema, otpSchema, passwordSchema } from "./Schema";
import OTPInput from "react-otp-input";

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sentOTP] = useLazySentOTPQuery();
  const [verifyOTP] = useLazyVerifyOTPQuery();
  const [resetPassword] = useResetPasswordMutation();

  const {
    messageType,
    message: msg,
    isShow,
  } = useAppSelector((state) => state.notification);
  const { loading, error, message, otp } = useAppSelector(
    (state) => state.auth
  );
  const { step } = useAppSelector((state) => state.step);

  const [isProcessing, setIsProcessing] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  // Email form setup
  const {
    register: registerEmail,
    handleSubmit: handleSubmitEmail,
    formState: { errors: emailErrors },
  } = useForm<Pick<INewPassForm, "email">>({
    resolver: yupResolver(emailSchema),
    mode: "onChange",
  });

  // OTP form setup
  const {
    handleSubmit: handleSubmitOtp,
    setValue: setOtpValue,
    setError: setOtpError,
    clearErrors: clearOtpErrors,
    formState: { errors: otpErrors },
  } = useForm<OTPSchemaType>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: otp.join("") },
    mode: "onChange",
  });

  // Password form setup
  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: passwordErrors, isValid: passwordIsValid },
  } = useForm<Pick<INewPassForm, "password" | "confirmPassword">>({
    resolver: yupResolver(passwordSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setOtpValue("otp", otp.join(""));
  }, [otp, setOtpValue]);

  // Handle OTP input changes
  const handleOTPChange = (value: string) => {
    dispatch(setOtp(value.split("")));
    if (value.length === 0) {
      setOtpError("otp", { type: "manual", message: "OTP is required" });
    } else if (otpErrors.otp) {
      clearOtpErrors("otp");
    }
  };

  // Send OTP handler
  const handleSendOTP = async (data: Pick<INewPassForm, "email">) => {
    try {
      setIsProcessing(true);
      dispatch(setError(""));
      dispatch(setMessages({ message: "", type: "", isShow: false }));
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
          dispatch(setStep(step + 1));
        }, 2000);
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Verify OTP handler
  const handleVerifyOTP = async ({ otp: otpString }: OTPSchemaType) => {
    setIsProcessing(true);
    try {
      const res = await verifyOTP({ email: userEmail, otp: otpString });
      if ("error" in res) {
        setOtpError("otp", {
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
          // Clear any OTP errors before moving to the next step
          clearOtpErrors("otp");
          dispatch(setMessages({ type: "", isShow: false, message: "" }));
          dispatch(setAuthMessage(""));
          dispatch(setStep(step + 1));
        }, 2000);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setOtpError("otp", {
        type: "manual",
        message: "An error occurred during verification",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetPassword = async (
    data: Pick<INewPassForm, "password" | "confirmPassword">
  ) => {
    // Validate email is available
    if (!userEmail) {
      dispatch(
        setMessages({
          type: ERROR,
          isShow: true,
          message: "Email is required for password reset. Please go back to step 1.",
        })
      );
      return;
    }
    
    const resetData = {
      newPassword: data.password,
      confirmPassword: data.confirmPassword,
      email: userEmail,
    };

    try {
      setIsProcessing(true);
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
        // Extract and display the actual error message from the API response
        let errorMessage = "Failed to reset password. Please try again.";
        
        if ('data' in res.error && res.error.data) {
          // Check if the error data has a message field
          if (typeof res.error.data === 'object' && res.error.data !== null && 'message' in res.error.data) {
            errorMessage = String(res.error.data.message);
          } else if (typeof res.error.data === 'string') {
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
      } else {
        // No success response - show error
        dispatch(
          setMessages({
            type: ERROR,
            isShow: true,
            message: "Failed to reset password. Please try again.",
          })
        );
      }
    } catch (error) {
      // Show error message to user
      dispatch(
        setMessages({
          type: ERROR,
          isShow: true,
          message: "An error occurred while resetting password.",
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (step === 0) {
      handleSubmitEmail(handleSendOTP)();
    }
    else if (step === 1) {
      handleSubmitOtp(handleVerifyOTP)();
    }
    else if (step === 2) {
      handleSubmitPassword(handleResetPassword)();
    }
  };

  // Check for validation errors
  const checkingFieldErrorOrApiError = () => {
    if (step === 0 && (error || Object.keys(emailErrors).length > 0)) {
      const errorMessage = error || emailErrors.email?.message;
      return { msg: errorMessage, type: ERROR, isShow: !!errorMessage };
    }

    if (step === 2 && (error || Object.keys(passwordErrors).length > 0)) {
      const errorMessage =
        error ||
        passwordErrors.password?.message ||
        passwordErrors.confirmPassword?.message;
      return { msg: errorMessage, type: ERROR, isShow: !!errorMessage };
    }

    if (message && message !== null) {
      return { msg: message, type: SUCCESS, isShow: true };
    }

    return { isShow: false, msg: "", type: "" };
  };

  // Update error messages
  useEffect(() => {
    if (step !== 1) {
      const { isShow, msg, type } = checkingFieldErrorOrApiError();
      if (isShow && msg) {
        dispatch(setMessages({ type, isShow, message: msg }));
      } else if (!isShow && msg === "") {
        dispatch(setMessages({ type: "", isShow: false, message: "" }));
      }
    }
  }, [emailErrors, passwordErrors, error, message, step]);

  // Clear errors on route change
  useEffect(() => {
    dispatch(setMessages({ type: "", isShow: false, message: "" }));
    dispatch(setError(""));
  }, [location.pathname, dispatch]);

  // Handle back button or navigation
  const handleBack = () => {
    if (step === 0) {
      navigate("/auth/login");
    } else {
      // Clear specific errors based on current step
      if (step === 1) {
        clearOtpErrors("otp");
      }
      dispatch(setStep(step - 1));
      dispatch(setError(""));
      dispatch(setMessages({ type: "", isShow: false, message: "" }));
    }
  };

  // Add effect to monitor password validation state
  useEffect(() => {
    // Monitoring password validation state
  }, [passwordErrors, passwordIsValid]);

  // Clear errors when step changes
  useEffect(() => {
    // Clear any lingering errors when step changes
    dispatch(setError(""));
    dispatch(setMessages({ type: "", isShow: false, message: "" }));
    
    // Clear form-specific errors
    if (step === 1) {
      clearOtpErrors("otp");
    }
  }, [step, dispatch, clearOtpErrors]);

  // Track successful reset and redirect to login
  useEffect(() => {
    if (resetSuccess) {
      const timer = setTimeout(() => {
        console.log("Redirecting to login after successful reset");
        navigate("/auth/login");
        dispatch(setStep(0));
        dispatch(setOtp(Array(6).fill("")));
        dispatch(setMessages({ type: "", isShow: false, message: "" }));
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [resetSuccess, navigate, dispatch]);

  // State to store form values directly
  const [passwordFormValues, setPasswordFormValues] = useState({
    password: "",
    confirmPassword: ""
  });

  // Function to update password values from child component
  const updatePasswordValues = (password: string, confirmPassword: string) => {
    setPasswordFormValues({ password, confirmPassword });
  };

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

        <form
          onSubmit={handleSubmit}
          className={`${
            step === 1
              ? "bg-white absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl"
              : ""
          }`}
        >
          {step === 1 && (
            <div className="text-center py-6 border-b border-[#E6E6E6]">
              <h1>Confirm your Email</h1>
            </div>
          )}

          <div className={`${step === 1 && "px-6"}`}>
            {step === 0 && (
              <GetOTPByEmail register={registerEmail} errors={emailErrors} />
            )}

            {step === 1 && (
              <>
                <p className="text-sm font-light font-poppins text-center pt-8 pb-10">
                  Enter the code we've sent to your Email
                </p>
                <div className="flex gap-2 justify-between mb-5">
                  <OTPInput
                    value={otp.join("")}
                    onChange={handleOTPChange}
                    numInputs={6}
                    shouldAutoFocus
                    inputType="text"
                    renderInput={(props) => (
                      <input
                        {...props}
                        maxLength={1}
                        inputMode="numeric"
                        placeholder="-"
                        className={`max-w-10 h-10 mb-5 bg-[#E7E7E7] ${
                          otpErrors.otp
                            ? "border border-rose-500"
                            : "border border-[#D9D9D9]"
                        } rounded-md text-center text-base font-normal focus:outline-none transition-all duration-150`}
                        style={{ backgroundColor: "#E7E7E7" }}
                      />
                    )}
                    containerStyle={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  />
                </div>

                {otpErrors.otp && (
                  <MessageToastify
                    isShow={true}
                    type={ERROR}
                    value={otpErrors.otp.message}
                  />
                )}

                {/* Success message for OTP */}
                {isShow && msg && step === 1 && (
                  <div className="mb-2 mt-2">
                    <MessageToastify
                      isShow={isShow}
                      type={messageType}
                      value={msg}
                    />
                  </div>
                )}

                <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
                  <p>Haven't received a code?</p>
                  <Button type="button" className="underline text-sm">
                    Send again
                  </Button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <NewPassword
                  register={registerPassword}
                  errors={passwordErrors}
                  updateValues={updatePasswordValues}
                />
              </>
            )}

            {/* Display messages for steps 0 and 2 */}
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
              type={step === 2 ? "button" : "submit"}
              disabled={loading || isProcessing}
              className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm mt-4"
              onClick={() => {
                // For step 2, properly trigger the password form validation
                if (step === 2) {
                  // Get current password values from state
                  const { password, confirmPassword } = passwordFormValues;
                  
                  // Basic validation before submitting
                  if (!password || !confirmPassword) {
                    dispatch(
                      setMessages({
                        type: ERROR,
                        isShow: true,
                        message: "Please enter both password and confirmation",
                      })
                    );
                    return;
                  }
                  
                  if (password !== confirmPassword) {
                    dispatch(
                      setMessages({
                        type: ERROR,
                        isShow: true,
                        message: "Passwords do not match",
                      })
                    );
                    return;
                  }
                  
                  // Clear any lingering errors
                  dispatch(setError(""));
                  dispatch(setMessages({ type: "", isShow: false, message: "" }));
                  
                  // Submit directly with current values
                  handleResetPassword({
                    password,
                    confirmPassword
                  });
                }
              }}
            >
              {loading || isProcessing
                ? "Loading..."
                : step === 1
                ? "OTP Verify"
                : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
