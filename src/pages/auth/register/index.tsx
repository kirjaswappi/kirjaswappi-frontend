import { useState } from "react";
import { useNavigate } from "react-router-dom";
import authVector from "../../../assets/vectorAuth.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import OTP from "../../../components/shared/OTP";
import PasswordInput from "../../../components/shared/PasswordInput";
import { useDeleteUserMutation, useRegisterMutation, useVerifyEmailMutation } from "../../../redux/feature/auth/authApi";

interface ILoginForm {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {
    const navigate = useNavigate()
    const [otp, setOtp] = useState(Array(6).fill(""));
    const [otpError, setOtpError] = useState('')
    const [successMessage, setSuccessMessage] = useState(false)
    // const { userInformation } = useAppSelector(state=> state.auth)
    const [register] = useRegisterMutation()
    const [deleteUser] = useDeleteUserMutation()
    const [verifyEmail] = useVerifyEmailMutation()
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
                            setOpenOtp(true)
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
                await verifyEmail({ email: email, otp: otp }).then((res: any) => {
                    console.log('working...', res)
                    if (res?.error?.data?.error?.message === 'otpDoesNotMatch') {
                            setOtpError('OTP does not match.')
                        // const {}
                        // console.log("error->",res?.error)
                        // const error = res?.error?.data?.error
                        // if (error?.message === 'otpDoesNotMatch') {
                        //     setOtpError('OTP does not match.')
                        // }
                    } else {  
                        console.log('okk')                      
                        setOtpError('')
                        setSuccessMessage(true)
                        setUserInfo((prev) => ({
                            ...prev, firstName: "",
                            lastName: "",
                            email: "",
                            password: "",
                            confirmPassword: ""
                        }))
                        setTimeout(() => {
                            setSuccessMessage(false)
                            navigate('/auth/login')
                        }, 2000)
                    }
                }).catch(error => {
                    console.log(error)
                })
            } catch (error) {
                console.log("error", error)
            }
        } else {
            setOtpError('OTP is required! insert your otp code in this field.')
        }
    }

    const handleUserDelete = (id: string) => {
        try {
            deleteUser(id)
        } catch (error) {

        }
    }
    return (
        <div>
            <div className="container h-[777px] bg-white shadow-custom-box-shadow flex items-center mb-10">
                <div className="w-1/2 flex items-center justify-center">
                    <Image src={authVector} alt="Logo Vector" />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-8/12">
                        <button className="bg-rose-500 text-white px-3 py-2" onClick={() => handleUserDelete('66d05b6d703a891f1a08297e')}>DELETE</button>
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
                                <OTP otp={otp} setOtp={setOtp} error={otpError} success={successMessage} />

                                <button
                                    type="button"
                                    className="w-full px-4 py-2 font-medium text-white bg-primary rounded-md mt-5"
                                    onClick={() => handleOTPVerify(userInfo.email, otp?.join(''))}
                                >
                                    Verify OTP
                                </button>
                                <p className="my-5 text-sm">Please check your email to get OTP code</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
