import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Input from './Input';
import Select from './Select';
import TextArea from './TextArea';

interface ControlledInputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  options?: {
    label: string;
    value: string;
  }[];
  radioOptions?: { label: string; value: string }[];
  showErrorMessage?: boolean;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type = 'input',
  placeholder,
  className,
  options,
  showErrorMessage = false,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => {
        return type === 'input' ? (
          <Input
            {...field}
            placeholder={placeholder}
            error={error?.message}
            className={className}
            showErrorMessage={showErrorMessage}
          />
        ) : type === 'select' ? (
          <Select
            {...field}
            placeholder={placeholder}
            options={options || []}
            error={error?.message}
            className={className}
            showErrorMessage={showErrorMessage}
          />
        ) : (
          <TextArea
            {...field}
            placeholder={placeholder}
            error={error?.message}
            className={className}
            showErrorMessage={showErrorMessage}
          />
        );
      }}
    />
  );
};

export default ControlledInputField;
