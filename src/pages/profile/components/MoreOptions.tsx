import { useDispatch } from "react-redux";
import Language from "../../../assets/language.png";
import logoutIcon from "../../../assets/logout.png";
import privacy from "../../../assets/privacy.png";
import setting from "../../../assets/settings.png";
import Image from "../../../components/shared/Image";
import { logout } from "../../../redux/feature/auth/authSlice";
import SideDrawer from "./SideDrawer";
import { setOpen } from "../../../redux/feature/open/openSlice";

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
export default function MoreOptions() {
    const dispatch = useDispatch();
    return (
        <SideDrawer>
            <div className="mt-4 flex flex-col gap-2">
                {profileSetting.map((item) => (
                    <div
                        key={item.name}
                        className="flex items-center px-4 py-4 bg-white border border-[#E6E6E6] rounded-2xl gap-2"
                        onClick={() => {
                            if (item.name.toLocaleLowerCase() === "logout")
                                dispatch(logout());
                                dispatch(setOpen(false))
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
        </SideDrawer>
    );
}
