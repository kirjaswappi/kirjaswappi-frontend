import ControllerFieldPassword from "../../../../components/shared/ControllerFieldPassword";


export const NewPassword = () => {
  // const {
  //   formState: { errors },
  // } = useFormContext();

  // const passwordError = errors.password?.message;
  // const confirmPasswordError = errors.confirmPassword?.message;
  // const firstFieldError = passwordError || confirmPasswordError;

  return (
    <>
      <div className="mb-0">
        <ControllerFieldPassword
          name="password"
          placeholder="Enter new password"
          className="rounded-t-lg"
        />
      </div>
      <div className="mb-4">
        <ControllerFieldPassword
          name="confirmPassword"
          placeholder="Confirm new password"
          className="rounded-b-lg border-t-0"
        />
      </div>

      {/* {firstFieldError && (
        <MessageToastify
          isShow={true}
          type="ERROR"
          value={firstFieldError?.toString()}
        />
      )} */}
    </>
  );
};
