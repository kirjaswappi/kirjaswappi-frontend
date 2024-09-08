import { useState } from "react";
import authVector from "../../../assets/vectorAuth.png";
import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";


interface ILoginForm {
    email: string;
    oldPassword: string;
    newPassword: string;
    rePassword: string;
}
export default function ResetPassword() {
    const [errors, setErrors] = useState<{
        [key: string]: string | null | undefined;
    }>({});

    const [resetInfo, setResetInfo] = useState<ILoginForm>({
        email: "",
        oldPassword: "",
        newPassword: "",
        rePassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // login information store in state
        setResetInfo({ ...resetInfo, [e.target.name]: e.target.value });
        setErrors({
            ...errors,
            [e.target.id]: "",
        });
    };
    const validateForm = () => {
        let errors: {
            email: string | null | undefined;
            oldPassword: string | null | undefined;
            newPassword: string | null | undefined;
            rePassword: string | null | undefined;
        } = {
            email: undefined,
            oldPassword: undefined,
            newPassword: undefined,
            rePassword: undefined
        };
        // Regular expression to validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!resetInfo.email.trim()) {
            errors.email = "E-mail is required";
        } else if (!emailRegex.test(resetInfo.email)) {
            errors.email = "Please enter a valid email address";
        }
        if (!resetInfo.oldPassword) {
            errors.oldPassword = "Password is required";
        }
        if (!resetInfo.newPassword) {
            errors.newPassword = "New password is required";
        } else if (resetInfo.oldPassword.length < 0) {
            errors.newPassword = "New Password must be at least 6 characters long";
        }
        if (!resetInfo.rePassword) {
            errors.rePassword = "Confirm password is required";
        } else if (resetInfo.oldPassword.length < 0) {
            errors.rePassword = "Confirm password must be at least 6 characters long";
        }
        setErrors(errors);

        const hasErrors = Object.values(errors).some(
            (error) => error !== undefined
        );
        return !hasErrors;
    };

    console.log(errors)
    const handleSubmit = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        if (validateForm()) {
            try {

            } catch (error) {
                console.log("login error", error);
            }
        }
    };
    return (
        <div>
            <div className="container h-[777px] bg-white shadow-custom-box-shadow flex items-center mb-10">
                <div className="w-1/2 flex items-center justify-center">
                    <Image src={authVector} alt="Book Vector" />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                    <div className="w-8/12">
                        <h2 className="text-primary text-[20px] font-medium mb-14">
                            Reset Password
                        </h2>
                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-1"
                        >
                            <Input
                                type='text'
                                id="email"
                                value={resetInfo.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="E-mail"
                                error={errors.email}
                            />
                            <Input
                                type='text'
                                id="oldPassword"
                                value={resetInfo.oldPassword}
                                name="oldPassword"
                                onChange={handleChange}
                                placeholder="Old Password"
                                error={errors.oldPassword}
                            />
                            <Input
                                type='text'
                                id=""
                                value={resetInfo.newPassword}
                                name="newPassword"
                                onChange={handleChange}
                                placeholder="New Password"
                                error={errors.newPassword}
                            />
                            <Input
                                type='text'
                                id=""
                                value={resetInfo.rePassword}
                                name="rePassword"
                                onChange={handleChange}
                                placeholder="Confirm Password"
                                error={errors.rePassword}
                            />


                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md mt-3"
                            >
                                Reset Password
                            </button>
                            
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
