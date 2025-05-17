import { useAppSelector } from "../../../../redux/hooks";
import MessageToastify from "../../../../components/shared/MessageToastify";
import Button from "../../../../components/shared/Button";
import ControllerFieldOTP from "../../../../components/shared/ControllerFieldOTP";
import { useFormContext } from "react-hook-form";
import { SUCCESS } from "../../../../constant/MESSAGETYPE";

export default function ConfirmOTP({
  handleOTPChange,
}: {
  handleOTPChange: (value: string) => void;
}) {
  const {
    formState: { errors, isSubmitted },
  } = useFormContext();

  // Get notification state
  const { messageType, message, isShow } = useAppSelector(
    (state) => state.notification
  );

  // Immediately show errors when field has errors or form is submitted
  const showError = isSubmitted || !!errors.otp?.message;

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
          onOTPChange={handleOTPChange}
          showErrorMessage={showError} // Pass our showError condition
        />

        {/* Display success message */}
        {isShow && messageType === SUCCESS && (
          <div className="mt-4">
            <MessageToastify isShow={true} type={SUCCESS} value={message} />
          </div>
        )}

        <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
          <p>Haven't received a code?</p>
          <Button type="button" className="underline text-sm">
            Send again
          </Button>
        </div>

        <Button
          type="submit"
          className="w-full h-[48px] px-4 font-poppins text-white bg-primary rounded-2xl text-sm mt-10"
        >
          OTP Verify
        </Button>
      </div>
    </div>
  );
}
