import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { PiEyeClosed } from 'react-icons/pi';
import Input from '../../../../components/shared/Input';

export default function NewPassword() {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form
            // onSubmit={handleSubmit}
            className="flex flex-col gap-4"
        >
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    // value={userInfo.password}
                    name="password"
                    // onChange={handleChange}
                    placeholder="Password"
                    // error={errors.password}
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
            <div className="relative">
                <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    // value={userInfo.password}
                    name="password"
                    // onChange={handleChange}
                    placeholder="New password"
                    // error={errors.password}
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
            {/* <MessageToastify isShow={isShow} type={messageType} value={message} /> */}
            
            <button
                type="submit"
                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md "
            >
                {'isLoading' ? "Loading..." : "Sign In"}
            </button>
            
        </form>
    )
}
