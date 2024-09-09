import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authVector from "../../../assets/vectorAuth.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import OTP from "../../../components/shared/OTP";
import PasswordInput from "../../../components/shared/PasswordInput";

interface ILoginForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
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

    const navigate = useNavigate();

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
        setOpenOtp(true);
        // if (validateForm()) {
        //     try {
        //         await login(userInfo)
        //             .then((res) => {
        //                 if(res.error){

        //                 }
        //                 if (!res?.error) {
        //                     setUserInfo((prev) => ({
        //                         ...prev,
        //                         email: "",
        //                         password: "",
        //                     }));
        //                 }
        //             })
        //             .catch((error) => {
        //                 console.log(error);
        //             });
        //     } catch (error) {
        //         console.log("login error", error);
        //     }
        // }
    };
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
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md "
                                >
                                    Sign up
                                </button>
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
                                <p className="my-5 text-sm">Please check your email to get OTP code</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
