import React from 'react';

interface ResendOTPButtonProps {
  onClick: () => Promise<void>;
  children: React.ReactNode;
}

const ResendOTPButton: React.FC<ResendOTPButtonProps> = ({ onClick, children }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-medium hover:underline focus:outline-none"
    >
      {children}
    </button>
  );
};

export default ResendOTPButton;
