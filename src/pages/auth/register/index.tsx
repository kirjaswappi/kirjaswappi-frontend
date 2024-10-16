import leftArrowIcon from "../../../assets/leftArrow.png";
import Image from "../../../components/shared/Image";
import { useAppSelector } from "../../../redux/hooks";
import ConfirmOTP from "./_components/ConfirmOTP";
import RegisterForm from "./_components/RegisterForm";


export default function Register() {
    const { step } = useAppSelector((state) => state.step);
    
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
