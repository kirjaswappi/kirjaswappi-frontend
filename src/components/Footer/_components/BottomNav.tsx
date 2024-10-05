import { Link } from 'react-router-dom';
import { menu } from '../../../data/menu';
import Image from '../../shared/Image';

export default function BottomNav() {
  return (
    <div className="h-20 flex items-center gap-5 justify-between text-xs font-normal px-6 ">
    {menu.map((menuItem) => (
      <Link
        // ref={reference}
        to={menuItem?.route || "#"}
        key={menuItem?.id}
        // className={`menulist rounded hover:text-primary ${
        //   pathname === menuItem?.route
        //     ? "bg-light py-[15px] px-5 flex items-center gap-[10px]"
        //     : "py-[15px] px-5 flex items-center gap-[10px] relative"
        // } ${open && menuItem.id === 4 ? "bg-light" : ""}`}
        // onClick={() => handleRoute(menuItem?.isRoute)}
        // onMouseEnter={() => handleMouseEnte(menuItem?.id)}
        // onMouseLeave={handleMouseLeav}
        className='flex flex-col items-center gap-[6px] min-w-12'
      >
        {/* <style>
          {`
              .menulist:hover .menulist-img {
                filter: ${
                  menuHover === menuItem?.id
                    ? "brightness(0) saturate(100%) invert(36%) sepia(77%) saturate(494%) hue-rotate(145deg) brightness(92%) contrast(92%);"
                    : ""
                }
              }
            `}
        </style> */}
        <div className='h-7 flex items-center justify-center'>
        <Image src={menuItem?.icon} className="hover:text-primary menulist-img" />
        </div>
        <p className="leading-none">{menuItem?.value}</p>
        {/* {open && menuItem?.children ? (
          <div className="absolute bg-white top-[60px] right-0 py-4  w-[208px] z-50 drop-shadow-2xl rounded-5px">
            <div
              className="absolute w-5 h-5 bg-white  right-10 -top-[10px] rotate-45 -z-10"
              style={{ boxShadow: "rgba(0, 0, 0, 0.06) 2px 3px 0px -2px inset" }}
            />
            {menuItem?.children?.map((child) => {
              return (
                <div
                  key={child?.id}
                  className="menu flex items-center gap-3 px-4 py-[13px]  hover:bg-primary text-[#6F6E77] hover:text-white duration-300 "
                  onClick={() => {
                    setOpen(false);
                    navigate(child?.route);
                  }}
                  onMouseEnter={() => handleMouseEnter(child?.value)}
                  onMouseLeave={handleMouseLeave}
                >
                  <style>
                    {`
                        .menu:hover .menu-img{
                         filter: ${
                           isHovered === child?.value
                             ? "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7494%) hue-rotate(294deg) brightness(107%) contrast(101%)"
                             : ""
                         }
                        }
                      `}
                  </style>
                  <img src={child?.icon} alt="icon" className="menu-img w-[17px] h-[17px] object-cover" />
                  <span className="text-sm font-medium">{child?.value}</span>
                </div>
              );
            })}
          </div>
        ) : null} */}
      </Link>
    ))}
  </div>
  )
}
