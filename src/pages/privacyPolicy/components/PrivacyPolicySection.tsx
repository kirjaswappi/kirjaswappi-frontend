import React from 'react';
import AccordionItem from './AccordionItem';

interface SectionItem {
  key: string;
  title: string;
  content: React.ReactNode;
}

interface PrivacyPolicySectionProps {
  category: string;
  items: SectionItem[];
  openSections: Record<string, boolean>;
  toggleSection: (key: string) => void;
}

const PrivacyPolicySection: React.FC<PrivacyPolicySectionProps> = ({
  category,
  items,
  openSections,
  toggleSection,
}) => {
  return (
    <div className="">
      <p className="px-4 pt-[20px] font-poppins font-semibold text-[16px] pb-[12px] leading-[28px] lg:tracking-[0px]">
        {category}
      </p>
      {/* Mobile view */}
      <div className="block lg:hidden bg-white">
        {items.map((item) => (
          <AccordionItem
            key={item.key}
            title={item.title}
            isOpen={!!openSections[item.key]}
            toggle={() => toggleSection(item.key)}
          >
            <div className="px-4">{item.content}</div>
          </AccordionItem>
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
