import { useDispatch } from "react-redux";
import Language from "../../../assets/language.png";
import leftArrowIcon from "../../../assets/leftArrow.png";
import logoutIcon from "../../../assets/logout.png";
import privacy from "../../../assets/privacy.png";
import setting from "../../../assets/settings.png";
import Image from "../../../components/shared/Image";
import { logout } from "../../../redux/feature/auth/authSlice";

const profileSetting = [
    {
        name: "Settings",
        icon: setting,
        location: "",
    },
    {
        name: "Language",
        icon: Language,
        location: "",
    },
    {
        name: "privacy",
        icon: privacy,
        location: "",
    },
    {
        name: "logout",
        icon: logoutIcon,
        location: "",
    },
];

export default function SideDrawer({
    isOpen,
    onClose,
}: {
    isOpen: boolean;
    onClose: () => void;
}) {
    const dispatch = useDispatch()
    return (
        <div
            className={`fixed top-0 right-0 w-full h-full bg-light shadow-lg transition-transform duration-300 transform z-50 ${
                isOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="cursor-pointer w-5" onClick={onClose}>
                        <Image src={leftArrowIcon} alt="left" />
                    </div>
                    <h3 className="font-sofia text-base font-medium ">
                        More Options
                    </h3>
                </div>
                <div className="mt-4 flex flex-col gap-2">
                    {profileSetting.map((item) => (
                        <div
                            key={item.name}
                            className="flex items-center px-4 py-4 bg-white border border-[#E6E6E6] rounded-2xl gap-2"
                            onClick={() => {
                                if(item.name.toLocaleLowerCase() === 'logout') dispatch(logout())
                            }}
                        >
                            <button>
                                <Image
                                    src={item.icon}
                                    alt="close"
                                    className="h-auto"
                                />
                            </button>
                            <h3 className="font-sofia text-sm font-normal capitalize">
                                {item.name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
