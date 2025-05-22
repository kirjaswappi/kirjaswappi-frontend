import React from 'react';

interface Step {
  label: string;
  isCompleted: boolean;
  isActive: boolean;
}

interface StepperProps {
  steps: Step[];
}

const Stepper: React.FC<StepperProps> = ({ steps }) => {
  return (
    <div className="flex items-center justify-between gap-4 md:gap-8">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center relative">
          {/* Step with Circle and Line */}
          <div className="flex flex-col items-center">
            <div
              className={`w-6 md:w-8 h-6 md:h-8 flex items-center justify-center rounded-full border-[2px] md:border-[4px] ${
                step.isCompleted
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : step.isActive
                    ? 'bg-white border-blue-500 text-blue-500'
                    : 'bg-gray-300 border-[#B2B2B2] text-gray-500'
              }`}
            >
              {step.isCompleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <div className={`w-4 h-4 rounded-full ${step.isActive ? 'bg-blue-500' : ''}`} />
              )}
            </div>
            <p
              className={`mt-2 text-[10px] font-poppins font-light  ${
                step.isActive ? 'text-[#0D0D0D] font-medium' : 'text-gray-500'
              }`}
            >
              {step.label}
            </p>
          </div>
          {index !== 2 && (
            <div className="absolute h-[2px] w-full bg-grayDark rounded-lg -right-16 top-[13px]"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
