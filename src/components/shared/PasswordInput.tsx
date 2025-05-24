import { useState } from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { PiEyeClosed } from 'react-icons/pi';
import Input from './Input';

interface PasswordInputProps {
  name: string;
  id: string;
  value: string;
  placeholder?: string;
  error?: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function PasswordInput({
  name,
  id,
  value,
  placeholder,
  error,
  onChange,
  onBlur,
  className = '',
}: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <div className="relative">
      <Input
        type={isVisible ? 'text' : 'password'}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        error={error || undefined}
        className={className}
      />
      <button
        type="button"
        className="absolute right-4 top-[18px] flex items-center cursor-pointer"
        onClick={toggleVisibility}
        aria-label={isVisible ? 'Hide password' : 'Show password'}
      >
        {isVisible ? (
          <PiEyeClosed className="text-grayDark text-xl" />
        ) : (
          <AiOutlineEye className="text-grayDark text-xl" />
        )}
      </button>
    </div>
  );
}
