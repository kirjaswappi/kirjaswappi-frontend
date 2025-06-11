import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import PrivacyPolicyHeader from './components/PrivacyPolicyHeader';
import PrivacyPolicySection from './components/PrivacyPolicySection';
import { PRIVACY_POLICY_SECTIONS } from './constants/sections';

const PrivacyPolicy = () => {
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="font-poppins pb-24 lg:bg-white lg:container">
      <div className="pt-[56px] lg:max-w-3xl lg:mx-auto lg:px-12">
        <PrivacyPolicyHeader onBack={() => navigate('/profile/user-profile')} />
        <h1 className="hidden lg:block lg:pl-6 font-poppins font-semibold text-[32px] tracking-[-0.02em] pt-[56px]">
          Privacy Center
        </h1>
        <p className="sm:pt-6 lg:pt-0 lg:hidden px-4 lg:pt-4 font-normal text-[14px] sm:px-4 sm:pb-[12px] lg:font-normal lg:text-[14px] lg:leading-[24px] lg:tracking-[0px]">
          We are committed to protecting your privacy and ensuring that your personal information is
          handled in a safe and responsible manner. This Privacy Policy outlines how we collect,
          use, store, and protect your information when you use our Website. By using KirjaSwappi,
          you agree to the terms of this Privacy Policy. If you do not agree with any part of this
          policy, please do not use our Website.
        </p>

        {/* Mobile view */}
        <div className="lg:hidden">
          {PRIVACY_POLICY_SECTIONS.map((section, index) => (
            <PrivacyPolicySection
              key={index}
              category={section.category}
              items={section.items}
              openSections={openSections}
              toggleSection={toggleSection}
            />
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          {PRIVACY_POLICY_SECTIONS.map((section, sectionIndex) => (
            <div key={sectionIndex} className="pt-2">
              <h2 className="pl-3 lg:hidden font-poppins font-semibold text-[20px] leading-[28px] tracking-[0px]">
                {sectionIndex + 1}. {section.category}
              </h2>

              {section.items.map((item, itemIndex) => {
                let sequentialNumber = 1;
                for (let i = 0; i < sectionIndex; i++) {
                  sequentialNumber += PRIVACY_POLICY_SECTIONS[i].items.length;
                }
                sequentialNumber += itemIndex;

                return (
                  <div key={item.key} className="pl-6 pt-4">
                    <p className="font-poppins font-bold text-[18px] leading-[23px] tracking-[0px] lg:font-bold lg:text-[18px] lg:leading-[23px] lg:tracking-[0px]">
                      {sequentialNumber}. {item.title}
                    </p>
                    <div className="pl-2 pt-2 font-poppins font-normal text-[14px] leading-[24px] tracking-[0px] lg:font-normal lg:text-[14px] lg:leading-[24px] lg:tracking-[0px] lg:pt-4 lg:pr-[16px] lg:pb-[12px] lg:pl-[16px]">
                      {item.content}
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
