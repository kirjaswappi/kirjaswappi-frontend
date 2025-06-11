import React from 'react';
import BookAddUpdateHeader from '../../addUpdateBook/_components/BookAddUpdateHeader';
import Image from '../../../components/shared/Image';
import leftArrowIcon from '../../../assets/leftArrow.png';

interface PrivacyPolicyHeaderProps {
  onBack: () => void;
}

const PrivacyPolicyHeader: React.FC<PrivacyPolicyHeaderProps> = ({ onBack }) => {
  return (
    <>
      {/* Mobile Header */}
      <div className="block lg:hidden">
        <BookAddUpdateHeader title="Privacy Center" onBack={onBack} />
      </div>
      {/* Desktop Header */}
      <div className="hidden lg:flex relative pt-[56px] pl-6">
        {/* Button positioned to the left, absolute */}
        <button
          className="absolute -left-10 mt-2 w-9 h-9 flex items-center justify-center bg-[#F6F7F9] rounded-lg border-none"
          onClick={onBack}
          aria-label="Go back"
        >
          <Image src={leftArrowIcon} alt="left" className="w-3 h-4" />
        </button>

        {/* Centered Title (remains centered regardless of button) */}
        <h1 className="font-poppins font-semibold text-[32px] tracking-[-0.02em]">
          Privacy Center
        </h1>
      </div>
    </>
  );
};

export default PrivacyPolicyHeader;
