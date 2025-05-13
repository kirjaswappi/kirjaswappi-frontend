import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import OTPInput from "react-otp-input";
import { cn } from "../../utility/cn";
import MessageToastify from "./MessageToastify";
import { OTP_LENGTH } from "../../utility/constant";

interface ControllerFieldOTPProps {
  name: string;
  numInputs?: number;
  placeholder?: string;
  className?: string;
  showErrorMessage?: boolean;
}

const ControllerFieldOTP: React.FC<ControllerFieldOTPProps> = ({
  name,
  numInputs = OTP_LENGTH,
  placeholder = "-",
  className,
  showErrorMessage = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <OTPInput
            value={field.value || ""}
            onChange={field.onChange}
            numInputs={numInputs}
            shouldAutoFocus
            inputType="text"
            renderInput={(props) => (
              <input
                {...props}
                maxLength={1}
                inputMode="numeric"
                placeholder={placeholder}
                className={cn(
                  "max-w-10 h-10 mb-5 bg-[#E7E7E7] rounded-md text-center text-base font-normal focus:outline-none transition-all duration-150",
                  error && "border border-rose-500",
                  !error && "border border-[#D9D9D9]",
                  className
                )}
                style={{ backgroundColor: "#E7E7E7" }}
              />
            )}
            containerStyle={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          />
          {showErrorMessage && error?.message && (
            <MessageToastify isShow type="ERROR" value={error.message} />
          )}
        </div>
      )}
    />
  );
};

export default ControllerFieldOTP;
