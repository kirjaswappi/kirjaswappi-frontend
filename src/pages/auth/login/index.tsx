import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { PiEyeClosed } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import bookDetailsBg from "../../../assets/bookdetailsbg.jpg";
import profileIcon from "../../../assets/profileIcon.png";
import rightMenu from "../../../assets/rightmenu.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
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

    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation();
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});
    const [userInfo, setUserInfo] = useState<ILoginForm>({
        email: "",
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


    useEffect(() => {
        dispatch(setIsShow(false))
        dispatch(setMessageType(''))
        dispatch(setMessage(''))
    }, [location.pathname, dispatch])
    return (
        <div className="relative">
            <div className="absolute left-0 top-4 w-full flex justify-between px-4">
                <div className="flex items-center gap-4">
                    <h2>My profile</h2>
                </div>
                <div className="flex items-center gap-4">
                    <Image src={rightMenu} alt="icon" />
                </div>
            </div>
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full  bg-white flex items-center justify-center">
                <Image src={profileIcon} className=" " />
            </div>
            <div className="w-full h-[124px] z-0">
                <Image src={bookDetailsBg} className="w-full h-full" />
            </div>
            <div className="container h-[calc(80vh-128px)]">
                <div>
                    <h2 className="text-black text-base font-sofia, font-normal text-center mt-24 mb-4">
                        Sign In
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col"
                    >
                        <div className="rounded-2xl overflow-hidden border border-gray bg-white" >
                        <div className="border-b border-gray">
                            <Input
                                type="text"
                                id="email"
                                value={userInfo.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="E-mail"
                                error={errors.email}
                                className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
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
                                className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
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
                        </div>

                        {isShow && <div className="mt-2">
                        <MessageToastify isShow={isShow} type={messageType} value={message} />
                        </div>}
                        <div className="flex items-center justify-between my-4">
                            <div className="flex items-center gap-2 text-grayDark">
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
                            <Link
                                to="/password/reset"
                                className="text-black font-light text-sm underline font-sofia"
                            >
                                Forgot Password ?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm"
                        >
                            {isLoading ? "Loading..." : "Continue"}
                        </button>
                        <div className=" flex items-center justify-center gap-1 mt-4">
                            <p className="text-black text-sm font-light font-sofia">
                            Don’t have an account? 
                            </p>
                            <button
                            className="text-black text-sm font-light font-sofia underline"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/auth/register");
                                }}
                            >
                                Create an account
                            </button>
                        </div>
                    </form>
                </div> 
            </div>
        </div>
    );
}
