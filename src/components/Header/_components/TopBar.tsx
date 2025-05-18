import { Link, useLocation, useNavigate } from "react-router-dom";
import { menu } from "../../../data/menu";
import Image from "../../shared/Image";
import notificationIcon from "../../../assets/notification.png";
import profileIcon from "../../../assets/profileIcon.png";
import { useAppSelector } from "../../../redux/hooks";
import { useGetUserProfileImageQuery } from "../../../redux/feature/auth/authApi";

export default function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInformation } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!userInformation?.id;

  const { data: profileImage } = useGetUserProfileImageQuery(
    { userId: userInformation?.id || "" },
    { skip: !isLoggedIn }
  );

  const filteredMenu = menu.filter(({ value }) => 
    ["Books", "Map", "Message"].includes(value)
  );

  return (
    <div className="hidden lg:flex items-center justify-between h-20 px-6 w-full z-50">
      {/* Left Section */}
      <div className="text-xl font-bold text-blue-600">LOGO</div>

      {/* Center Section */}
      <div className="flex gap-6">
        {filteredMenu.map(({ id, route, icon, value }) => {
          const isActive = pathname === route;
          return (
            <Link
              key={id}
              to={route || "#"}
              className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                isActive ? "bg-[#EDEDED] text-primary" : "text-gray-500"
              }`}
            >
              <Image
                src={icon}
                alt="icon"
                className="w-5 h-5"
                style={{
                  filter: isActive ? "brightness(0) saturate(100%) invert(43%) sepia(98%) saturate(2375%) hue-rotate(185deg) brightness(93%) contrast(98%)" : "none",
                  transition: "filter 0.2s ease-in-out",
                }}
              />
              <span className="text-sm font-poppins">{value}</span>
            </Link>
          );
        })}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {isLoggedIn && (
          <button>
            <img src={notificationIcon} alt="Notification" className="w-6 h-6" />
          </button>
        )}
        
        {isLoggedIn ? (
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => navigate("/profile/user-profile")}
          >
            <img
              src={profileImage?.url || profileIcon}
              alt={`${userInformation?.firstName || 'User'} Profile`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-medium text-gray-800">
              {userInformation?.firstName || userInformation?.email?.split('@')[0] || 'User'}
            </span>
          </div>
        ) : (
          <button 
            onClick={() => navigate("/auth/login")}
            className="bg-primary text-white py-2 px-4 rounded-md text-sm font-medium"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}