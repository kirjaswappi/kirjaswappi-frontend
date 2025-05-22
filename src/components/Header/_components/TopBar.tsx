import { Link, useLocation, useNavigate } from 'react-router-dom';
import { menu } from '../../../data/menu';
import Image from '../../shared/Image';
import notification_gray from '../../../assets/notification_gray.png';
import profileIcon from '../../../assets/profileIcon.png';
import country from '../../../assets/country.png';
import logo from '../../../assets/logo.png';
import dropdownarrow from '../../../assets/dropdownarrow.png';
import { useAppSelector } from '../../../redux/hooks';
import { useGetUserProfileImageQuery } from '../../../redux/feature/auth/authApi';

export default function TopBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { userInformation } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!userInformation?.id;
  // Mock notification count for demonstration
  const notificationCount = 1;

  const { data: profileImage } = useGetUserProfileImageQuery(
    { userId: userInformation?.id || '' },
    { skip: !isLoggedIn },
  );

  const filteredMenu = menu.filter(({ isShow }) => isShow);

  return (
    <div className="hidden lg:flex items-center justify-between bg-white h-20 px-6 w-full z-50">
      {/* Left Section */}
      <div className="text-xl font-bold">
        <img src={logo} alt="KirjaSwappi Logo" className="h-8" />
      </div>

      {/* Center Section */}
      <div className="flex gap-6">
        {filteredMenu.map(({ id, route, icon, value }) => {
          const isActive = pathname === route;
          return (
            <Link
              key={id}
              to={route || '#'}
              className={`flex items-center gap-2 ${
                isActive
                  ? 'bg-white text-blue-500 border border-blue-500 rounded-full px-6 py-2'
                  : 'text-[#808080] px-4 py-2'
              }`}
            >
              <Image
                src={icon}
                alt="icon"
                className="w-5 h-5"
                style={{
                  filter: isActive
                    ? 'brightness(0) saturate(100%) invert(43%) sepia(98%) saturate(2375%) hue-rotate(185deg) brightness(93%) contrast(98%)'
                    : 'none',
                  transition: 'filter 0.2s ease-in-out',
                }}
              />
              <span className={`text-sm font-poppins ${isActive ? 'font-medium' : ''}`}>
                {value}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Swedish Flag */}
        <button className="flex items-center justify-center w-8 h-8 rounded-full overflow-hidden">
          <img src={country} alt="Swedish Flag" className="w-full h-full object-cover" />
        </button>

        {isLoggedIn && (
          <div className="relative">
            <button className="flex items-center justify-center w-10 h-10 bg-[#E8EEF5] rounded-full">
              <img src={notification_gray} alt="Notification" className="w-5 h-5" />
            </button>
            {notificationCount > 0 && (
              <span className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-[#EF2C4D] text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold">
                {notificationCount}
              </span>
            )}
          </div>
        )}

        {isLoggedIn ? (
          <div
            role="button"
            tabIndex={0}
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/profile/user-profile')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                navigate('/profile/user-profile');
              }
            }}
          >
            <img
              src={profileImage?.url || profileIcon}
              alt={`${userInformation?.firstName || 'User'} Profile`}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm font-light font-poppins text-[#808080]">
              {userInformation?.firstName || userInformation?.email?.split('@')[0] || 'User'}
            </span>
            {/* Dropdown arrow */}
            <Image src={dropdownarrow} alt="dropdown" className="w-[12px] h-[6px] top-[9px]" />
          </div>
        ) : (
          <button
            onClick={() => navigate('/auth/login')}
            className="bg-primary text-white py-2 px-4 rounded-md text-sm font-medium"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
