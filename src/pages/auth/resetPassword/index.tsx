import { useCallback, useEffect, useState } from "react";
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
    setError,
    setOtp,
    setResetEmail,
} from "../../../redux/feature/auth/authSlice";
import {
    setIsShow,
    setMessage,
    setMessageType,
} from "../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../redux/hooks";
import GetOTPByEmail from "./_component/GetOTPByEmail";
import NewPassword from "./_component/NewPassword";
import useCleanState from "../../../hooks/useCleanState";

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
    const clearState = useCleanState()
    // const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate();
    const {
        messageType,
        message: msg,
        isShow,
    } = useAppSelector((state) => state.notification);
    const { success, loading, resetEmail, error, otp, message } =
        useAppSelector((state) => state.auth);
    const { step } = useAppSelector((state) => state.step);

    const [userPass, setUserPass] = useState<INewPassForm>({
        email:"",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});


    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetEmail(e.target.value.trim()));
        setErrors({
            ...errors,
            email: "",
        });
        clearState()
        // dispatch(setIsShow(false));
        // dispatch(setMessageType(''));
        // dispatch(setMessage(''));
        // dispatch(setError(''))
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserPass({ ...userPass, [e.target.name]: e.target.value });
        setErrors({
            ...errors,
            [e.target.id]: "",
        });

        if (
            e.target.name === "password" ||
            e.target.name === "confirmPassword"
        ) {
            if (
                e.target.name === "confirmPassword" &&
                userPass.password &&
                e.target.value !== userPass.password
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword:
                        "Password and confirm password do not match!",
                }));
            } else if (
                e.target.name === "password" &&
                userPass.confirmPassword &&
                userPass.confirmPassword !== e.target.value
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword:
                        "Password and confirm password does not match!",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: "",
                }));
            }
        }
    };

    const validateChangePassword = () => {
        let errors: {
            email: string | null | undefined;
            password: string | null | undefined;
            confirmPassword: string | null | undefined;
        } = {
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
        };

        if(step == 0){
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!resetEmail.trim()) {
                errors.email = "E-mail is required";
            } else if (!emailRegex.test(resetEmail)) {
                errors.email = "Please enter a valid email address";
            }
            setErrors(errors);
    
            const hasErrors = Object.values(errors).some(
                (error) => error !== undefined
            );
    
            return !hasErrors;
        }else if(step === 2) {
            if (!userPass.password) {
                errors.password = "Password is required";
            } else if (userPass.password.length < 0) {
                errors.password = "Password must be at least 6 characters long";
            }
            if (!userPass.confirmPassword) {
                errors.confirmPassword = "Confirm password is required";
            } else if (userPass.password.length < 0) {
                errors.confirmPassword =
                    "Confirm password must be at least 6 characters long";
            }
            setErrors(errors);
    
            const hasErrors = Object.values(errors).some(
                (error) => error !== undefined
            );
    
            return !hasErrors;
        }
        
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (step === 0) {
            if (validateChangePassword()) {
                await sentOTP({ email: resetEmail }).then((res) => {
                    if (res.data) {
                        const timer = setTimeout(() => {
                            clearState()
                            // dispatch(setIsShow(false));
                            // dispatch(setMessageType(""));
                            // dispatch(setMessage(""));
                            dispatch(setStep(step + 1));
                        }, 2000);
                        return () => clearTimeout(timer);
                    }
                });
            }
        } else if (step === 1) {
            if (
                resetEmail !== "" &&
                otp.join("") !== "" &&
                otp.join("").length >= 6
            ) {
                await verifyOTP({ email: resetEmail, otp: otp.join("") }).then(
                    (res) => {
                        if (res.data) {
                            const timer = setTimeout(() => {
                                clearState()
                                // dispatch(setIsShow(false));
                                // dispatch(setMessageType(""));
                                // dispatch(setMessage(""));
                                dispatch(setStep(step + 1));
                            }, 2000);
                            return () => clearTimeout(timer);
                        }
                    }
                );
            } else {
                dispatch(setIsShow(true));
                dispatch(setMessageType(ERROR));
                dispatch(
                    setMessage(
                        "OTP is required! insert your otp code in this field."
                    )
                );
            }
        } else if (step === 2) {
            if (validateChangePassword()) {
                const resetObj = {
                    newPassword: userPass.password,
                    confirmPassword: userPass.confirmPassword,
                    email: resetEmail,
                };
                await resetPassword(resetObj)
                    .then((res) => {
                        if (!res.error) {
                            const timer = setTimeout(() => {
                                clearState()
                                // dispatch(setIsShow(false));
                                // dispatch(setMessageType(""));
                                // dispatch(setMessage(""));
                                navigate("/auth/login");
                                dispatch(setStep(0));
                                dispatch(setResetEmail(""));
                                dispatch(setOtp(Array(6).fill("")));
                            }, 2000);
                            return () => clearTimeout(timer);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return (
                    <GetOTPByEmail
                        error={errors.email}
                        handleChange={handleEmailChange}
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
                    />
                );
            default:
                return null;
        }
    };
    const fieldError = Object.keys(errors).map((key) => errors[key]);
    const filterError = useCallback(
        () => fieldError.filter((error) => error),
        [fieldError]
    );
    console.log(filterError())
    const errorTypes = filterError()[0] ? filterError()[0] : error
    const IsItFieldError = filterError().length !== 0 ? 'FIELD_ERROR' : ERROR
    


    useEffect(() => {
        if (success || errorTypes) {            
            dispatch(setIsShow(true));
            dispatch(setMessageType(success ? SUCCESS : IsItFieldError));
            dispatch(setMessage(success ? message : errorTypes));            
        }
    }, [errorTypes, success]);

    useEffect(() => {
        clearState()
        // dispatch(setIsShow(false));
        // dispatch(setMessageType(""));
        // dispatch(setMessage(""));
        dispatch(setOtp(Array(6).fill("")))
    }, [location.pathname, dispatch]);
    return (
        <div>
            <div className="container h-svh relative">
                <div className="pt-4 pb-6 flex items-center gap-4">
                    <Image src={leftArrowIcon} alt="left" />
                    <h3 className="font-sofia text-base font-medium ">
                        Forget Password
                    </h3>
                </div>
                {
                    <form
                        onSubmit={(e) => handleSubmit(e)}
                        className={`${
                            step === 1
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
