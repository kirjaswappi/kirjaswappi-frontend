import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import MessageToastify from "../../../components/shared/MessageToastify";
import OTP from "../../../components/shared/OTP";
import PasswordInput from "../../../components/shared/PasswordInput";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import {
    useRegisterMutation,
    useVerifyEmailMutation,
} from "../../../redux/feature/auth/authApi";
import { setError, setOtp } from "../../../redux/feature/auth/authSlice";
import {
    setIsShow,
    setMessage,
    setMessageType,
} from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";
interface ILoginForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        isShow,
        message: msg,
        messageType,
    } = useAppSelector((state) => state.notification);
    const { otp, loading, error, success, message } = useAppSelector(
        (state) => state.auth
    );
    const [register] = useRegisterMutation();
    const [verifyEmail] = useVerifyEmailMutation();
    const [isOpenOtp, setOpenOtp] = useState(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [userInfo, setUserInfo] = useState<ILoginForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

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
            errors.email = "This is required";
        } else if (!emailRegex.test(userInfo.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!userInfo.firstName) {
            errors.firstName = "This is required";
        }
        if (!userInfo.lastName) {
            errors.lastName = "This is required";
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
// console.log(!userInfo.password !== !userInfo.confirmPassword)
        // if(!userInfo.password !== !userInfo.confirmPassword){
        //     console.log(!userInfo.password !== !userInfo.confirmPassword)
        //     errors.confirmPassword = 'Password and confirm password do not match!'
        // }

        console.log(errors)
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
                                dispatch(setMessageType(""));
                                dispatch(setMessage(""));
                                setOpenOtp(true);
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
        if (email !== "" && otp !== "" && otp.length >= 6) {
            try {
                await verifyEmail({ email: email, otp: otp }).then((res) => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            dispatch(setIsShow(false));
                            dispatch(setMessageType(""));
                            dispatch(setMessage(""));
                            navigate("/auth/login");
                            dispatch(setOtp(Array(6).fill("")));
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        } else {
            dispatch(setIsShow(true));
            dispatch(setMessageType(ERROR));
            dispatch(
                setMessage(
                    "OTP is required! insert your otp code in this field."
                )
            );
        }
    };


    const fieldError = Object.keys(errors).map((key) => errors[key]);
    const filterError = useCallback(
        () => fieldError.filter((error) => error),
        [fieldError]
    );
    const errorTypes = filterError()[0] ? filterError()[0] : error
    const IsItFieldError = filterError().length !== 0 ? 'FIELD_ERROR' : ERROR

    useEffect(() => {
        if (success || errorTypes) {
            dispatch(setIsShow(true));
            dispatch(setMessageType(success ? SUCCESS : IsItFieldError));
            dispatch(setMessage(success ? message : errorTypes));
            dispatch(setError(''))
        }
    }, [errorTypes, success]);

    useEffect(() => {
        dispatch(setIsShow(false));
        dispatch(setMessageType(""));
        dispatch(setMessage(""));
        dispatch(setError(''))
        dispatch(setOtp(Array(6).fill("")))
        
    }, [location.pathname, dispatch]);
    
    return (
        <div>
            <div className="container h-svh relative">
                <div className="pt-4 pb-6 flex items-center gap-4">
                    <Image src={leftArrowIcon} alt="left" />
                    <h3 className="font-sofia text-base font-medium ">
                        log in or Signup
                    </h3>
                </div>
                {!isOpenOtp ? (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col"
                    >
                        <div>
                            <div>
                                <Input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    onChange={handleChange}
                                    placeholder="First Name"
                                    error={errors.firstName}
                                    className="rounded-t-lg"
                                    // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none placeholder:text-sm placeholder:text-grayDark"
                                />
                            </div>

                            <div>
                                <Input
                                    type="text"
                                    id="lastName"
                                    // value={userInfo.email}
                                    name="lastName"
                                    onChange={handleChange}
                                    placeholder="Last Name"
                                    error={errors.lastName}
                                    className="border-t-0"
                                    // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none placeholder:text-sm"
                                />
                            </div>
                            <div >
                                <Input
                                    type="email"
                                    id="email"
                                    // value={userInfo.email}
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="E-mail"
                                    error={errors.email}
                                    className="border-t-0"
                                    // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    value={userInfo.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    error={errors.password}
                                    className="border-t-0"
                                    // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none placeholder:text-sm"
                                />
                            </div>
                            <div>
                                <PasswordInput
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    value={userInfo.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm Password"
                                    error={errors.confirmPassword}
                                    className="rounded-b-lg border-t-0"
                                    // className="border-none rounded-none mt-0 bg-white pl-6 shadow-none placeholder:text-sm"
                                />
                            </div>
                        </div>

                        {isShow && (
                            <div className="mt-2">
                                <MessageToastify
                                    isShow={isShow}
                                    type={messageType}
                                    value={msg}
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2 text-grayDark my-4">
                            <input
                                type="checkbox"
                                name=""
                                id="remember"
                                className="cursor-pointer"
                            />
                            <label
                                htmlFor="remember"
                                className="cursor-pointer text-sm font-light font-sofia text-grayDark"
                            >
                                Remember me
                            </label>
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm"
                        >
                            {loading ? "Loading..." : "Continue"}
                        </Button>
                        <div className=" flex items-center justify-center gap-1 mt-4">
                            <p className="text-black text-sm font-light font-sofia">
                                Already have an account?
                            </p>
                            <button
                                className="text-black text-sm font-light font-sofia underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/auth/login");
                                }}
                            >
                                log In
                            </button>
                        </div>
                    </form>
                ) : (
                    <div
                        className={`bg-white absolute bottom-0 left-0 w-full  rounded-t-3xl transition-all duration-500 ease-in-out transform ${
                            isOpenOtp
                                ? "translate-y-0 h-[80vh]"
                                : "translate-y-full h-0"
                        }`}
                    >
                        <div className="text-center py-6 border-b border-[#E6E6E6]">
                            <h1>Confirm you Email</h1>
                        </div>
                        <div className="px-6">
                            <p className="text-sm font-light font-sofia text-center pt-8 pb-10">
                                Enter the code we’ve sent to your Email
                            </p>
                            <OTP />
                            <Button
                                type="button"
                                onClick={() =>
                                    handleOTPVerify(
                                        userInfo?.email,
                                        otp.join("")
                                    )
                                }
                                className="text-white font-medium text-sm w-full bg-primary py-2 mt-3 rounded-2xl"
                            >
                                {loading ? "Loading..." : "OTP Verify"}
                            </Button>
                            <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-sofia">
                                <p>Haven’t received a code? </p>{" "}
                                <Button className="underline text-sm">
                                    Sent again
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
