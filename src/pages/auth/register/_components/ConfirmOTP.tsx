import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/Button";
import OTP from "../../../../components/shared/OTP";
import { ERROR, SUCCESS } from "../../../../constant/MESSAGETYPE";
import { useVerifyEmailMutation } from "../../../../redux/feature/auth/authApi";
import { setOtp } from "../../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../../redux/hooks";

export default function ConfirmOTP() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [verifyEmail] = useVerifyEmailMutation();
    const { userEmail, loading, otp, success, error, message } = useAppSelector((state) => state.auth);
    const handleOTPVerify = async (email: string, otp: string) => {
        if (email !== "" && otp !== "" && otp.length >= 6) {
            try {
                await verifyEmail({ email: email, otp: otp }).then((res) => {
                    if (!res.error) {
                        const timer = setTimeout(() => {
                            dispatch(
                                setMessages({
                                    type: "",
                                    isShow: false,
                                    message: "",
                                })
                            );
                            dispatch(setOtp(Array(6).fill("")));
                            navigate("/auth/login");
                            dispatch(setStep(0))
                        }, 3000);
                        return () => clearTimeout(timer);
                    }
                });
            } catch (error) {
                console.log("error", error);
            }
        } else {
            dispatch(
                setMessages({
                    type: ERROR,
                    isShow: true,
                    message:
                        "OTP is required! insert your otp code in this field.",
                })
            );
        }
    };

    useEffect(() => {
        if (!!message || error) {
            dispatch(setMessages({
                type: success ? SUCCESS : ERROR,
                isShow: true,
                message: success ? message : error
            }))
        }
    }, [error, message]);
    return (
        <div
            className={`bg-white absolute bottom-0 left-0 w-full  rounded-t-3xl transition-all duration-500 ease-in-out transform translate-y-0 h-[80vh]`}
        >
            <div className="text-center py-6 border-b border-[#E6E6E6]">
                <h1>Confirm you Email</h1>
            </div>
            <div className="px-6">
                <p className="text-sm font-light font-poppins text-center pt-8 pb-10">
                    Enter the code we’ve sent to your Email
                </p>
                <OTP />

                <Button
                    type="button"
                    onClick={() => handleOTPVerify(userEmail, otp.join(""))}
                    className="text-white font-medium text-sm w-full bg-primary py-2 mt-3 rounded-2xl"
                >
                    {loading ? "Loading..." : "OTP Verify"}
                </Button>
                <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
                    <p>Haven’t received a code? </p>{" "}
                    <Button className="underline text-sm">Sent again</Button>
                </div>
            </div>
        </div>
    );
}
