import { Link, useLocation } from "react-router-dom";
import { menu } from "../../../data/menu";
import Image from "../../shared/Image";

export default function BottomNav() {
    const location = useLocation();
    return (
        <div className="h-20 flex items-center gap-5 justify-between text-xs font-normal px-6 ">
            {menu.map((menuItem) => {
                const isActive = location.pathname === menuItem?.route;
                return (
                    <Link
                        // ref={reference}
                        to={menuItem?.route || "#"}
                          key={menuItem?.id}
                        className={`flex flex-col items-center gap-1 w-14 min-w-14 h-14 min-h-14 p-2 ${
                            isActive
                                ? "bg-[#EDEDED] rounded-md text-primary"
                                : ""
                        }`}
                        style={{
                            transition: "background-color 0.2s ease-in-out",
                        }}
                    >
                        <div className="h-7 flex items-center justify-center">
                            <Image
                                src={menuItem?.icon}
                                alt="icon"
                                style={{
                                    filter: isActive
                                        ? "brightness(0) saturate(100%) invert(43%) sepia(98%) saturate(2375%) hue-rotate(185deg) brightness(93%) contrast(98%)" 
                                        : "none",
                                        transition: 'filter 0.2s ease-in-out',
                                }}
                            />
                        </div>
                        <p className="leading-none text-xs font-normal font-sofia">
                            {menuItem?.value}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
}