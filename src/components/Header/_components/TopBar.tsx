// import leftArrowGray from '../../../assets/leftArrowGray.png';
import logo from '../../../assets/logo.png';
// import logoIcon from '../../../assets/logoIcon.png';
import { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';
import blankProfileIcon from '../../../assets/blankProfileIcon.png';
import country from '../../../assets/flag.png';
import { useGetUserProfileImageQuery } from '../../../redux/feature/auth/authApi';
import { useAppSelector } from '../../../redux/hooks';
import Button from '../../shared/Button';
import Image from '../../shared/Image';
import ScrollSearch from '../../shared/ScrollSearch';
import MobileHeader from './MobileHeader';
import UserProfileSkeleton from './UserProfileSkeleton';

export default function TopBar() {
  // const location = useLocation();
  // const [scrolled, setScrolled] = useState<boolean>(false);
  // const [searchToggle, setSearchToggle] = useState<boolean>(false);
  const [showScrollSearch, setShowScrollSearch] = useState<boolean>(false);
  // const pathname = location.pathname;
  const { userInformation } = useAppSelector((state) => state.auth);
  const { data: profilePicture, isLoading } = useGetUserProfileImageQuery(
    { userId: userInformation.id },
    {
      skip: !userInformation.id,
    },
  );
  // const shouldCollapse = scrolled;
  // const shouldCollapse = scrolled || searchToggle;
  // const isHomePage = pathname === '/';

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setScrolled(window.scrollY > 70);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  useEffect(() => {
    const handleScroll = () => {
      const searchBar = document.querySelector('#hero-search');
      const topBar = document.querySelector('#top-nav-bar');

      if (searchBar && topBar) {
        const searchBarRect = searchBar.getBoundingClientRect();
        const topBarHeight = topBar.getBoundingClientRect().height;
        if (searchBarRect.top <= topBarHeight + 20) {
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
    <div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>
      <div
        className={`h-20 px-4 py-2  w-full z-50 fixed top-0 lg:shadow-sm transition-all duration-300 hidden lg:flex items-center justify-center flex-col gap-4 shadow-md bg-white`}
      >
        <div className="container">
          <div id="top-nav-bar" className={`w-full flex items-center justify-between `}>
            <Link to="/" aria-label="Go to homepage">
              <Image
                src={logo}
                alt="KirjaSwappi Logo"
                className="h-7 cursor-pointer hidden lg:block"
              />
            </Link>
            {/* <div className="flex flex-row gap-2">
          <Link
            to="/"
            aria-label="Go to homepage"
            className={`${searchToggle ? 'hidden' : 'block'}`}
          >
            <Image
              src={logo}
              alt="KirjaSwappi Logo"
              className="h-7 cursor-pointer hidden lg:block"
            />
            <Image
              src={!scrolled ? logo : logoIcon}
              alt="KirjaSwappi Logo"
              className={`cursor-pointer lg:hidden ${scrolled ? 'w-10 h-10' : 'h-7'}`}
            />
          </Link>
          {searchToggle && (
            <button
              onClick={() => setSearchToggle(false)}
              className="w-12 h-10 border border-gray rounded-full flex items-center justify-center"
            >
              <Image src={leftArrowGray} alt="Left Arrow" className="h-4" />
            </button>
          )}
          {shouldCollapse && (
            <button
              type="button"
              onClick={() => setSearchToggle(true)}
              aria-label="Show search"
              className="bg-transparent border-none p-0 m-0 focus:outline-none"
              tabIndex={0}
            >
              {
                <SearchBar
                  isShowFilterIcon={false}
                  isShowSortingIcon={false}
                  className={`h-10 px-0 pl-2 overflow-hidden lg:hidden ${searchToggle ? 'w-full pr-3' : 'w-10'} `}
                />
              }
            </button>
          )}
        </div> */}
            <div className="block transition-all duration-300 ease-in-out">
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

            <div className={`w-[220px] flex items-center justify-end gap-4`}>
              <Button className="flex items-center justify-center w-10 h-10 border border-primary rounded-full overflow-hidden">
                <Image src={country} alt="Swedish Flag" className="w-10 h-10 object-cover " />
              </Button>
              {isLoading ? (
                <UserProfileSkeleton />
              ) : (
                <div>
                  {!userInformation.id ? (
                    <Link to="/auth/login">
                      <Image
                        src={blankProfileIcon}
                        alt="profile"
                        className="w-10 h-10 object-cover rounded-full border border-primary"
                      />
                    </Link>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Image
                        src={profilePicture?.imageUrl ?? blankProfileIcon}
                        alt="profile"
                        className="w-10 h-10 object-cover rounded-full border border-primary"
                      />
                      <div className="flex items-center gap2">
                        <p className="text-grayDark font-poppins font-normal text-sm">
                          {userInformation.firstName}
                        </p>
                        <MdOutlineKeyboardArrowDown size={24} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* {!scrolled && isHomePage && (
        <div className={`${searchToggle ? 'hidden' : 'block'} lg:hidden w-full`}>
          <SearchBar />
        </div>
      )} */}
        </div>
      </div>
    </div>
  );
}
