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
  radioOptions?: any
}

const ControlledInputField: React.FC<ControlledInputFieldProps> = ({
  name,
  type = "input",
  placeholder,
  className,
  options,
  radioOptions
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
                  ) : type === "radio" && radioOptions ? (
                    <div>
                      {radioOptions.map((radio:{value: string; label: string}) => (
                        <label key={radio.value} style={{ marginRight: "16px" }}>
                          <input
                            type="radio"
                            value={radio.value}
                            checked={field.value === radio.value} 
                            onChange={(e) => field.onChange(e.target.value)}
                          />
                          {radio.label}
                        </label>
                      ))}
                      {error && <p style={{ color: "red", fontSize: "12px" }}>{error.message}</p>}
                    </div>) :  (
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
