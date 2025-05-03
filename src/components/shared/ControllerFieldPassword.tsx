import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface ControlledPasswordFieldProps {
  name: string;
  placeholder?: string;
  className?: string;
  showPasswordToggle?: boolean;
  showErrorMessage?: boolean;
}

const ControlledPasswordField: React.FC<ControlledPasswordFieldProps> = ({
  name,
  placeholder,
  className,
  showPasswordToggle = true,
  showErrorMessage = false,
}) => {
  const { control } = useFormContext();
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="relative">
          <Input
            {...field}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            error={error?.message}
            className={className}
            showErrorMessage={showErrorMessage}
          />
          {showPasswordToggle && (
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible className="text-gray-500" />
              ) : (
                <AiOutlineEye className="text-gray-500" />
              )}
            </button>
          )}
        </div>
      )}
    />
  );
};

export default ControlledPasswordField;