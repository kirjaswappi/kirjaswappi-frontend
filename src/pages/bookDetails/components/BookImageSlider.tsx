import React, { useState } from 'react';
import Image from '../../../components/shared/Image';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { BookImageSliderProps } from '../interface';

// Navigation button component
const NavButton: React.FC<{
  onClick: () => void;
  position: 'left' | 'right';
  ariaLabel: string;
  children: React.ReactNode;
}> = ({ onClick, position, ariaLabel, children }) => (
  <button
    onClick={onClick}
    className={`absolute ${position === 'left' ? '-left-4' : '-right-4'} top-1/2 -translate-y-1/2 z-40 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200`}
    aria-label={ariaLabel}
    style={navButtonStyle}
  >
    {children}
  </button>
);

// Dot indicator component
const Dot: React.FC<{
  active: boolean;
  onClick: () => void;
  ariaLabel: string;
}> = ({ active, onClick, ariaLabel }) => (
  <button
    onClick={onClick}
    className={`w-2 h-2 rounded-full transition-all duration-300 ${
      active ? 'bg-blue-500 scale-125' : 'bg-[#D4DCF5] hover:bg-gray-400'
    }`}
    aria-label={ariaLabel}
  />
);

// Navigation button style
const navButtonStyle = {
  width: '24px',
  height: '23px',
  borderRadius: '50%',
  background: '#fff',
  border: 'none',
  boxShadow: '0 2px 8px 0 #0002',
};

// Helper to get slide style based on position
const getSlideStyle = (idx: number, current: number, total: number) => {
  const position = (idx - current + total) % total;
  const baseStyle = {
    transform: 'translateX(-50%) translateY(-50%)',
    zIndex: 10,
    opacity: 0,
    filter: 'brightness(0.5)',
    boxShadow: 'none',
  };
  if (position === 0) {
    return {
      ...baseStyle,
      transform: baseStyle.transform + ' scale(1)',
      zIndex: 30,
      opacity: 1,
      filter: 'none',
      boxShadow: '0 8px 32px 0 #0002',
    };
  }
  if (position === 1 || position === total - 1) {
    const translateX = position === 1 ? '70px' : '-70px';
    return {
      ...baseStyle,
      transform: baseStyle.transform + ` scale(0.85) translateX(${translateX})`,
      zIndex: 20,
      opacity: 0.6,
      filter: 'brightness(0.7)',
      boxShadow: '0 4px 16px 0 #0001',
    };
  }
  return {
    ...baseStyle,
    transform: baseStyle.transform + ' scale(0.6)',
  };
};

const BookImageSlider: React.FC<BookImageSliderProps> = ({ images, className }) => {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  // Navigation logic
  const goTo = (idx: number) => setCurrent((idx + total) % total);
  const handlePrev = () => goTo(current - 1);
  const handleNext = () => goTo(current + 1);

  return (
    <div className={`flex flex-col items-center justify-center w-full ${className || ''}`}>
      <div className="relative w-full max-w-[180px] h-[200px] flex items-center justify-center">
        {/* Slides */}
        {images.map((img: string, idx: number) => (
          <div
            key={idx}
            className="absolute left-1/2 top-1/2 w-[160px] h-[190px] transition-all duration-500 ease-out cursor-pointer"
            style={getSlideStyle(idx, current, total)}
            onClick={() => setCurrent(idx)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setCurrent(idx)}
          >
            <div className="w-full h-full bg-white rounded-lg shadow-2xl overflow-hidden relative">
              <Image
                src={img}
                alt={`Book ${idx + 1}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-r from-transparent to-black opacity-20 pointer-events-none" />
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        {total > 2 && (
          <NavButton onClick={handlePrev} position="left" ariaLabel="Previous image">
            <MdChevronLeft size={20} color="#222" />
          </NavButton>
        )}
        {total > 1 && (
          <NavButton onClick={handleNext} position="right" ariaLabel="Next image">
            <MdChevronRight size={20} color="#222" />
          </NavButton>
        )}
      </div>

      {/* Dots */}
      {total > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {images.map((_: string, idx: number) => (
            <Dot
              key={idx}
              active={idx === current}
              onClick={() => setCurrent(idx)}
              ariaLabel={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookImageSlider;
