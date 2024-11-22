import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import MessageToastify from "../../../components/shared/MessageToastify";
import OTP from "../../../components/shared/OTP";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import {
    useLazySentOTPQuery,
    useLazyVerifyOTPQuery,
    useResetPasswordMutation,
} from "../../../redux/feature/auth/authApi";
import {
    setAuthMessage,
    setError,
    setOtp
} from "../../../redux/feature/auth/authSlice";
import {
    setMessages
} from "../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../redux/hooks";
import GetOTPByEmail from "./_component/GetOTPByEmail";
import NewPassword from "./_component/NewPassword";

interface INewPassForm {
    email: string;
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const dispatch = useDispatch();
    const [sentOTP] = useLazySentOTPQuery();
    const [verifyOTP] = useLazyVerifyOTPQuery();
    const [resetPassword] = useResetPasswordMutation();
    const navigate = useNavigate();

    const {
        messageType,
        message: msg,
        isShow,
    } = useAppSelector((state) => state.notification);
    const { loading, error, message, otp } =
        useAppSelector((state) => state.auth);
    const { step } = useAppSelector((state) => state.step);

    const [userPass, setUserPass] = useState<INewPassForm>({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});

    // Filtered Error
    const fieldError = Object.keys(errors).map((key) => errors[key]);
    const filteredError = fieldError.filter((msg) => msg);

    // handle Change function to take sign-up information
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserPass({ ...userPass, [name]: value });
        setErrors({ ...errors, [name]: "" });
        // validateInput(e);
        dispatch(setError(''))
        dispatch(setMessages({ message: "", type: '', isShow: false }))
    };

    // Handle Input validation (onBlur)
    const validateInput = (e: any) => {
        const { name, value } = e.target;
        setErrors((prev: any) => {
            const stateObj = { ...prev, [name]: "" };
            if (step === 0) {
                if (name === "email") {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value) {
                        stateObj[name] = "Please enter email.";
                    } else if (!emailRegex.test(value)) {
                        stateObj[name] = "Please enter a valid email.";
                    }
                }
            } else if (step === 2) {
                if (name === "password") {
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (userPass.confirmPassword && value !== userPass.confirmPassword) {
                        stateObj["confirmPassword"] = "Password and Confirm Password do not match.";
                    } else {
                        stateObj["confirmPassword"] = userPass.confirmPassword ? "" : errors.confirmPassword;
                    }
                } else if (name === "confirmPassword") {
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (userPass.password && value !== userPass.password) {
                        stateObj[name] = "Password and Confirm Password do not match.";
                    }
                }
            }
            return stateObj;
        });
    };
    const validateStep = () => {
        let allValid = true;
        Object.keys(userPass).forEach((key) => {
            const typedKey = key as keyof INewPassForm;
            const value = userPass[typedKey];

            // Validate only the relevant fields for each step
            if ((step === 0 && typedKey === "email") || (step === 2 && (typedKey === "password" || typedKey === "confirmPassword"))) {
                const event = {
                    target: {
                        name: key,
                        value,
                    },
                };
                validateInput(event);
                if (!value) allValid = false;
            }
        });
        return allValid;
    };

    const handleSendOTP = async () => {
        try {
            const res = await sentOTP({ email: userPass.email });
            if (res?.data) {

                const timer = setTimeout(() => {
                    dispatch(setMessages({ type: "", isShow: false, message: "" }));
                    dispatch(setAuthMessage(''));
                    dispatch(setStep(step + 1));
                }, 2000);
                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error("Error sending OTP:", error);
        }
    };

    const handleVerifyOTP = async () => {
        if (userPass.email && otp.join('') && otp.join('').length >= 6) {
            try {
                const res = await verifyOTP({ email: userPass.email, otp: otp.join("") });
                if (res?.data) {

                    const timer = setTimeout(() => {
                        dispatch(setMessages({ type: "", isShow: false, message: "" }));
                        dispatch(setAuthMessage(''));
                        dispatch(setStep(step + 1));
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            } catch (error) {
                console.error("Error verifying OTP:", error);
            }
        } else {
            dispatch(setMessages({
                type: ERROR,
                isShow: true,
                message: "OTP is required! Insert your OTP code.",
            }));
        }
    };

    const handleResetPassword = async () => {
        const resetObj = {
            newPassword: userPass.password,
            confirmPassword: userPass.confirmPassword,
            email: userPass.email,
        };
        try {
            const res = await resetPassword(resetObj);
            if (res?.data) {

                const timer = setTimeout(() => {
                    dispatch(setMessages({ type: "", isShow: false, message: "" }));
                    dispatch(setAuthMessage(''));
                    navigate("/auth/login");
                    dispatch(setStep(0));
                    dispatch(setOtp(Array(6).fill("")));

                }, 2000);
                return () => clearTimeout(timer);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateStep()) return;
        if (step === 0) {
            await handleSendOTP();
        } else if (step === 1) {
            await handleVerifyOTP();
        } else if (step === 2) {
            await handleResetPassword();
        }
    };


    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <GetOTPByEmail
                        userInfo={userPass}
                        error={errors.email}
                        handleChange={handleChange}
                        validateInput={validateInput}
                    />
                );
            case 1:
                return <OTP otpMessageShow={false} />;
            case 2:
                return (
                    <NewPassword
                        userPass={userPass}
                        handleChange={handleChange}
                        errors={errors}
                        validateInput={validateInput}
                    />
                );
            default:
                return null;
        }
    };


    const checkingFieldErrorOrApiError = () => {
        if (message && message !== null) {
            return {
                msg: message,
                type: SUCCESS,
                isShow: true,
            };
        } if (error && error !== null || filteredError.length > 0 || msg !== '') {
            return {
                msg: error || filteredError[0] || msg,
                type: ERROR,
                isShow: true,
            };
        }
        return {
            isShow: false,
            msg: "",
            type: "",
        };
    };

    useEffect(() => {
        const { isShow, msg, type } = checkingFieldErrorOrApiError();
        if (isShow && msg) {
            dispatch(setMessages({ type, isShow, message: msg }));
        } else {
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
        }
    }, [filteredError, error, message, msg]);

    // clean-up
    useEffect(() => {
        dispatch(setMessages({ type: '', isShow: false, message: '' }))
        dispatch(setError(''))
    }, [location.pathname, dispatch]);

    return (
        <div>
            <div className="container h-svh relative">
                <div className="pt-4 pb-6 flex items-center gap-2">
                    <div
                        className="cursor-pointer w-5"
                        onClick={() => {
                            if (step === 0) {
                                navigate("/auth/login")
                            } else {
                                dispatch(setStep(step - 1))
                                dispatch(setError(''))
                            }
                        }}

                    >
                        <Image src={leftArrowIcon} alt="left" />
                    </div>
                    <h3 className="font-sofia text-base font-medium ">
                        Forget Password
                    </h3>
                </div>
                {
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className={`${step === 1
                            ? "bg-white absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl"
                            : ""
                            }`}
                    >
                        {step === 1 && (
                            <div className="text-center py-6 border-b border-[#E6E6E6]">
                                <h1>Confirm you Email</h1>
                            </div>
                        )}
                        <div className={`${step === 1 && "px-6"}`}>
                            {step === 1 && (
                                <p className="text-sm font-light font-sofia text-center pt-8 pb-10">
                                    Enter the code we’ve sent to your Email
                                </p>
                            )}
                            {renderStepContent()}

                            {isShow && (
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
                                className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm mt-4"
                            >
                                {loading ? "Loading..." : "Continue"}
                            </Button>
                        </div>
                    </form>
                }
            </div>
        </div>
    );
}
