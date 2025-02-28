import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";

interface ControlledInputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  options?: {
    label: string;
    value: string;
  }[];
  radioOptions?: any;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type = "input",
  placeholder,
  className,
  options
}) => {
  const { control } = useFormContext();

  return (
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
          return type === "input" ? (
            <Input
              {...field}
              placeholder={placeholder}
              error={error?.message}
              className={className}
              showErrorMessage={!!error}
            />
          ) : type === "select" ? (
            <Select
              {...field}
              placeholder={placeholder}
              options={options || []}
              error={error?.message}
              className={className}
              showErrorMessage={!!error}
            />
          ) :  (
            <TextArea
              {...field}
              placeholder={placeholder}
              error={error?.message}
              className={className}
              showErrorMessage={!!error}
            />
          );
        }}
      />
  );
};

export default ControlledInputField;
