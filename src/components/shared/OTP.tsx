import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { ERROR } from "../../constant/MESSAGETYPE";
import { setOtp } from "../../redux/feature/auth/authSlice";
import { setIsShow, setMessage, setMessageType } from "../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../redux/hooks";
import MessageToastify from "./MessageToastify";

export default function OTP() {
    const dispatch = useDispatch()
    const { otp } = useAppSelector(state => state.auth)
    const { messageType, message, isShow } = useAppSelector(state => state.notification)
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;
        const newOtp = [...otp];

        if (value.match(/^\d$/)) {
            newOtp[index] = value;
            dispatch(setOtp(newOtp))
            dispatch(setIsShow(false))
            dispatch(setMessage(''))
            dispatch(setMessageType(''))
            if (index < otp.length - 1) {
                inputs.current[index + 1]?.focus();
            }
        } else if (value === "") {
            newOtp[index] = "";
            dispatch(setOtp(newOtp))
            if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) {
                inputs.current[index - 1]?.focus();
            }
        }
    };

    return (
        <>
            <div className="flex gap-2 justify-between">
                {otp.map((_, index: number) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        ref={(el) => (inputs.current[index] = el)}
                        className={`max-w-10 h-10 border ${messageType === ERROR ? "border-rose-500" : "border-grayDark"
                            } rounded-md text-center text-base`}
                        placeholder="-"
                    />
                ))}

            </div>
            <div className="mt-2">
            <MessageToastify isShow={isShow} type={messageType} value={message} />
            </div>
            
            {/* {error !== '' && (
                <div className="text-rose-500 text-xs mt-2 pl-2">{error}</div>
            )}
            {success && (
                <div className="bg-green-100 text-green-600 text-xs mt-2  text-center py-3">OTP is verify successfully.</div>
            )} */}
        </>
    );
}
