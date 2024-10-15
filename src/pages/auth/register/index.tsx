import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import MessageToastify from "../../../components/shared/MessageToastify";
import OTP from "../../../components/shared/OTP";
import PasswordInput from "../../../components/shared/PasswordInput";
import { ERROR } from "../../../constant/MESSAGETYPE";
import {
    useRegisterMutation,
    useVerifyEmailMutation,
} from "../../../redux/feature/auth/authApi";
import { setError, setOtp } from "../../../redux/feature/auth/authSlice";
import {
    setMessages
} from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";
interface IRegisterForm {
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
        message: msg, // It will initial in Toastify
        messageType,
    } = useAppSelector((state) => state.notification);
    const { otp, loading, error, message } = useAppSelector(
        (state) => state.auth
    );
    const [register] = useRegisterMutation();
    const [verifyEmail] = useVerifyEmailMutation();
    const [isOpenOtp, setOpenOtp] = useState(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [userInfo, setUserInfo] = useState<IRegisterForm>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    // handle Change function to take sign-up information
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // login information store in state
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
        setErrors({
            ...errors,
            [name]: "",
        });
        validateInput(e);
        dispatch(setError(""));
    };

    const validateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setErrors((prev: any) => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "firstName":
                    if (!value) {
                        stateObj[name] = "Please enter first name.";
                    }
                    break;
                case "lastName":
                    if (!value) {
                        stateObj[name] = "Please enter last name.";
                    }
                    break;
                case "email":
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!value) {
                        stateObj[name] = "Please enter email.";
                    } else if (!emailRegex.test(value)) {
                        stateObj[name] = "Please Enter your valid email";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (
                        userInfo.confirmPassword &&
                        value !== userInfo.confirmPassword
                    ) {
                        stateObj["confirmPassword"] =
                            "Password and Confirm Password do not match.";
                    } else {
                        stateObj["confirmPassword"] = userInfo.confirmPassword
                            ? ""
                            : errors.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please enter Confirm Password.";
                    } else if (
                        userInfo.password &&
                        value !== userInfo.password
                    ) {
                        stateObj[name] =
                            "Password and Confirm Password do not match.";
                    }
                    break;

                default:
                    break;
            }
            return stateObj;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Run validation for all fields on submit
        let allValid = true;

        Object.keys(userInfo).forEach((key: any) => {
            const event = {
                target: {
                    name: key,
                    value: userInfo[key],
                },
            };

            validateInput(event);

            if (!userInfo[key]) {
                allValid = false;
            }
        });
        if (allValid) {
            try {
                await register(userInfo)
                    .then(async (res) => {
                        if (res?.data) {
                            const timer = setTimeout(() => {
                                dispatch(setMessages({ type: "", isShow: false, message: "" }));
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
        console.log("click");
        if (email !== "" && otp !== "" && otp.length >= 6) {
            try {
                await verifyEmail({ email: email, otp: otp }).then((res) => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            dispatch(
                                setMessages({
                                    type: "",
                                    isShow: false,
                                    message: "",
                                })
                            );
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
            dispatch(
                setMessages({
                    type: ERROR,
                    isShow: true,
                    message:
                        "OTP is required! insert your otp code in this field.",
                })
            );
        }
    };
console.log(isShow)
    const fieldError = Object.keys(errors).map((key) => errors[key]);
    const filteredError = fieldError.filter((msg) => msg);
    console.log(filteredError)

    useEffect(() => {
        if(filteredError.length > 0){
            dispatch(setMessages({type: 'FIELD_ERROR', isShow: true, message : filteredError[0] }))
        }else{
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
        }
        
    }, [filteredError, error])
    // const checkingFieldErrorOrApiError = () => {
    //     if (message) {
    //         console.log("message->", message);
    //         return {
    //             msg: message,
    //             type: SUCCESS,
    //             isShow: true,
    //         };
    //     } else if (filteredError.length > 0) {
    //         return {
    //             msg: filteredError[0],
    //             type: "FIELD_ERROR",
    //             isShow: true,
    //         };
    //     } else if (error !== "") {
    //         console.log('error', error)
    //         return {
    //             msg: error,
    //             type: ERROR,
    //             isShow: true,
    //         };
    //     }
    //     return {
    //         isShow: false,
    //         msg: "",
    //         type: "",
    //     };
    // };
    // useEffect(() => {
    //     const  checkingField = checkingFieldErrorOrApiError();
    //     if (checkingField.isShow && checkingField.msg !== null) {
    //         console.log('we')
    //         dispatch(
    //             setMessages({
    //                 type: checkingField.type,
    //                 isShow: checkingField.isShow,
    //                 message: checkingField.msg,
    //             })
    //         );
    //     } 
    //     // else {
    //     //     dispatch(setMessages({ type: "", isShow: false, message: "" }));
    //     // }
    // }, [dispatch, message, error, filteredError]);

    // useEffect(() => {
    //     dispatch(setMessages({ type: "", isShow: false, message: "" }));
    //     dispatch(setError(""));
    //     dispatch(setOtp(Array(6).fill("")));
    // }, [location.pathname, dispatch]);

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
                    <form onSubmit={handleSubmit} className="flex flex-col">
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
                                    onBlur={validateInput}
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
                                    className="border-t-0 focus:border-t"
                                    onBlur={validateInput}
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
                                    className="border-t-0 focus:border-t"
                                    onBlur={validateInput}
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
                                    className="border-t-0 focus:border-t"
                                    onBlur={validateInput}
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
                                    className="rounded-b-lg border-t-0 focus:border-t"
                                    onBlur={validateInput}
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
