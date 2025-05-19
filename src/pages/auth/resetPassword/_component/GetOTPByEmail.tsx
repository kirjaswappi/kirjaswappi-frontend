import { useFormContext } from 'react-hook-form';
import { useAppSelector } from '../../../../redux/hooks';
import MessageToastify from '../../../../components/shared/MessageToastify';
import ControllerField from '../../../../components/shared/ControllerField';
import { ERROR } from '../../../../constant/MESSAGETYPE';

export default function GetOTPByEmail() {
  const {
    formState: { errors },
  } = useFormContext();

  const { messageType, message, isShow } = useAppSelector((state) => state.notification);

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
          value={typeof errors.email.message === 'string' ? errors.email.message : undefined}
        />
      )}

      {isShow && message && messageType === ERROR && message.includes('does not exist') && (
        <div className="mt-2 mb-4">
          <MessageToastify isShow={true} type={ERROR} value={message} />
        </div>
      )}

      <p className="mt-4 text-sm text-[#808080] font-light">
        An OTP will be sent to the email address
      </p>
    </div>
  );
}
