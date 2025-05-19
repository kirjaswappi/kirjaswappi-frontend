import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import leftArrowIcon from '../../../assets/leftArrow.png';
import Image from '../../../components/shared/Image';
import { setMessages } from '../../../redux/feature/notification/notificationSlice';
import { setStep } from '../../../redux/feature/step/stepSlice';
import { useAppSelector } from '../../../redux/hooks';
import ConfirmOTP from './_components/ConfirmOTP';
import RegisterForm from './_components/RegisterForm';
import { setError } from '../../../redux/feature/auth/authSlice';

export default function Register() {
  const { step } = useAppSelector((state) => state.step);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const renderStepsContent = () => {
    switch (step) {
      case 0:
        return <RegisterForm />;
      case 1:
        return <ConfirmOTP />;
      default:
        return null;
    }
  };

  useEffect(() => {
    dispatch(setMessages({ type: '', isShow: false, message: '' }));
    dispatch(setError(''));
  }, [location.pathname, dispatch]);
  return (
    <div>
      <div className="container h-svh relative">
        <div className="pt-4 pb-6 flex items-center gap-4">
          <button
            className="w-5 border-none bg-transparent p-0"
            onClick={() => {
              if (step === 0) navigate('/auth/login');
              else if (step === 1) {
                dispatch(setStep(step - 1));
                dispatch(setError(''));
              }
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                if (step === 0) navigate('/auth/login');
                else if (step === 1) {
                  dispatch(setStep(step - 1));
                  dispatch(setError(''));
                }
              }
            }}
          >
            <Image src={leftArrowIcon} alt="left" />
          </button>
          <h3 className="font-poppins text-base font-medium ">log in or Signup</h3>
        </div>
        {renderStepsContent()}
      </div>
    </div>
  );
}
