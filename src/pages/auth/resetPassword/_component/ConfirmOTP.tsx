import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import ControllerFieldOTP from '../../../../components/shared/ControllerFieldOTP';
import MessageToastify from '../../../../components/shared/MessageToastify';
import ResendOTPButton from '../../../../components/shared/ResendOTPButton';
import { ERROR, SUCCESS } from '../../../../constant/MESSAGETYPE';
import { useAppSelector } from '../../../../redux/hooks';

export default function ConfirmOTP({
  handleOTPChange,
  handleSendOTP,
}: {
  handleOTPChange: (value: string) => void;
  handleSendOTP: () => Promise<void>;
}) {
  const {
    formState: { errors, isSubmitted },
    clearErrors,
    setValue,
    watch,
  } = useFormContext();
  console.log('GET OTP->>>>> ', watch('email'));
  // Get notification state
  const { messageType, message, isShow } = useAppSelector((state) => state.notification);

  // Immediately show errors when field has errors or form is submitted
  const showError = isSubmitted || !!errors.otp?.message;

  // Determine which message to show (if any)
  const errorMessage = showError && errors.otp?.message ? errors.otp.message.toString() : null;
  const successMessage = !errorMessage && isShow && messageType === SUCCESS ? message : null;

  // Timer state (5 minutes = 300 seconds)
  const [timeLeft, setTimeLeft] = useState(300);

  // Countdown effect
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Handle "Send Again" click - clear errors and reset OTP field
  const handleSendAgainClick = async () => {
    // Clear any existing OTP validation errors
    clearErrors('otp');
    // Reset OTP input field
    setValue('otp', '');
    // Reset timer
    setTimeLeft(300);
    // Call the parent component's handleSendOTP function
    await handleSendOTP();
  };

  return (
    <div className="bg-white absolute bottom-0 left-0 w-full rounded-t-3xl transition-all duration-500 ease-in-out transform translate-y-0 h-[80vh]">
      <div className="text-center py-6 border-b border-[#E6E6E6]">
        <h1>Confirm your Email</h1>
      </div>

      <div className="px-6">
        <p className="text-sm font-light text-grayDark font-poppins text-center pt-8 pb-10">
          Enter the code we&apos;ve sent to your Email
        </p>

        <ControllerFieldOTP
          name="otp"
          onOTPChange={handleOTPChange}
          showErrorMessage={false} // We'll handle error display ourselves
        />

        {/* Display validation messages */}
        {errorMessage && (
          <div className="mt-4">
            <MessageToastify isShow={true} type={ERROR} value={errorMessage.toString()} />
          </div>
        )}

        {successMessage && (
          <div className="mt-4">
            <MessageToastify isShow={true} type={SUCCESS} value={successMessage} />
          </div>
        )}

        <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
          <p>Haven&apos;t received a code?</p>
          <ResendOTPButton onClick={handleSendAgainClick}>Send again</ResendOTPButton>
        </div>
        <div className="text-center mt-4 gap-2 text-grayDark text-sm font-poppins">
          Time Remaining {formatTime(timeLeft)}
        </div>
        <button
          type="submit"
          className="w-full h-[48px] px-4 font-poppins text-white bg-primary rounded-2xl text-sm mt-10"
        >
          OTP Verify
        </button>
      </div>
    </div>
  );
}
