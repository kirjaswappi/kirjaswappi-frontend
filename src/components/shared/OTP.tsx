import { useRef, useState } from "react";

export default function OTP() {
    const [otp, setOtp] = useState(Array(6).fill(""));
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
        <div className="flex gap-2 justify-between">
            {otp.map((_, index) => (
                <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputs.current[index] = el)}
                    className="max-w-10 h-10 border border-grayDark rounded-md text-center text-base"
                    placeholder="-"
                />
            ))}
        </div>
    );
}
