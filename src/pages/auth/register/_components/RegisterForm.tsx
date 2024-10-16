import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/Button";
import Input from "../../../../components/shared/Input";
import MessageToastify from "../../../../components/shared/MessageToastify";
import PasswordInput from "../../../../components/shared/PasswordInput";
import { ERROR, SUCCESS } from "../../../../constant/MESSAGETYPE";
import { useRegisterMutation } from "../../../../redux/feature/auth/authApi";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { setUserEmail } from "../../../../redux/feature/auth/authSlice";

interface IRegisterForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
export default function RegisterForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [register] = useRegisterMutation();
    const { loading, error, message } = useAppSelector((state) => state.auth);
    const { step } = useAppSelector((state) => state.step);
    const {
        isShow,
        messageType,
        message: msg,
    } = useAppSelector((state) => state.notification);
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
        const { name, value } = e.target;
        setUserInfo({ ...userInfo, [name]: value });
        setErrors({ ...errors, [name]: "" });
        validateInput(e);
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
    const handleSubmit = async (e: any) => {
        e.preventDefault();
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
                                dispatch(
                                    setMessages({
                                        type: "",
                                        isShow: false,
                                        message: "",
                                    })
                                );
                                dispatch(setUserEmail(userInfo.email))
                                dispatch(setStep(step + 1));

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

    const fieldError = Object.keys(errors).map((key) => errors[key]);
    const filteredError = fieldError.filter((msg) => msg);
    // console.log("filteredError", filteredError)
    // console.log("api error", error);
    const checkingFieldErrorOrApiError = () => {
        if (message && message !== null) {
            console.log("error", filteredError[0]);
            return {
                msg: message,
                type: SUCCESS,
                isShow: true,
            };
        }
        if (filteredError.length > 0) {
            console.log("error", filteredError[0]);
            return {
                msg: filteredError[0],
                type: "FIELD_ERROR",
                isShow: true,
            };
        } else if (error && error !== null) {
            return {
                msg: error,
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
        const checkingField = checkingFieldErrorOrApiError();
        if (checkingField.isShow && checkingField.msg !== null) {
            dispatch(
                setMessages({
                    type: checkingField.type,
                    isShow: checkingField.isShow,
                    message: checkingField.msg,
                })
            );
        } else {
            dispatch(setMessages({ type: "", isShow: false, message: "" }));
        }
    }, [filteredError]);
    return (
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
    );
}
