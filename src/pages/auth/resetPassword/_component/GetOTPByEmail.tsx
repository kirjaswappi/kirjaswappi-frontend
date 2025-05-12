import ControllerField from "../../../../components/shared/ControllerField";
export default function GetOTPByEmail() {
  return (
    <div>
      <ControllerField
        name="email"
        type="input"
        placeholder="Enter email"
        className="rounded-lg"
        showErrorMessage={false}
      />
      <p className="mt-4 text-sm text-[#808080] font-light">
        An OTP will be sent to the email address
      </p>
    </div>
  );
}
