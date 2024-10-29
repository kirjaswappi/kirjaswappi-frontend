import { useDispatch } from 'react-redux';
import { setError } from '../redux/feature/auth/authSlice';
import { setIsShow, setMessage, setMessageType } from '../redux/feature/notification/notificationSlice';


const useCleanState = () => {
    const dispatch = useDispatch();

    const clearNotificationsAndOtp = () => {
        dispatch(setIsShow(false));
        dispatch(setMessageType(""));
        dispatch(setMessage(""));
        dispatch(setError(''))
        // dispatch(setOtp(Array(6).fill("")));
    };

    return clearNotificationsAndOtp;
};

export default useCleanState;