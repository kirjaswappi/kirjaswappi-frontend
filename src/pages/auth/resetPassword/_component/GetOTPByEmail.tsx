import { useFormContext } from "react-hook-form";
import MessageToastify from "../../../../components/shared/MessageToastify";
import ControllerField from "../../../../components/shared/ControllerField";

export default function GetOTPByEmail() {
  const {
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <ControllerField
        name="email"
        type="input"
        placeholder="Enter email"
        className="rounded-lg mb-2"
        showErrorMessage={false}
      />
      {errors.email && (
        <MessageToastify
          isShow
          type="ERROR"
          value={typeof errors.email.message === "string" ? errors.email.message : undefined}
        />
      )}
      <p className="mt-4 text-sm text-[#808080] font-light">
        An OTP will be sent to the email address
      </p>
    </div>
  );
}
