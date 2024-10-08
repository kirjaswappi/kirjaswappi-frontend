import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authVector from "../../../assets/vectorAuth.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import MessageToastify from "../../../components/shared/MessageToastify";
import OTP from "../../../components/shared/OTP";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import { useLazySentOTPQuery, useLazyVerifyOTPQuery, useResetPasswordMutation } from "../../../redux/feature/auth/authApi";
import { setError, setOtp, setResetEmail } from "../../../redux/feature/auth/authSlice";
import { setIsShow, setMessage, setMessageType } from "../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../redux/hooks";
import GetOTPByEmail from "./_component/GetOTPByEmail";
import NewPassword from "./_component/NewPassword";


interface INewPassForm {
    password: string;
    confirmPassword: string;
}

export default function ResetPassword() {
    const dispatch = useDispatch()
    const [sentOTP] = useLazySentOTPQuery()
    const [verifyOTP] = useLazyVerifyOTPQuery()
    const [resetPassword] = useResetPasswordMutation()
    // const [resetPassword] = useResetPasswordMutation()
    const navigate = useNavigate()
    const { messageType, message:msg, isShow } = useAppSelector(state => state.notification)
    const { success, loading, resetEmail, error, otp, message } = useAppSelector(state => state.auth)
    const { step } = useAppSelector(state => state.step)
    const [emailError, setEmailError] = useState<string | null | undefined>('')       
    
    const [userPass, setUserPass] = useState<INewPassForm>({
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});

// console.log(userPass)
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setResetEmail(e.target.value.trim()))
        setEmailError('')
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
    }
    const validation = () => {
        let error: {
            email: string | null | undefined;
        } = {
            email: undefined,
        };
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!resetEmail.trim()) {
            error.email = "E-mail is required";
        } else if (!emailRegex.test(resetEmail)) {
            error.email = "Please enter a valid email address";
        }
        if (error) {
            setEmailError(error?.email)
        }
        const hasErrors = Object.values(error).some(
            (error) => error !== undefined
        );
        return !hasErrors;
    }
    const validateChangePassword = () => {
        let errors: {
            password: string | null | undefined;
            confirmPassword: string | null | undefined;
        } = {
            password: undefined,
            confirmPassword: undefined,
        };
        
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
    };

    const handleSubmit =  async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        if (step === 0) {
            if (validation()) {
                await sentOTP({ email: resetEmail }).then(res => {
                    if(res.data) {
                        const timer = setTimeout(() => {
                            dispatch(setIsShow(false));
                            dispatch(setMessageType(''));
                            dispatch(setMessage(''));                            
                            dispatch(setStep(step + 1))                            
                        }, 2000);
                        return () => clearTimeout(timer);
                    }
                })
            }
        } else if (step === 1) {
            if (resetEmail !== '' && otp.join('') !== '' && otp.join('').length >= 6) {
                await verifyOTP({email:resetEmail, otp: otp.join('')}).then(res => {
                    if(res.data) {
                        const timer = setTimeout(() => {
                            dispatch(setIsShow(false));
                            dispatch(setMessageType(''));
                            dispatch(setMessage(''));                            
                            dispatch(setStep(step + 1))                            
                        }, 2000);
                        return () => clearTimeout(timer);
                    }
                })
            }else{
                dispatch(setIsShow(true))
                dispatch(setMessageType(ERROR))
                dispatch(setMessage('OTP is required! insert your otp code in this field.'))
            }
        }else if(step === 2){
            if(validateChangePassword()){
                const resetObj = {
                    newPassword: userPass.password,
                    confirmPassword: userPass.confirmPassword,
                    email: resetEmail
                  }
                await resetPassword(resetObj).then(res => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            dispatch(setIsShow(false));
                            dispatch(setMessageType(''));
                            dispatch(setMessage(''));                            
                            navigate('/auth/login')
                            dispatch(setStep(0))
                            dispatch(setResetEmail(''))
                            dispatch(setOtp(Array(6).fill("")))
                        }, 2000);
                        return () => clearTimeout(timer);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            }
        }
    }

    const renderStepContent = () => {
        switch (step) {
            case 0:
                return <GetOTPByEmail error={emailError} handleChange={handleEmailChange} />;
            case 1:
                return <OTP otpMessageShow={false} />
            case 2:
                return <NewPassword userPass={userPass} handleChange={handleChange} errors={errors}/>
            default:
                return null
        }
    };
    useEffect(() => {
        if (success || error) {
        if(success){
            dispatch(setError(''))
        }
        dispatch(setIsShow(true))
        dispatch(setMessageType(success ? SUCCESS : ERROR))
        dispatch(setMessage(success ? message : error))        
    }
    }, [error, success])

    useEffect(() => {
        dispatch(setIsShow(false))
        dispatch(setMessageType(''))
        dispatch(setMessage(''))
    }, [location.pathname, dispatch])
    return (
        <div>
            <div className="container h-[777px] bg-white shadow-custom-box-shadow flex items-center mb-10">
                <div className="w-1/2 flex items-center justify-center">
                    <Image src={authVector} alt="Book Vector" />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-8/12">
                        <h2 className="text-primary text-[20px] font-medium mb-6">
                            {step === 1 ? "Verify OTP" : "Forgot Password"}
                        </h2>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            {renderStepContent()}
                            <div className="mt-4">
                            <MessageToastify isShow={isShow} type={messageType} value={msg} />
                            </div>
                            <Button type="submit" className="text-white font-medium text-sm w-full bg-primary py-2 mt-3">
                                {loading ? 'Loading...' : 'Continue'}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
