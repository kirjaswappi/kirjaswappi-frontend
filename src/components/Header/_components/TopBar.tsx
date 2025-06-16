import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import blankProfileIcon from '../../../assets/blankProfileIcon.png';
import country from '../../../assets/flag.png';
import logo from '../../../assets/logo.png';
import { useGetUserProfileImageQuery } from '../../../redux/feature/auth/authApi';
import { useAppSelector } from '../../../redux/hooks';
import Button from '../../shared/Button';
import Image from '../../shared/Image';
import ScrollSearch from '../../shared/ScrollSearch';
import SearchBar from '../../shared/SearchBar';

export default function TopBar() {
  const location = useLocation();
  const { userInformation } = useAppSelector((state) => state.auth);
  const { data: profilePicture, isLoading } = useGetUserProfileImageQuery(
    { userId: userInformation.id },
    {
      skip: !userInformation.id,
    },
  );
  console.log(profilePicture, isLoading);

  const pathname = location.pathname;
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [showScrollSearch, setShowScrollSearch] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div
      className={`lg:bg-white h-28 lg:h-20 px-4 py-2  w-full z-50 fixed top-0 lg:shadow-sm transition-all duration-300 flex items-center justify-center flex-col gap-4 ${
        scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <div id="top-nav-bar" className={`w-full flex items-center justify-between `}>
        <Link to={'/'}>
          <Image src={logo} alt="KirjaSwappi Logo" className="h-7 cursor-pointer" />
        </Link>

        <div className="hidden lg:block transition-all duration-300 ease-in-out">
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

        <div className="flex items-center gap-4">
          <Button className="flex items-center justify-center w-10 h-10 border border-primary rounded-full overflow-hidden">
            <Image src={country} alt="Swedish Flag" className="w-10 h-10 object-cover " />
          </Button>
          {isLoading ? (
            <div className="w-10 h-10 rounded-full bg-platinum animate-pulse"></div>
          ) : (
            <Link
              to={'/profile/user-profile'}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Image
                src={profilePicture?.imageUrl ?? blankProfileIcon}
                alt="profile"
                className="w-10 h-10 object-cover rounded-full border border-primary"
              />
            </Link>
          )}
        </div>
      </div>
      {pathname === '/' && (
        <div className="lg:hidden w-full">
          <SearchBar />
        </div>
      )}
    </div>
  );
}
