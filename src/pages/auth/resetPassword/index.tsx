import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { OTP_LENGTH } from '../../../utility/constant';
import { ResetPasswordValidation } from './Schema';
import { ERROR, SUCCESS } from '../../../constant/MESSAGETYPE';
import {
  useLazySentOTPQuery,
  useLazyVerifyOTPQuery,
  useResetPasswordMutation,
} from '../../../redux/feature/auth/authApi';
import { setOtp } from '../../../redux/feature/auth/authSlice';
import { setMessages } from '../../../redux/feature/notification/notificationSlice';
import { setStep } from '../../../redux/feature/step/stepSlice';
import { useAppSelector } from '../../../redux/hooks';
import Button from '../../../components/shared/Button';
import Image from '../../../components/shared/Image';
import MessageToastify from '../../../components/shared/MessageToastify';
import GetOTPByEmail from './_component/GetOTPByEmail';
import ConfirmOTP from './_component/ConfirmOTP';
import { NewPassword } from './_component/NewPassword';
import leftArrowIcon from '../../../assets/leftArrow.png';
import * as yup from 'yup';

// INTERFACE FOR RESET PASSWORD FORM FIELDS
interface IResetPasswordForm {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

// FUNCTION TO GET ERROR MESSAGE FROM API RESPONSE
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getErrorMessage = (error: any, email?: string) => {
  // Try to extract the most specific error message possible
  let message;

  if (error?.data?.error?.message) {
    message = error.data.error.message;
  } else if (error?.data?.message) {
    message = error.data.message;
  } else if (typeof error?.data === 'string') {
    message = error.data;
  } else if (error?.data?.error) {
    message =
      typeof error.data.error === 'string' ? error.data.error : JSON.stringify(error.data.error);
  } else if (error?.error) {
    message = error.error;
  } else {
    message = 'An error occurred';
  }

  return message.includes('not exist') ? `User ${email} does not exist.` : message;
};

// MAIN COMPONENT FOR RESET PASSWORD PAGE
export default function ResetPassword() {
  // INITIALIZE DISPATCH AND NAVIGATE HOOKS
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // INITIALIZE API HOOKS
  const [sentOTP] = useLazySentOTPQuery();
  const [verifyOTP] = useLazyVerifyOTPQuery();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  // GET STATE FROM REDUX STORE
  const { step } = useAppSelector((state) => state.step);
  const { otp } = useAppSelector((state) => state.auth);
  const { messageType, message: msg, isShow } = useAppSelector((state) => state.notification);
  // LOCAL STATE FOR USER EMAIL AND RESET SUCCESS
  const [userEmail, setUserEmail] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);
  const [previousStep, setPreviousStep] = useState(0);

  // INITIALIZE REACT HOOK FORM WITH VALIDATION
  const methods = useForm<IResetPasswordForm>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(ResetPasswordValidation[step] as yup.ObjectSchema<any>),
    mode: 'onTouched',
    defaultValues: {
      email: userEmail || '',
      otp: otp.join(''),
      password: '',
      confirmPassword: '',
    },
  });

  const { trigger, setValue, getValues } = methods;

  // Preserve email value between steps
  useEffect(() => {
    if (userEmail) setValue('email', userEmail);
  }, [step, userEmail, setValue]);

  // Update OTP field when OTP state changes
  useEffect(() => setValue('otp', otp.join('')), [otp, setValue]);

  // Handle step navigation
  useEffect(() => {
    if (previousStep === 2 && step === 1) {
      dispatch(setOtp(Array(OTP_LENGTH).fill('')));
      setValue('otp', '');
      methods.clearErrors('otp');
      dispatch(setMessages({ message: '', type: '', isShow: false }));
    }
    setPreviousStep(step);
  }, [step, previousStep, dispatch, setValue, methods]);

  // Redirect after successful password reset
  useEffect(() => {
    if (resetSuccess) {
      setTimeout(() => {
        dispatch(setStep(0));
        dispatch(setOtp(Array(OTP_LENGTH).fill('')));
        navigate('/auth/login');
      }, 1500);
    }
  }, [resetSuccess, dispatch, navigate]);

  const showSuccess = (message: string, callback?: () => void) => {
    dispatch(setMessages({ type: SUCCESS, isShow: true, message }));
    setTimeout(() => {
      dispatch(setMessages({ type: '', isShow: false, message: '' }));
      callback?.();
    }, 800);
  };

  const handleBack = () => (step === 0 ? navigate(-1) : dispatch(setStep(step - 1)));

  const handleNext = async () => (await trigger()) && dispatch(setStep(step + 1));

  const handleOTPChange = (value: string) => {
    dispatch(setOtp(value.split('')));
    setValue('otp', value);
    if (methods.formState.errors.otp) methods.clearErrors('otp');
  };

  const handleSendOTP = useCallback(async () => {
    const email = getValues('email');
    if (!email) return;

    dispatch(setMessages({ message: '', type: '', isShow: false }));
    dispatch(setOtp(Array(OTP_LENGTH).fill('')));
    setValue('otp', '');
    methods.clearErrors('otp');

    try {
      const res = await sentOTP({ email });
      if (res.data) {
        dispatch(setMessages({ type: SUCCESS, isShow: true, message: 'OTP sent successfully!' }));
        setTimeout(() => {
          dispatch(setMessages({ message: '', type: '', isShow: false }));
        }, 800);
      } else {
        dispatch(
          setMessages({
            type: ERROR,
            isShow: true,
            message: getErrorMessage(res.error, email),
          }),
        );
      }
    } catch (error) {
      dispatch(setMessages({ type: ERROR, isShow: true, message: 'An error occurred' }));
    }
  }, [dispatch, getValues, sentOTP, setValue, methods]);

  const handlePasswordError = (data: IResetPasswordForm, errorMessage: string) => {
    if (errorMessage.includes('same as the old')) {
      methods.setError('password', {
        type: 'manual',
        message: 'New password cannot be the same as the current password.',
      });
      methods.setFocus('password');

      const originalPassword = data.password;
      const subscription = methods.watch((formValues, { name }) => {
        if (name === 'password' && formValues.password !== originalPassword) {
          methods.clearErrors('password');
          subscription.unsubscribe();
        }
      });
    } else if (
      errorMessage.toLowerCase().includes('password') ||
      errorMessage.toLowerCase().includes('confirm')
    ) {
      methods.setError('password', { type: 'manual', message: errorMessage });
      methods.setFocus('password');
    } else {
      dispatch(setMessages({ type: ERROR, isShow: true, message: errorMessage }));
    }
  };

  const handleSubmit = async (data: IResetPasswordForm) => {
    dispatch(setMessages({ message: '', type: '', isShow: false }));

    try {
      // Step 0: Send OTP to email
      if (step === 0) {
        setUserEmail(data.email);
        const res = await sentOTP({ email: data.email });
        res.data
          ? showSuccess('OTP sent successfully!', handleNext)
          : dispatch(
              setMessages({
                type: ERROR,
                isShow: true,
                message: getErrorMessage(res.error, data.email),
              }),
            );
      }
      // Step 1: Verify OTP
      else if (step === 1) {
        const res = await verifyOTP({ email: data.email, otp: data.otp });
        if (res.error) {
          methods.setError('otp', {
            type: 'manual',
            message: getErrorMessage(res.error),
          });
          methods.setFocus('otp');
        } else {
          dispatch(
            setMessages({
              type: SUCCESS,
              isShow: true,
              message: 'Email verified successfully!',
            }),
          );
          setTimeout(() => {
            dispatch(setMessages({ type: '', isShow: false, message: '' }));
            dispatch(setStep(step + 1));
          }, 1500);
        }
      }
      // Step 2: Reset Password
      else if (step === 2) {
        const res = await resetPassword({
          email: data.email,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        });

        if (res.error) {
          handlePasswordError(data, getErrorMessage(res.error));
        } else if (res.data) {
          setResetSuccess(true);
          showSuccess('Password reset successfully!');
        }
      }
    } catch (error) {
      dispatch(setMessages({ type: ERROR, isShow: true, message: 'An error occurred' }));
    }
  };

  // COMPONENTS FOR EACH STEP
  const stepComponents = [
    <GetOTPByEmail key="get-otp-by-email" />,
    <ConfirmOTP
      key="confirm-otp"
      handleOTPChange={handleOTPChange}
      handleSendOTP={handleSendOTP}
    />,
    <NewPassword key="new-password" />,
  ];

  // RENDER RESET PASSWORD PAGE
  return (
    <div className="container h-svh relative">
      {/* HEADER WITH BACK BUTTON AND TITLE */}
      <div className="pt-4 pb-6 flex items-center gap-2">
        <button
          type="button"
          className="cursor-pointer w-5"
          onClick={handleBack}
          aria-label="Go back"
        >
          <Image src={leftArrowIcon} alt="back" />
        </button>
        <h3 className="font-poppins text-base font-medium">Forget Password</h3>
      </div>

      {/* FORM PROVIDER FOR REACT HOOK FORM */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit)}
          className={
            step === 1 ? 'bg-white absolute bottom-0 left-0 w-full h-[80vh] rounded-t-3xl' : ''
          }
        >
          {/* STEP 1 HEADER */}
          {step === 1 && (
            <div className="text-center py-6 border-b border-[#E6E6E6]">
              <h1>CONFIRM YOUR EMAIL</h1>
            </div>
          )}

          <div className={step === 1 ? 'px-6' : ''}>
            {/* RENDER STEP COMPONENT */}
            {stepComponents[step] || <div>INVALID STEP: {step}</div>}

            {/* SHOW MESSAGE TOAST IF NEEDED - Only for non-OTP and non-password steps */}
            {isShow && msg && step !== 1 && step !== 2 && (
              <div className="mb-2 mt-2 px-6">
                <MessageToastify isShow={true} type={messageType} value={msg} />
              </div>
            )}

            {/* SHOW SUBMIT BUTTON IF NOT ON OTP STEP */}
            {step !== 1 && (
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-[48px] px-4 font-normal text-white bg-primary rounded-2xl text-sm mt-4"
                style={{ fontFamily: 'Poppins' }}
              >
                {isLoading ? 'LOADING...' : step === 2 ? 'Confirm' : 'Continue'}
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
