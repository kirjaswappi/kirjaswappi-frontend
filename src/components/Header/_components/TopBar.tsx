import { useNavigate } from 'react-router-dom';
import Image from '../../shared/Image';
// import TopMiddle from './TopMiddleBar'; // Import the new TopMiddle component
import notification_gray from '../../../assets/notification_gray.png';
import profileIcon from '../../../assets/profileIcon.png';
import country from '../../../assets/country.png';
import logo from '../../../assets/logo.png';
import dropdownarrow from '../../../assets/dropdownarrow.png';
import { useAppSelector } from '../../../redux/hooks';
import { useGetUserProfileImageQuery } from '../../../redux/feature/auth/authApi';
import { useEffect, useState } from 'react';
import ScrollSearch from '../../shared/ScrollSearch';

export default function TopBar() {
  const navigate = useNavigate();
  const { userInformation } = useAppSelector((state) => state.auth);
  const isLoggedIn = !!userInformation?.id;
  // Mock notification count for demonstration
  const notificationCount = 1;

  const { data: profileImage } = useGetUserProfileImageQuery(
    { userId: userInformation?.id || '' },
    { skip: !isLoggedIn },
  );

  const [showScrollSearch, setShowScrollSearch] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.querySelector('#hero-search');
      const topBar = document.querySelector('#top-nav-bar');

      if (searchBar && topBar) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const topBarHeight = topBar.getBoundingClientRect().height;

        // Adjust the threshold to be slightly before the search bar touches the nav
        if (searchBarRect.top <= topBarHeight + 20) {
          // Added small offset
          setShowScrollSearch(true);
        } else {
          setShowScrollSearch(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      id="top-nav-bar"
      className="hidden lg:flex items-center justify-between bg-white h-20 px-6 w-full z-50 fixed top-0 shadow-sm"
    >
      {/* Left Section */}
      <div className="text-xl font-bold">
        <img src={logo} alt="KirjaSwappi Logo" className="h-8" />
      </div>

      {/* Center Section with transition */}
      <div className="transition-all duration-300 ease-in-out">
        {showScrollSearch ? (
          <div className="animate-fadeIn">
            <ScrollSearch />
          </div>
        ) : (
          <div className="animate-fadeIn">
            <ScrollSearch />
          </div>
        )}
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
