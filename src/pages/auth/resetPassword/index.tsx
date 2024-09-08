import Image from "../../../components/shared/Image";
import Input from "../../../components/shared/Input";
import authVector from "../../../assets/vectorAuth.png"

export default function ResetPassword() {
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
                            // onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <div className="relative">
                                <Input
                                type="password"
                                    // type={showPassword ? "text" : "password"}
                                    // id="password"
                                    // value={userInfo.password}
                                    // name="password"
                                    // onChange={handleChange}
                                    // placeholder="Password"
                                    // error={errors.password}
                                />
                                <div
                                    className="absolute right-4 top-[18px] flex items-center cursor-pointer"
                                    // onClick={() =>
                                    //     setShowPassword(!showPassword)
                                    // }
                                >
                                    {/* {showPassword ? (
                                        <PiEyeClosed className=" text-grayDark" />
                                    ) : (
                                        <AiOutlineEye className=" text-grayDark" />
                                    )} */}
                                </div>
                            </div>
                           
                            <button
                                type="submit"
                                className="w-full px-4 py-2 font-bold text-white bg-primary rounded-md "
                            >
                                Sign In
                            </button>
                            <div className=" flex items-center gap-3 mt-6">
                                <p className="text-grayDark text-sm font-normal">
                                    Don’t have an account yet ?
                                </p>
                                <button
                                    className="text-primary font-medium text-sm"
                                    onClick={(e) => {
                                        e.preventDefault();
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
  )
}
