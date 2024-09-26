import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authVector from "../../../assets/vectorAuth.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import MessageToastify from "../../../components/shared/MessageToastify";
import OTP from "../../../components/shared/OTP";
import PasswordInput from "../../../components/shared/PasswordInput";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import { useRegisterMutation, useVerifyEmailMutation } from "../../../redux/feature/auth/authApi";
import { setOtp } from "../../../redux/feature/auth/authSlice";
import { setIsShow, setMessage, setMessageType } from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";

interface ILoginForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { isShow, message: msg, messageType } = useAppSelector(state => state.notification)
    const { otp, loading, error, success, message } = useAppSelector(state => state.auth)
    const [register] = useRegisterMutation()
    const [verifyEmail] = useVerifyEmailMutation()
    const [isOpenOtp, setOpenOtp] = useState(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [userInfo, setUserInfo] = useState<ILoginForm>({
        firstName: "",
        lastName: "",
        email: "rahat.official.info9016@gmail.com",
        password: "",
        confirmPassword: "",
    });
console.log(otp)


    // handle Change function to take sign-up information
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // login information store in state
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

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
                userInfo.password &&
                e.target.value !== userInfo.password
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword:
                        "Password and confirm password do not match!",
                }));
            } else if (
                e.target.name === "password" &&
                userInfo.confirmPassword &&
                userInfo.confirmPassword !== e.target.value
            ) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword:
                        "Password and confirm password do not match!",
                }));
            } else {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    confirmPassword: "",
                }));
            }
        }
    };
    const validateForm = () => {
        let errors: {
            firstName: string | null | undefined;
            lastName: string | null | undefined;
            email: string | null | undefined;
            password: string | null | undefined;
            confirmPassword: string | null | undefined;
        } = {
            firstName: undefined,
            lastName: undefined,
            email: undefined,
            password: undefined,
            confirmPassword: undefined,
        };
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userInfo.email.trim()) {
            errors.email = "E-mail is required";
        } else if (!emailRegex.test(userInfo.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!userInfo.firstName) {
            errors.firstName = "First name is required";
        }
        if (!userInfo.lastName) {
            errors.lastName = "Last name is required";
        }
        if (!userInfo.password) {
            errors.password = "Password is required";
        } else if (userInfo.password.length < 0) {
            errors.password = "Password must be at least 6 characters long";
        }
        if (!userInfo.confirmPassword) {
            errors.confirmPassword = "Confirm password is required";
        } else if (userInfo.password.length < 0) {
            errors.confirmPassword =
                "Confirm password must be at least 6 characters long";
        }
        setErrors(errors);

        const hasErrors = Object.values(errors).some(
            (error) => error !== undefined
        );
        return !hasErrors;
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        // validateForm()
        if (validateForm()) {
            try {
                await register(userInfo)
                    .then(async (res) => {
                        if (res?.data) {
                            const timer = setTimeout(() => {
                                dispatch(setIsShow(false));
                                dispatch(setMessageType(''));
                                dispatch(setMessage(''));
                                setOpenOtp(true)
                            }, 2000);
                            return () => clearTimeout(timer);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } catch (error) {
                console.log("login error", error);
            }
        }
    };
    const handleOTPVerify = async (email: string, otp: string) => {
        if (email !== '' && otp !== '' && otp.length >= 6) {
            try {
                await verifyEmail({ email: email, otp: otp }).then(res => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            dispatch(setIsShow(false));
                            dispatch(setMessageType(''));
                            dispatch(setMessage(''));
                            navigate('/auth/login')
                            dispatch(setOtp(Array(6).fill("")))
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                })
            } catch (error) {
                console.log("error", error)
            }
        } else {
            dispatch(setIsShow(true))
            dispatch(setMessageType(ERROR))
            dispatch(setMessage('OTP is required! insert your otp code in this field.'))
        }
    }

    useEffect(() => {
        if (success || error) {
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
                    <Image src={authVector} alt="Logo Vector" />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-8/12">
                        <h2 className="text-primary text-[20px] font-medium mb-6">
                            {!isOpenOtp ? "Sign up" : "Verify OTP"}
                        </h2>
                        {!isOpenOtp ? (
                            <form
                                onSubmit={handleSubmit}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex gap-3">
                                    <Input
                                        type="text"
                                        id="firstName"
                                        // value={userInfo.email}
                                        name="firstName"
                                        onChange={handleChange}
                                        placeholder="First Name"
                                        error={errors.firstName}
                                    />
                                    <Input
                                        type="text"
                                        id="lastName"
                                        // value={userInfo.email}
                                        name="lastName"
                                        onChange={handleChange}
                                        placeholder="Last Name"
                                        error={errors.lastName}
                                    />
                                </div>
                                <div>
                                    <Input
                                        type="email"
                                        id="email"
                                        // value={userInfo.email}
                                        name="email"
                                        onChange={handleChange}
                                        placeholder="E-mail"
                                        error={errors.email}
                                    />
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    error={errors.password}
                                />
                                <PasswordInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={userInfo.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    error={errors.confirmPassword}
                                />
                                <MessageToastify isShow={isShow} type={messageType} value={msg} />
                                <Button
                                    type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md "
                                >
                                    {loading ? 'Loading...' : 'Sign up'}
                                </Button>
                                <div className=" flex items-center gap-3 mt-6">
                                    <p className="text-grayDark text-sm font-normal">
                                        do you have an account yet ?
                                    </p>
                                    <button
                                        className="text-primary font-medium text-sm"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            navigate("/auth/login");
                                        }}
                                    >
                                        Sign in
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div>
                                <OTP />
                                <Button type="button" onClick={() => handleOTPVerify(userInfo?.email, otp.join(''))} className="text-white font-medium text-sm w-full bg-primary py-2 mt-3">
                                    {loading ? 'Loading...' : 'OTP Verify'}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
