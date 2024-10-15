import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { ERROR } from "../../constant/MESSAGETYPE";
import { setAuthMessage, setError } from "../../redux/feature/auth/authSlice";
import { setIsShow, setMessage, setMessageType } from "../../redux/feature/notification/notificationSlice";

interface IMessageToastify {
    type: string | 'SUCCESS' | 'ERROR' | 'WARNING' | 'FIELD_ERROR' | '';
    value: string | null | undefined;
    isShow: boolean
}

export default function MessageToastify({ type, value, isShow = false }: IMessageToastify) {
    
    const dispatch = useDispatch()
    const getColorClass = () => {
        switch (type) {
            case 'SUCCESS':
                return 'bg-green-100 text-green-600 ';
            case 'ERROR':
                return 'bg-rose-100 text-rose-600';
            case 'FIELD_ERROR':
            return 'bg-rose-100 text-rose-600';
            case 'WARNING':
                return 'bg-yellow-100 text-yellow-600';
            default:
                return '';
        }
    };
    
    useEffect(() => {
        if(type !== 'FIELD_ERROR' ){
            const timer = setTimeout(() => {
                dispatch(setIsShow(false));
                dispatch(setMessageType(''));
                dispatch(setMessage(''));
                dispatch(setError(''))
                dispatch(setAuthMessage(''))
            }, type !== ERROR ? 2000 : 10000);
        
            return () => clearTimeout(timer);
        }
    }, [isShow, type])

    return (
        <div className={`p-2 rounded-lg font-sofia  ${isShow ? 'block' : 'hidden'} ${getColorClass()} text-center text-sm`} role="alert" aria-live="assertive">{value}</div>
    )
}
