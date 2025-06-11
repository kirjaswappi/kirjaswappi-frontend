import React from 'react';
import BookAddUpdateHeader from '../../addUpdateBook/_components/BookAddUpdateHeader';

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
    </>
  );
};

export default PrivacyPolicyHeader;
