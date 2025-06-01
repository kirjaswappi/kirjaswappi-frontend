const Stepper = ({
  steps,
}: {
  steps: { label: string; isCompleted: boolean; isActive: boolean }[];
}) => (
  <>
    <div className="flex justify-between gap-4 md:gap-8 lg:hidden w-full pt-6 pb-3">
      {steps.map((s, i) => (
        <div key={i} className="flex flex-col items-center flex-1 relative">
          <div className="flex items-center justify-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full  border-[2px] md:border-[4px] transition-all duration-200 ${
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
              ) : (
                <span
                  className={`text-base font-light ${s.isActive ? 'text-blue-500' : 'text-[#808080]'}`}
                >
                  {i + 1}
                </span>
              )}
            </div>
            {i < steps.length - 1 && (
              <div className="absolute left-[80%] top-3/2 transform -translate-y-1/2 w-[48px] h-[0.8px] bg-[#808080] z-0" />
            )}
          </div>
          <p
            className={`mt-2 text-[10px] ${
              s.isActive ? 'text-[#808080] font-medium' : 'text-gray-500 font-light'
            }`}
          >
            {s.label}
          </p>
        </div>
      ))}
    </div>

    <div className="hidden lg:flex flex-col h-full justify-between relative">
      {steps.map((s, i) => (
        <div
          key={i}
          className={`relative flex items-center w-full px-2 py-4 rounded-lg ${s.isActive ? 'bg-[#E6F1FF]' : ''}`}
        >
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-4">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-4 ${
                s.isCompleted
                  ? 'bg-blue-500 border-blue-500'
                  : s.isActive
                    ? 'bg-white border-blue-500'
                    : 'bg-gray-300 border-[#B2B2B2]'
              }`}
            >
              {s.isCompleted ? (
                <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 10-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z" />
                </svg>
              ) : (
                <span
                  className={`text-xl font-light ${s.isActive ? 'text-blue-500' : 'text-[#808080]'}`}
                >
                  {i + 1}
                </span>
              )}
            </div>
            <p
              className={`text-md ${s.isActive ? 'text-[#0D0D0D] font-normal' : 'text-[#808080] font-thin'}`}
            >
              {s.label}
            </p>
          </div>
          {i < steps.length - 1 && (
            <div className="absolute top-4 right-0 h-[53vh] w-[1px] bg-[#E5E5E5] z-0" />
          )}
          {s.isActive && (
            <div className="absolute right-0 top-0 w-2 h-full bg-blue-500 rounded-r-lg z-10" />
          )}
        </div>
      ))}
    </div>
  </>
);

export default Stepper;
