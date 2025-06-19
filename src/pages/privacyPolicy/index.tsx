import { useNavigate, useLocation } from 'react-router-dom';
import { useMemo, useEffect } from 'react';
import PrivacyPolicyHeader from './components/PrivacyPolicyHeader';
import PrivacyPolicySection from './components/PrivacyPolicySection';
import { useTranslation } from 'react-i18next';
import { PrivacyPolicyTranslationSection } from './interface/types';

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const sections = t('privacyPolicy.sections', {
    returnObjects: true,
  }) as PrivacyPolicyTranslationSection[];
  const sequentialNumbers = useMemo(() => {
    const numbers: Record<string, number> = {};
    let currentNumber = 1;
    sections.forEach((section) => {
      section.items.forEach((item) => {
        numbers[item.title] = currentNumber++;
      });
    });
    return numbers;
  }, [sections]);

  useEffect(() => {
    // If we're coming from a specific section page (mobile view)
    const sectionKey = location.pathname.split('/').pop();
    if (sectionKey && sectionKey !== 'privacy') {
      // Find the section element and scroll to it
      const sectionElement = document.getElementById(sectionKey);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <div className="font-poppins pb-24 lg:bg-white lg:container">
      <div className="pt-[56px] lg:max-w-3xl lg:mx-auto lg:px-12">
        <PrivacyPolicyHeader onBack={() => navigate('/')} />
        <p className="pt-9 leading-6 px-4 lg:hidden font-normal text-[14px] px-4 pb-[12px]">
          {t('privacyPolicy.introduction')}
        </p>

        {/* Information we collect */}
        <div className="lg:hidden">
          {sections.map((section, index) => (
            <PrivacyPolicySection key={index} category={section.category} items={section.items} />
          ))}
        </div>

        {/* Desktop view */}
        <div className="hidden lg:block">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="pt-2">
              <h2 className="pl-3 font-poppins font-semibold text-[20px] leading-[28px] tracking-[0px] lg:hidden">
                {sectionIndex + 1}. {section.category}
              </h2>

              {section.items.map((item) => (
                <div key={item.title} id={item.title} className="pl-6 pt-4">
                  <p className="font-poppins font-bold text-[18px] leading-[23px] tracking-[0px] lg:font-bold lg:text-[18px] lg:leading-[23px] lg:tracking-[0px]">
                    {sequentialNumbers[item.title]}. {item.title}
                  </p>
                  <div className="pt-2 font-poppins font-normal text-[14px] leading-[24px] tracking-[0px] lg:font-normal lg:text-[14px] lg:leading-[24px] lg:tracking-[0px] lg:pt-4 lg:pr-[16px] lg:pb-[12px] lg:pl-6">
                    {/* Render content based on item structure */}
                    {item.fields && (
                      <div className="space-y-4 lg:space-y-2">
                        {item.fields.map((field) => (
                          <div key={field.item}>
                            <div className="lg:text-black text-[#808080] lg:pl-0 lg:text-[15px] text-[14px] font-normal">
                              {field.item}
                            </div>
                            <div className="lg:hidden text-gray-700 text-[15px]">
                              {field.collected}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    {item.list && (
                      <ul className="text-[15px] text-gray-700 space-y-2 lg:pl-0">
                        {item.list.map((li, i) => (
                          <li key={i}>{li}</li>
                        ))}
                      </ul>
                    )}
                    {item.bold && (
                      <div className="space-y-4">
                        {item.bold.map((b) => (
                          <p key={b.title} className="text-[15px] text-gray-700">
                            <b>{b.title}:</b> {b.content}
                          </p>
                        ))}
                      </div>
                    )}
                    {item.paragraphs && (
                      <>
                        {item.paragraphs.map((p, i) => (
                          <p key={i} className="text-[15px] text-gray-700 mb-4">
                            {p}
                          </p>
                        ))}
                      </>
                    )}
                    {item.paragraph && (
                      <p className="text-[15px] text-gray-700 mb-4">{item.paragraph}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
