import { useEffect } from "react";
import { useDispatch } from "react-redux";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Image from "../../../components/shared/Image";
import { setMessages } from "../../../redux/feature/notification/notificationSlice";
import { useAppSelector } from "../../../redux/hooks";
import ConfirmOTP from "./_components/ConfirmOTP";
import RegisterForm from "./_components/RegisterForm";


export default function Register() {
    const { step } = useAppSelector((state) => state.step);
    const dispatch = useDispatch();
    const renderStepsContent = () => {
        switch (step) {
            case 0:
                return (
                    <RegisterForm/>
                );
            case 1:
                return <ConfirmOTP/>
            default:
                return null;
        }
    }


    useEffect(() => {
        dispatch(setMessages({type: '', isShow: false, message:''}))
    }, [location.pathname, dispatch]);
    return (
        <div>
            <div className="container h-svh relative">
                <div className="pt-4 pb-6 flex items-center gap-4">
                    <Image src={leftArrowIcon} alt="left" />
                    <h3 className="font-sofia text-base font-medium ">
                        log in or Signup
                    </h3>
                </div>
                {renderStepsContent()}                    
            </div>
        </div>
    );
}
