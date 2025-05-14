import { useFormContext } from "react-hook-form";
import ControllerFieldPassword from "../../../../components/shared/ControllerFieldPassword";
import MessageToastify from "../../../../components/shared/MessageToastify";

export const NewPassword = () => {
  const {
    formState: { errors },
  } = useFormContext();

  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;
  const firstFieldError = passwordError || confirmPasswordError;

  return (
    <>
      <div className="mb-0">
        <ControllerFieldPassword
          name="password"
          placeholder="Enter new password"
          showErrorMessage={false}
          className="rounded-t-lg"
        />
      </div>
      <div className="mb-4">
        <ControllerFieldPassword
          name="confirmPassword"
          placeholder="Confirm new password"
          showErrorMessage={false}
          className="rounded-b-lg border-t-0"
        />
      </div>

      {firstFieldError && (
        <MessageToastify
          isShow={true}
          type="ERROR"
          value={firstFieldError?.toString()}
        />
      )}
    </>
  );
};
