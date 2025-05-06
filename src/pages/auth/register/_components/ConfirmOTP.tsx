import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../../../../components/shared/Button";
import OTP from "../../../../components/shared/OTP";
import { ERROR, SUCCESS } from "../../../../constant/MESSAGETYPE";
import { useVerifyEmailMutation } from "../../../../redux/feature/auth/authApi";
import { setOtp } from "../../../../redux/feature/auth/authSlice";
import { setMessages } from "../../../../redux/feature/notification/notificationSlice";
import { setStep } from "../../../../redux/feature/step/stepSlice";
import { useAppSelector } from "../../../../redux/hooks";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpSchema } from "../Schema";
import { OTPSchemaType } from "../interface";

export default function ConfirmOTP() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [verifyEmail] = useVerifyEmailMutation();
  const { userEmail, otp } = useAppSelector((state) => state.auth);
  const [hadFullOtp, setHadFullOtp] = useState(false);

  const {
    handleSubmit,
    setValue,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<OTPSchemaType>({
    resolver: yupResolver(otpSchema),
    defaultValues: { otp: otp.join("") },
  });

  useEffect(() => {
    const otpString = otp.join("");
    setValue("otp", otpString);
    if (otpString.length === 6) setHadFullOtp(true);
    if (hadFullOtp && !otpString)
      setError("otp", { message: "OTP is required" });
  }, [otp, setValue, setError, hadFullOtp]);

  const onSubmit = async (data: OTPSchemaType) => {
    const result = await verifyEmail({ email: userEmail, otp: data.otp });
    if ("error" in result)
      return setError("otp", { message: "The OTP you entered is incorrect" });

    dispatch(
      setMessages({
        type: SUCCESS,
        isShow: true,
        message: "Email verified successfully!",
      })
    );
    setTimeout(() => {
      dispatch(setOtp(Array(6).fill("")));
      navigate("/auth/login");
      dispatch(setStep(0));
    }, 3000);
  };

  return (
    <div className="bg-white absolute bottom-0 left-0 w-full rounded-t-3xl transition-all duration-500 ease-in-out transform translate-y-0 h-[80vh]">
      <div className="text-center py-6 border-b border-[#E6E6E6]">
        <h1>Confirm your Email</h1>
      </div>
      <div className="px-6">
        <p className="text-sm font-light font-poppins text-center pt-8 pb-10">
          Enter the code we've sent to your Email
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <OTP otpMessageShow={true} error={errors.otp?.message} />
          <Button
            type="submit"
            disabled={isSubmitting}
            className="text-white font-medium text-sm w-full bg-primary py-2 mt-3 rounded-2xl"
          >
            {isSubmitting ? "Loading..." : "OTP Verify"}
          </Button>
        </form>

        <div className="flex items-center justify-center mt-10 gap-2 text-grayDark text-sm font-poppins">
          <p>Haven't received a code?</p>
          <Button className="underline text-sm">Send again</Button>
        </div>
      </div>
    </div>
  );
}
