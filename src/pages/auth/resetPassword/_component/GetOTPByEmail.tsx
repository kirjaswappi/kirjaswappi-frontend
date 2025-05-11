import Input from "../../../../components/shared/Input";
import type { IGetOTPByEmailProps } from "../interface";

export default function GetOTPByEmail({
  register,
  errors,
}: IGetOTPByEmailProps) {
  return (
    <div>
      <Input
        type="email"
        id="email"
        {...register("email")}
        placeholder="Enter email"
        error={errors.email?.message}
        className="rounded-lg"
      />
      <p className="mt-4 text-sm text-[#808080] font-light">
        An OTP will be sent to the email address
      </p>
    </div>
  );
}
