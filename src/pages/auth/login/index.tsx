import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import authVector from "../../../assets/vectorAuth.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
// import InputToastify from "../../../components/shared/InputToastify";
import { useDispatch } from "react-redux";
import MessageToastify from "../../../components/shared/MessageToastify";
import { ERROR, SUCCESS } from "../../../constant/MESSAGETYPE";
import { useLoginMutation } from "../../../redux/feature/auth/authApi";
import { setIsShow, setMessage, setMessageType } from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";

interface ILoginForm {
    email: string;
    password: string;
}

export default function Login() {
    const { error, success } = useAppSelector(state => state.auth)
    const { isShow, message, messageType } = useAppSelector((state) => state.notification)
    // const { isShow, messageType, message,  setIsShow, setMessageType, setMessage } = useNotification()
    // console.log(isShow, messageType, message,)
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [userInfo, setUserInfo] = useState<ILoginForm>({
        email: "rahat.official.info9016@gmail.com",
        password: "",
    });

    const navigate = useNavigate();

    // handle Change function to take login information
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // login information store in state
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value });

        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };
    const validateForm = () => {
        let errors: {
            email: string | null | undefined;
            password: string | null | undefined;
        } = {
            email: undefined,
            password: undefined,
        };
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!userInfo.email.trim()) {
            errors.email = "E-mail is required";
        } else if (!emailRegex.test(userInfo.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!userInfo.password) {
            errors.password = "Password is required";
        } else if (userInfo.password.length < 0) {
            errors.password = "Password must be at least 6 characters long";
        }
        setErrors(errors);

        const hasErrors = Object.values(errors).some(
            (error) => error !== undefined
        );
        return !hasErrors;
    };

    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await login(userInfo)
            } catch (error) {
                console.log("login error", error);
            }
        }
    };

    useEffect(() => {
        if (success || error) {
        dispatch(setIsShow(true))
        dispatch(setMessageType(success ? SUCCESS : ERROR))
        dispatch(setMessage(success ? 'Login Successfully Done.' : error))        
    }
    }, [error, success])
    return (
        <div>
            <div className="container h-[777px] bg-white shadow-custom-box-shadow flex items-center mb-10">
                <div className="w-1/2 flex items-center justify-center">
                    <Image src={authVector} alt="Logo Vector" />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-8/12">
                        <h2 className="text-primary text-[20px] font-medium mb-14">
                            Sign In
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <Input
                                    type="text"
                                    id="email"
                                    value={userInfo.email}
                                    name="email"
                                    onChange={handleChange}
                                    placeholder="E-mail"
                                    error={errors.email}
                                />
                            </div>
                            <div className="relative">
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={userInfo.password}
                                    name="password"
                                    onChange={handleChange}
                                    placeholder="Password"
                                    error={errors.password}
                                />
                                <div
                                    className="absolute right-4 top-[18px] flex items-center cursor-pointer"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <PiEyeClosed className=" text-grayDark" />
                                    ) : (
                                        <AiOutlineEye className=" text-grayDark" />
                                    )}
                                </div>
                            </div>

                            <MessageToastify isShow={isShow} type={messageType} value={message} />
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2 text-grayDark">
                                    <input
                                        type="checkbox"
                                        name=""
                                        id="remember"
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-normal"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/password/reset"
                                    className="text-primary font-semibold text-sm hover:underline"
                                >
                                    Forgot Password ?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md "
                            >
                                {isLoading ? "Loading..." : "Sign In"}
                            </button>
                            <div className=" flex items-center gap-3 mt-6">
                                <p className="text-grayDark text-sm font-normal">
                                    Don’t have an account yet ?
                                </p>
                                <button
                                    className="text-primary font-medium text-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/auth/register");
                                    }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
