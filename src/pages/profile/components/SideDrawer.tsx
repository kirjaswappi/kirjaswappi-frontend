import { useDispatch } from "react-redux";
import leftArrowIcon from "../../../assets/leftArrow.png";
import Button from "../../../components/shared/Button";
import Image from "../../../components/shared/Image";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppSelector } from "../../../redux/hooks";

export default function SideDrawer({
    children,
    isShowSave = false,
    onSave,
    title = 'More Options'
}: {
    children: React.ReactNode;
    isShowSave?: boolean;
    onSave?: () => void;
    title?: string
}) {
    const dispatch = useDispatch();
    const { open } = useAppSelector((state) => state.open);
    return (
        <div
            className={`fixed top-0 right-0 w-full h-screen bg-light shadow-lg transition-transform duration-300 transform z-50 ${
                open ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div
                            className="cursor-pointer w-5"
                            onClick={() => dispatch(setOpen(false))}
                        >
                            <Image src={leftArrowIcon} alt="left" />
                        </div>
                        <h3 className="font-sofia text-base font-medium ">
                            {title} 
                        </h3>
                    </div>
                    {isShowSave && (
                        <Button
                            onClick={onSave}
                            className="text-primary underline font-sofia font-normal text-sm"
                        >
                            Save
                        </Button>
                    )}
                </div>
                {children}
            </div>
        </div>
    );
}
