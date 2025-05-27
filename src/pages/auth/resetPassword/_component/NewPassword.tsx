import ControllerFieldPassword from '../../../../components/shared/ControllerFieldPassword';
import { useFormContext, useWatch } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import MessageToastify from '../../../../components/shared/MessageToastify';
import { ERROR } from '../../../../constant/MESSAGETYPE';
import { useAppSelector } from '../../../../redux/hooks';

export const NewPassword = () => {
  const {
    formState: { errors },
    clearErrors,
    control,
  } = useFormContext();

  const [displayedError, setDisplayedError] = useState<string | null>(null);
  const lastErrorPassword = useRef<string | null>(null);
  const { messageType, message, isShow } = useAppSelector((state) => state.notification);
  const [password, confirmPassword] = useWatch({ control, name: ['password', 'confirmPassword'] });

  useEffect(() => {
    // Determine which error to display (priority order)
    const errorToDisplay = errors.password?.message?.toString().includes('same as the')
      ? ((lastErrorPassword.current = password), errors.password.message.toString())
      : errors.confirmPassword?.message
        ? errors.confirmPassword.message.toString()
        : errors.password?.message
          ? errors.password.message.toString()
          : isShow && messageType === ERROR && message
            ? message
            : null;

    setDisplayedError(errorToDisplay);

    // Clear confirmPassword error if passwords match
    if (password && confirmPassword && password === confirmPassword) {
      clearErrors('confirmPassword');
    }

    // Clear "same as old password" error when password changes
    if (
      password &&
      lastErrorPassword.current &&
      password !== lastErrorPassword.current &&
      errors.password?.message?.toString().includes('same as the')
    ) {
      clearErrors('password');
      lastErrorPassword.current = null;
    }
  }, [
    errors.password,
    errors.confirmPassword,
    isShow,
    messageType,
    message,
    password,
    confirmPassword,
    clearErrors,
  ]);

  return (
    <>
      <div className="mb-0">
        <ControllerFieldPassword
          name="password"
          placeholder="Enter new password"
          className="rounded-t-lg"
          showErrorMessage={false}
        />
      </div>
      <div className="mb-4">
        <ControllerFieldPassword
          name="confirmPassword"
          placeholder="Confirm new password"
          className="rounded-b-lg border-t-0"
          showErrorMessage={false}
        />
      </div>
      {displayedError && <MessageToastify isShow={true} type={ERROR} value={displayedError} />}
    </>
  );
};
