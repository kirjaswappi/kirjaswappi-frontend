import { useFormContext } from "react-hook-form";
import MessageToastify from "../../../../components/shared/MessageToastify";
import Button from "../../../../components/shared/Button";
import ControllerFieldOTP from "../../../../components/shared/ControllerFieldOTP";
import { useEffect } from "react";

export default function ConfirmOTP() {
  const {
    formState: { errors },
    clearErrors,
    watch,
  } = useFormContext();

  const otpValue = watch("otp");

  useEffect(() => {
    if (otpValue && errors.otp) {
      clearErrors("otp");
    }
  }, [otpValue, errors.otp, clearErrors]);

  return (
    <div className="bg-white absolute bottom-0 left-0 w-full rounded-t-3xl transition-all duration-500 ease-in-out transform translate-y-0 h-[80vh]">
      <div className="text-center py-6 border-b border-[#E6E6E6]">
        <h1>Confirm your Email</h1>
      </div>
      <div className="px-6">
        <p className="text-sm font-light text-grayDark font-poppins text-center pt-8 pb-10">
          Enter the code we've sent to your Email
        </p>

        <ControllerFieldOTP
          name="otp"
          showErrorMessage={false} // We'll handle the error message separately
        />

        {errors.otp && (
          <MessageToastify
            isShow
            type="ERROR"
            value={typeof errors.otp.message === "string" ? errors.otp.message : undefined}
          />
        )}

        <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
          <p>Haven't received a code?</p>
          <Button className="underline text-sm">Send again</Button>
        </div>
      </div>
    </div>
  );
}
