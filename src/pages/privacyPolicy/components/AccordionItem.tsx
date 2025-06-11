import React from 'react';
import arrow1 from '../../../assets/arrowR.png';

interface AccordionItemProps {
  title: string;
  isOpen: boolean;
  toggle: () => void;
  children: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, isOpen, toggle, children }) => (
  <>
    <button
      onClick={toggle}
      className="w-full flex items-center justify-between px-4 py-3 text-left text-[15px] text-gray-700 hover:bg-gray-50"
    >
      {title}
      <img
        src={arrow1}
        alt="arrow"
        className={`ml-2 w-6 h-6 object-contain transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 bg-white ${isOpen ? 'max-h-none py-2 px-8' : 'max-h-0 py-0 px-8'}`}
    >
      {children}
    </div>
  </>
);

export default AccordionItem;
