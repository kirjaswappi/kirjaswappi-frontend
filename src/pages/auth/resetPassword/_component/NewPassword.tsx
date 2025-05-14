// components/NewPassword/NewPassword.tsx
import ControllerFieldPassword from "../../../../components/shared/ControllerFieldPassword";

export const NewPassword = () => {
  return (
    <>
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">New Password</h4>
        <ControllerFieldPassword
          name="password"
          placeholder="Enter new password"
          showErrorMessage={true}
        />
      </div>
      <div className="mb-4">
        <h4 className="font-medium text-sm mb-2">Confirm Password</h4>
        <ControllerFieldPassword
          name="confirmPassword"
          placeholder="Confirm new password"
          showErrorMessage={true}
        />
      </div>
    </>
  );
};
