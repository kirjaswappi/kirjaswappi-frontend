import React from 'react';
import { Link } from 'react-router-dom';

interface SectionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface PrivacyPolicySectionProps {
  category: string;
  items: SectionItem[];
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({ category, items }) => {
  return (
    <div className="">
      <p className="px-4 pt-[20px] font-poppins font-semibold text-[16px] pb-[12px] leading-[28px] lg:tracking-[0px]">
        {category}
      </p>
      {/* Mobile view */}
      <div className="block lg:hidden bg-white">
        {items.map((item) => (
          <Link
            key={item.key}
            to={`/profile/privacy/${item.key}`}
            className="block px-4 py-3 text-[15px] text-gray-700 hover:bg-gray-50"
          >
            {item.title}
          </Link>
        ))}
      </div>
      {/* Desktop view */}
      <div className="hidden lg:block bg-white">
        {items.map((item) => (
          <div key={item.key} className="px-8 py-4">
            <h3 className="font-semibold text-[16px] mb-3">{item.title}</h3>
            {item.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicySection;
