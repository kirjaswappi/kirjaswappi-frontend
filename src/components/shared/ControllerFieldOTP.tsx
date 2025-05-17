import React, { useState } from "react";
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
  onOTPChange?: (otp: string) => void;
}

const ControllerFieldOTP: React.FC<ControllerFieldOTPProps> = ({
  name,
  numInputs = OTP_LENGTH,
  placeholder = "-",
  className,
  showErrorMessage = false,
  onOTPChange,
}) => {
  const { control, clearErrors, setError } = useFormContext();

  // Track whether user has started typing
  const [isTouched, setIsTouched] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <OTPInput
            value={field.value || ""}
            onChange={(value) => {
              // Set touched when user starts typing
              if (!isTouched) setIsTouched(true);

              field.onBlur();
              if (onOTPChange) onOTPChange(value);

              if (value.length === numInputs) {
                clearErrors(name); // Clear error when OTP is complete
              }

              // Only show error if user started typing and then cleared, but not on first interaction
              if (isTouched && value.length > 0 && value.length < numInputs) {
                // Don't set error while typing
              } else if (isTouched && value.length === 0) {
                setError(name, {
                  type: "manual",
                  message: "OTP is required",
                });
              }
            }}
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
