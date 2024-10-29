import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../redux/feature/auth/authSlice";
import { setMessages } from "../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../redux/hooks";
import MessageToastify from "./MessageToastify";

export default function OTP({ otpMessageShow = true }: { otpMessageShow?: boolean }) {
    const dispatch = useDispatch()
    const { otp } = useAppSelector(state => state.auth)
    const { messageType, message, isShow } = useAppSelector(state => state.notification)
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
console.log({message, isShow, messageType})
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;
        const newOtp = [...otp];
        if (value.match(/^\d$/)) {
            newOtp[index] = value;
            dispatch(setOtp(newOtp))
            dispatch(setMessages({ type: "", isShow: false, message: "" }))
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
            if (index > 0) inputs.current[index - 1]?.focus();
            dispatch(
                setMessages({
                    type: 'FIELD_ERROR',
                    isShow: true,
                    message:
                        "OTP is required! insert your otp code in this field.",
                })
            );
        }

    };
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData('text').trim();
        if (pasteData.length === otp.length && /^\d+$/.test(pasteData)) {
            const newOtp = pasteData.split('');
            dispatch(setOtp(newOtp));
            inputs.current[otp.length - 1]?.focus();
            dispatch(setMessages({ type: "", isShow: false, message: "" }))
        } else {
            console.log('not work')
            dispatch(setMessages({ type: "", isShow: false, message: "" }))
        }
    };

    return (
        <div>
            <div className="flex gap-2 justify-between">
                {otp.map((_, index: number) => (
                    <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index]}
                        onChange={(e) => handleChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={handlePaste}
                        ref={(el) => (inputs.current[index] = el)}
                        className={`max-w-10 h-10  bg-[#E7E7E7] ${messageType === 'FIELD_ERROR' ? "border border-rose-500" : ""
                            } rounded-md text-center text-base`}
                        placeholder="-"
                    />
                ))}

            </div>
            {otpMessageShow && isShow && <div className="mt-2"><MessageToastify isShow={isShow} type={messageType} value={message} /></div>}
        </div>
    );
}
