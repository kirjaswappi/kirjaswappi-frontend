import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "../../../components/shared/Input";
import Select from "../../../components/shared/Select";
import TextArea from "../../../components/shared/TextArea";

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
  radioValue?: string;
  radioLabel?: string;
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type = "input",
  placeholder,
  className,
  options,
  radioValue,
  radioLabel,
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
          ) : type === "radio" ? (
            <div>
              <label key={radioValue} className="flex flex-row gap-2">
                <input
                  type="radio"
                  value={radioValue}
                  checked={field.value === radioValue}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {radioLabel}
              </label>
              {error && (
                <p style={{ color: "red", fontSize: "12px" }}>
                  {error.message}
                </p>
              )}
            </div>
          ) : (
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
