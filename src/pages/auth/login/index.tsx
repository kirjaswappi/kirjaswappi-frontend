import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import bookDetailsBg from "../../../assets/bookdetailsbg.jpg";
import profileIcon from "../../../assets/profileIcon.png";
import Image from "../../../components/shared/Image";
import MessageToastify from "../../../components/shared/MessageToastify";
import { useLoginMutation } from "../../../redux/feature/auth/authApi";
import { setAuthMessage, setAuthSuccess, setError } from "../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { loginSchema } from "./Schema";
import ControlledInputField from "../../../components/shared/ControllerField";
import ControlledPasswordField from "../../../components/shared/ControllerFieldPassword";
import { ILoginForm } from "./interface";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const { error, message } = useAppSelector((state) => state.auth);

    
    const methods = useForm<ILoginForm>({
        resolver: yupResolver(loginSchema),
        mode: "onBlur",
        defaultValues: {
          email: "",
          password: "",
        },
    });

    const onSubmit = async (data: ILoginForm) => {
        try {
            await login(data).then(async (res) => {
                if ('data' in res) {
                    const timer = setTimeout(() => {
                        dispatch(setMessages({ type: "", isShow: false, message: "" }));
                        dispatch(setAuthMessage(''));
                        dispatch(setAuthSuccess(false));
                    }, 2000);
                    return () => clearTimeout(timer);
                }
            });
        } catch (error) {
            console.log("login error", error);
        }
    };

    useEffect(() => {
        dispatch(setMessages({type: '', isShow: false, message:''}));
        dispatch(setError(''));
    }, [navigate, dispatch]);

    // Get the first error message if any exists
    const errorMessage = 
        methods.formState.errors.email?.message || 
        methods.formState.errors.password?.message || 
        error;

    return (
        <div className="relative">
            <div className="absolute top-[18%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] rounded-full bg-white flex items-center justify-center">
                <Image src={profileIcon || "/placeholder.svg"} className=" " />
            </div>
            <div className="w-full h-[124px] z-0">
                <Image src={bookDetailsBg || "/placeholder.svg"} className="w-full h-full" />
            </div>
            <div className="container h-[calc(80vh-128px)]">
                <div>
                    <h2 className="text-black text-base font-poppins, font-normal text-center mt-24 mb-4">
                        Sign In
                    </h2>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmit)} className="flex flex-col">
                            <div>
                                <div>
                                    <ControlledInputField
                                        name="email"
                                        placeholder="E-mail"
                                        className="rounded-t-lg"
                                        
                                    />
                                </div>
                                <div>
                                    <ControlledPasswordField
                                        name="password"
                                        placeholder="Password"
                                        className="rounded-b-lg border-t-0"
                                        showErrorMessage={false}
                                    />
                                </div>
                            </div>
                            
                            {/* Show error message only if there's an error and not showing success message */}
                            {errorMessage && !message && (
                                <div className="mt-2">
                                    <MessageToastify
                                        isShow={true}
                                        type="ERROR"
                                        value={errorMessage}
                                    />
                                </div>
                            )}

                            {/* Show success message if exists */}
                            {message && (
                                <div className="mt-2">
                                    <MessageToastify
                                        isShow={true}
                                        type="SUCCESS"
                                        value={message}
                                    />
                                </div>
                            )}
                            
                            <div className="flex items-center justify-between my-4">
                                <div className="flex items-center gap-2 text-grayDark">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        className="cursor-pointer"
                                    />
                                    <label
                                        htmlFor="remember"
                                        className="cursor-pointer text-sm font-light font-poppins text-grayDark"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <Link
                                    to="/password/reset"
                                    className="text-black font-light text-sm underline font-poppins"
                                >
                                    Forgot Password ?
                                </Link>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm"
                            >
                                {isLoading ? "Loading..." : "Continue"}
                            </button>
                            <div className="flex items-center justify-center gap-1 mt-4">
                                <p className="text-black text-sm font-light font-poppins">
                                    Don't have an account?
                                </p>
                                <button
                                    className="text-black text-sm font-light font-poppins underline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        navigate("/auth/register");
                                    }}
                                >
                                    Create an account
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}