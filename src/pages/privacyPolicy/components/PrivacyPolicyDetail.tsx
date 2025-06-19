import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PrivacyPolicyHeader from './PrivacyPolicyHeader';
import { useTranslation } from 'react-i18next';
import { PrivacyPolicyTranslationSection, PrivacyPolicyTranslationItem } from '../interface/types';

const PrivacyPolicyDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { sectionKey } = useParams<{ sectionKey: string }>();

  // Redirect to full privacy policy on desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        navigate('/privacy-policy', { replace: true });
      }
    };
    window.addEventListener('resize', handleResize);
    // Check immediately in case user loads directly on desktop
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [navigate]);

  const sections = t('privacyPolicy.sections', {
    returnObjects: true,
  }) as PrivacyPolicyTranslationSection[];
  const allItems: PrivacyPolicyTranslationItem[] = sections.flatMap((section) => section.items);
  const section = allItems.find((item) => item.title === sectionKey);

  if (!section) {
    return (
      <div className="font-poppins pb-24 lg:bg-white lg:container">
        <div className="pt-[56px] lg:max-w-3xl lg:mx-auto lg:px-12">
          <PrivacyPolicyHeader onBack={() => navigate('/privacy-policy')} />
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">{t('privacyPolicy.sectionNotFound')}</h2>
            <p>{t('privacyPolicy.sectionNotFoundDescription')}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="font-poppins  min-h-screen">
      <div className="pt-[56px] lg:max-w-3xl lg:mx-auto lg:px-12">
        <PrivacyPolicyHeader onBack={() => navigate('/privacy-policy')} />
        <div className="px-4 sm:px-6">
          <h2 className="text-[16px] sm:mt-4 sm:mb-3 font-semibold mb-6 leading-7 tracking-normal">
            {section.title}
          </h2>
          <div className="text-[15px] text-gray-700">
            {section.fields && (
              <div className="space-y-4 lg:space-y-2">
                {section.fields.map((field) => (
                  <div key={field.item}>
                    <div className="lg:text-black text-[#808080] sm:pl-0 lg:pl-0 lg:text-[15px] text-[14px] font-normal">
                      {field.item}
                    </div>
                    <div className="lg:hidden sm:pl-0 text-gray-700 text-[15px]">
                      {field.collected}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {section.list && (
              <ul className="text-[15px] text-gray-700 space-y-2 sm:pl-0 lg:pl-0">
                {section.list.map((li, i) => (
                  <li key={i}>{li}</li>
                ))}
              </ul>
            )}
            {section.bold && (
              <div className="space-y-4">
                {section.bold.map((b) => (
                  <p key={b.title} className="text-[15px] text-gray-700">
                    <b>{b.title}:</b> {b.content}
                  </p>
                ))}
              </div>
            )}
            {section.paragraphs && (
              <>
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-[15px] text-gray-700 mb-4">
                    {p}
                  </p>
                ))}
              </>
            )}
            {section.paragraph && (
              <p className="text-[15px] text-gray-700 mb-4">{section.paragraph}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyDetail;
