import { Controller, useFormContext } from "react-hook-form";

export default function CheckboxControllerField({
  name,
  value,
}: {
  name: string;
  value: string;
}) {
  const { control } = useFormContext();
  return (
    <Controller
      key={value}
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <label className="flex items-center space-x-2 text-sm mb-1">
            <input
              type="checkbox"
              value={value}
              checked={field?.value?.includes(value)}
              onChange={(e) => {
                const newValue = e.target.checked
                  ? [...field?.value, value]
                  : field?.value?.filter((g: string) => g !== value);
                field?.onChange(newValue);
              }}
            />
            <span className="font-poppins font-light text-sm">{value}</span>
          </label>
        );
      }}
    />
  );
}
