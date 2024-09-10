import React, { SetStateAction, useRef } from "react";

export default function OTP({ otp, setOtp, error, success }: { otp: string[]; setOtp: React.Dispatch<SetStateAction<any[]>>; error: string; success: boolean }) {

    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        index: number
    ) => {
        const { value } = e.target;
        const newOtp = [...otp];

        if (value.match(/^\d$/)) {
            newOtp[index] = value;
            setOtp(newOtp);

            if (index < otp.length - 1) {
                inputs.current[index + 1]?.focus();
            }
        } else if (value === "") {
            newOtp[index] = "";
            setOtp(newOtp);

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
                        className={`max-w-10 h-10 border ${
                            error ? "border-rose-500" : "border-grayDark"
                        } rounded-md text-center text-base`}
                        placeholder="-"
                    />
                ))}
            </div>
            {error !== '' && (
                <div className="text-rose-500 text-xs mt-2 pl-2">{error}</div>
            )}
            {success && (
                <div className="bg-green-100 text-green-600 text-xs mt-2  text-center py-3">OTP is verify successfully.</div>
            )}
        </>
    );
}
