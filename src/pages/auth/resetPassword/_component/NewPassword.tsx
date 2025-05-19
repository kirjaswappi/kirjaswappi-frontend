import ControllerFieldPassword from '../../../../components/shared/ControllerFieldPassword';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect } from 'react';
import MessageToastify from '../../../../components/shared/MessageToastify';
import { ERROR } from '../../../../constant/MESSAGETYPE';

export const NewPassword = () => {
  const {
    formState: { errors },
    clearErrors,
    control,
  } = useFormContext();

  // Watch password and confirmPassword fields for live validation
  const [password, confirmPassword] = useWatch({
    control,
    name: ['password', 'confirmPassword'],
  });

  // Clear confirmPassword error if passwords match
  useEffect(() => {
    if (password && confirmPassword && password === confirmPassword) {
      clearErrors('confirmPassword');
    }
  }, [password, confirmPassword, clearErrors]);

  // Get the first error to display
  const passwordError = errors.password?.message;
  const confirmPasswordError = errors.confirmPassword?.message;
  const firstFieldError = passwordError || confirmPasswordError;

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

      {firstFieldError && (
        <div className="mb-2 mt-2">
          <MessageToastify isShow={true} type={ERROR} value={firstFieldError?.toString()} />
        </div>
      )}
    </>
  );
};
