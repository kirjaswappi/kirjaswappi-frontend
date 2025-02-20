import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ImageFileInput = ({ name }: { name: string }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const { control } = useFormContext();

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image")) {
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
      }
      field.onChange(file);
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => (
        <div>
          <label
            htmlFor="file"
            className="w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer block mx-auto overflow-hidden"
          >
            {preview ? (
              <img
                src={preview}
                alt="File Preview"
                className="w-full h-full object-cover rounded-lg"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full">
                <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
                <span className="text-grayDark text-xs font-poppins font-normal">Upload Picture</span>

                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </div>
            )}
          </label>
          {/* Validation Error */}
          {fieldState.error && (
            <p className="text-rose-500 text-xs mt-1 pl-2">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
};

export default ImageFileInput;
