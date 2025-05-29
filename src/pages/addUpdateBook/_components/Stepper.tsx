import React from 'react';

interface Step {
  id: number;
  title: string;
  description: string;
  label?: string; // for compact view
  isActive: boolean;
  isCompleted: boolean;
}

interface StepperProps {
  steps: Step[];
  onStepClick?: (stepId: number) => void;
}

const Stepper: React.FC<StepperProps> = ({ steps, onStepClick }) => {
  return (
    <>
      {/* Small to Medium Device View */}
      <div className="md:hidden container bg-white">
        <div className="relative flex items-start justify-between">
          {steps.map((step, label) => (
            <div
              key={label}
              className="flex flex-col items-center relative z-10"
              onClick={() => onStepClick?.(step.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onStepClick?.(step.id);
                }
              }}
            >
              <div
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border-2 border-[#E5E5E5] md:border-[3px] transition-all duration-200 cursor-pointer ${
                  step.isCompleted
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : step.isActive
                      ? 'bg-blue-500 border-blue-500 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                }`}
              >
                {step.isCompleted ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
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
                  <span
                    className={`text-sm md:text-base font-medium ${
                      step.isActive ? 'text-white' : 'text-gray-400'
                    }`}
                  >
                    {step.id}
                  </span>
                )}
              </div>

              <p
                className={`mt-2 text-xs md:text-sm text-center font-normal max-w-[80px] transition-colors duration-200 ${
                  step.isActive
                    ? 'text-gray-900'
                    : step.isCompleted
                      ? 'text-gray-700'
                      : 'text-gray-500'
                }`}
              >
                {step.label || step.title}
              </p>
            </div>
          ))}

          <div className="absolute top-4 md:top-5 left-0 right-0 flex items-center justify-between px-4">
            {steps.slice(0, -1).map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-0.5 md:h-[3px] mx-2 transition-colors duration-200 ${
                  steps[index + 1].isCompleted || steps[index + 1].isActive
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Large Device View (md and up) */}
      <div className="container hidden md:block border-r border-[#E5E5E5] h-[682px]">
        <div className="flex flex-col">
          {steps.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => onStepClick?.(step.id)}
              className={`relative flex items-center px-6 py-6 transition-all duration-200 cursor-pointer
                ${step.isActive ? 'bg-blue-50' : 'bg-white'}
                ${idx !== steps.length - 1 ? ' border-gray-200' : ''}
              `}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onStepClick?.(step.id);
                }
              }}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-200 mr-4 text-lg
                  ${
                    step.isCompleted
                      ? 'bg-blue-500 text-white'
                      : step.isActive
                        ? 'bg-white border-2 border-blue-500 text-blue-500'
                        : 'bg-white border-2 border-[#808080] text-[#808080]'
                  }
                `}
              >
                {step.id}
              </div>
              <div className="flex flex-col">
                <span
                  className={`text-base font-medium transition-colors duration-200 
                    ${step.isCompleted ? 'text-black' : step.isActive ? 'text-black' : 'text-[#808080]'}
                  `}
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {step.title}
                </span>
                <span
                  className="text-sm font-normal mt-1 transition-colors duration-200 text-[#808080]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  {step.description}
                </span>
                {step.isCompleted && (
                  <span
                    className="text-sm font-medium text-green-500 mt-1"
                    style={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Completed
                  </span>
                )}
              </div>
              {step.isActive && <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-500" />}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Stepper;
