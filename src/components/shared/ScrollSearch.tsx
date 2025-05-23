import { Link, useLocation } from 'react-router-dom';
import { menu } from '../../data/menu';
import Image from './Image';
import React from 'react';
import { IoSearch } from 'react-icons/io5';

export default function ScrollSearch() {
  const { pathname } = useLocation();
  // Filter menu items that should be shown
  const filteredMenu = menu.filter(({ isShow }) => isShow);

  return (
    <div className="flex items-center bg-gray-100 rounded-full p-1 gap-1 border border-[#E5E5E5]">
      {filteredMenu.map(({ id, route, icon, value }, index) => {
        const isActive = pathname === route;
        return (
          <React.Fragment key={id}>
            {/* Only show separator if it's not the first item AND not before search */}
            {index > 0 && index < filteredMenu.length && (
              <span className="h-5 w-px bg-[#E5E5E5]"></span>
            )}
            <Link
              to={route || '#'}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 ease-in-out ${
                isActive
                  ? 'text-blue-500 font-medium'
                  : 'text-[#A6A6A6] hover:text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Image
                src={icon}
                alt="icon"
                className="w-4 h-4"
                style={{
                  filter: isActive
                    ? 'brightness(0) saturate(100%) invert(39%) sepia(99%) saturate(1747%) hue-rotate(194deg) brightness(96%) contrast(101%)'
                    : 'brightness(0) saturate(100%) invert(74%) sepia(6%) saturate(0%) hue-rotate(180deg) brightness(93%) contrast(88%)',
                  transition: 'filter 0.2s ease-in-out',
                }}
              />
              <span
                className={`text-sm ${isActive ? 'text-blue-500 font-medium' : 'text-[#A6A6A6]'}`}
              >
                {value}
              </span>
            </Link>
          </React.Fragment>
        );
      })}

      {/* Search button - no separator before this */}
      <button className="flex items-center gap-2 px-2 py-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-all duration-200 ease-in-out ml-2">
        <IoSearch className="w-4 h-4" />
      </button>
    </div>
  );
}
