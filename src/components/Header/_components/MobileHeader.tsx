import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../../assets/logo.png';
import logoIcon from '../../../assets/logoIcon.png';
import Image from '../../shared/Image';
import SearchBar from '../../shared/SearchBar';
export default function MobileHeader() {
  //   const [searchToggle, setSearchToggle] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  //   const shouldCollapse = scrolled || searchToggle;
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 70);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`h-28 px-4 py-2  w-full z-50 fixed top-0 lg:shadow-sm transition-all duration-300 flex items-center justify-center flex-col gap-4 ${
        scrolled ? 'bg-white shadow-md ' : 'bg-transparent'
      }`}
    >
      <div className="container">
        <Link
          to="/"
          aria-label="Go to homepage"
          //   className={`${searchToggle ? 'hidden' : 'block'}`}
        >
          <Image
            src={!scrolled ? logo : logoIcon}
            alt="KirjaSwappi Logo"
            className={`cursor-pointer ${scrolled ? 'w-10 h-10' : 'h-7'}`}
          />
          <div className={``}>
            <SearchBar />
          </div>
        </Link>
      </div>
    </div>
  );
}
