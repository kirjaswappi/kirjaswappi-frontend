import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { setOtp } from "../../redux/feature/auth/authSlice";
import { useAppSelector } from "../../redux/hooks";
import MessageToastify from "./MessageToastify";

export default function OTP({
  otpMessageShow = true,
  error,
}: {
  otpMessageShow?: boolean;
  error?: string;
}) {
  const dispatch = useDispatch();
  const { otp } = useAppSelector((state) => state.auth);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const newOtp = [...otp];
    if (value.match(/^\d$/)) {
      newOtp[index] = value;
      dispatch(setOtp(newOtp));
      if (index < 5) inputs.current[index + 1]?.focus();
    } else if (value === "") {
      newOtp[index] = "";
      dispatch(setOtp(newOtp));
      if (index > 0) inputs.current[index - 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text").trim();
    if (pasteData.length === 6 && /^\d+$/.test(pasteData)) {
      dispatch(setOtp(pasteData.split("")));
      inputs.current[5]?.focus();
    }
  };

  return (
    <div>
      <div className="flex gap-2 justify-between">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <input
              key={i}
              type="text"
              maxLength={1}
              value={otp[i]}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              onPaste={handlePaste}
              ref={(el) => (inputs.current[i] = el)}
              className={`max-w-10 h-10 mb-5 bg-[#E7E7E7] ${
                error ? "border border-rose-500 " : ""
              } rounded-md text-center text-base`}
              placeholder="-"
            />
          ))}
      </div>
      {otpMessageShow && error && (
        <MessageToastify isShow type="ERROR" value={error} />
      )}
    </div>
  );
}
