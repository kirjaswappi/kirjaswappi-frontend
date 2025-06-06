export const Stepper = ({
  steps,
}: {
  steps: { label: string; isCompleted: boolean; isActive: boolean }[];
}) => (
  <div className="w-full">
    <div className="flex lg:flex-col justify-between sm:gap-4 w-full pt-6 lg:pt-0 pb-3">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`relative flex items-center lg:h-[68px] ${s.isActive ? 'lg:bg-[#E6F1FF]' : ''}`}
        >
          <div className="flex flex-col lg:flex-row items-center flex-1 gap-2 lg:gap-4 lg:pl-3">
            {/* STEP CIRCLE */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center border-2 md:border-4 transition-all duration-200 ${
                s.isCompleted
                  ? 'bg-blue-500 border-blue-500'
                  : s.isActive
                    ? 'bg-white border-blue-500'
                    : 'bg-gray-300 border-[#B2B2B2]'
              }`}
            >
              {s.isCompleted ? (
                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : s.isActive ? (
                <>
                  {/* sm screen: show blue dot inside */}
                  <div className="w-5 h-5 rounded-full bg-blue-500 lg:hidden" />
                  {/* lg screen: show step number */}
                  <span className="hidden lg:inline text-xl font-light text-blue-500">{i + 1}</span>
                </>
              ) : (
                <span className="hidden lg:inline text-xl font-light text-[#808080]">{i + 1}</span>
              )}
            </div>

            {/* STEP LABEL */}
            <div className="flex flex-col">
              <p
                className={`font-poppins text-[10px] lg:text-[14px] font-medium lg:font-normal
      ${s.isActive ? 'text-[#0D0D0D]' : 'text-[#808080]'}
    `}
              >
                {s.label}
              </p>

              {s.isCompleted && (
                <span className="hidden lg:inline-block mt-1 px-1 text-[#3FBA49] font-semibold text-[10px] font-poppins">
                  Completed
                </span>
              )}
            </div>
          </div>

          {/* HORIZONTAL LINE (sm) */}
          {i !== 2 && (
            <div className="lg:hidden absolute h-[2px] w-full bg-grayDark rounded-lg -right-16 top-[13px]"></div>
          )}

          {/* VERTICAL LINE (lg) */}
          {i < steps.length - 1 && (
            <div className="hidden lg:block absolute h-[43vh] top-4 bottom-4 right-0 w-[1px] bg-[#E5E5E5] z-0" />
          )}

          {/* SIDE BAR INDICATOR (lg) */}
          {s.isActive && (
            <div className="hidden lg:block absolute right-0 top-0 w-2 h-full bg-blue-500 rounded-r-lg z-10" />
          )}
        </div>
      ))}
    </div>
  </div>
);

export default Stepper;
