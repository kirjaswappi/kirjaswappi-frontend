import PasswordInput from '../../../../components/shared/PasswordInput';



{/* <div className="rounded-2xl overflow-hidden border border-gray bg-white">
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
                        </div> */}
export default function NewPassword({ userPass, handleChange, errors }:any) {
    return (
        <div
            // onSubmit={handleSubmit}
            className="flex flex-col rounded-2xl overflow-hidden border border-gray bg-white"
        >
            <div className="border-b border-gray">
            <PasswordInput
                id="password"
                name="password"
                value={userPass.password}
                onChange={handleChange}
                placeholder="Password"
                error={errors.password}
                className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
            />
            </div>
            
            <PasswordInput
                id="confirmPassword"
                name="confirmPassword"
                value={userPass.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                error={errors.confirmPassword}
                className="border-none rounded-none mt-0 bg-white pl-6 shadow-none"
            />
        </div>
    )
}
