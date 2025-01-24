import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import Input from "../../../components/shared/Input";
import Select from "../../../components/shared/Select";
import TextArea from "../../../components/shared/TextArea";

interface ControlledInputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  className?:string;
  options?: {
    label: string;
    value: string;
  }[],
  inputType?: string
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type = "input",
  placeholder,
  className,
  options, 
  inputType
}) => {
  const { control } = useFormContext();

  return (
    <div style={{ marginBottom: "16px" }}>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => {
            return (
                type === "input" ? (
                    <Input {...field} placeholder={placeholder} error={error?.message} className={className} showErrorMessage={!!error} />
                  ) : type === "select" ? (
                    <Select
                      {...field}
                      placeholder={placeholder}
                      options={options || []}
                      error={error?.message}
                      className={className}
                      showErrorMessage={!!error}
                    />
                  ) : (
                    <TextArea
                      {...field}
                      placeholder={placeholder}
                      error={error?.message}
                      className={className}
                      showErrorMessage={!!error}
                    />
                  )
              )
        }}
      />
    </div>
  );
};

export default ControlledInputField;
