import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import DeleteIcon from "../../../assets/Bin.png";
import Image from "../../../components/shared/Image";
const ImageFileInput = ({ name }: { name: string }) => {
  const { control, getValues, setValue } = useFormContext();
  const initialValue = getValues(name);
  const [preview, setPreview] = useState<string | null>(
    initialValue instanceof File
      ? URL.createObjectURL(initialValue)
      : initialValue || null
  );

  useEffect(() => {
    if (initialValue instanceof File) {
      const fileUrl = URL.createObjectURL(initialValue);
      setPreview(fileUrl);
    } else if (typeof initialValue === "string") {
      setPreview(initialValue);
    }
  }, [initialValue]);

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

  const handleDelete = (field: any) => {
    setPreview("");
    setValue(field.name, null);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={null}
      render={({ field, fieldState }) => {
        return (
          <div>
            <div className="w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer block mx-auto overflow-hidden">
              {preview ? (
                <div className="w-full h-full relative group">
                  <div
                    onClick={() => handleDelete(field)}
                    className="absolute group-hover:bg-[#303030a4] duration-300 w-full h-full flex items-center justify-center"
                  >
                    <Image
                      src={DeleteIcon}
                      alt="File Preview"
                      className="w-7 h-7 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible"
                    />
                  </div>
                  <img
                    src={preview}
                    alt="File Preview"
                    className="w-full h-full bg-contain object-cover rounded-lg"
                  />
                </div>
              ) : (
                <label
                  htmlFor="file"
                  className="flex flex-col items-center justify-center h-full"
                >
                  <span className="text-grayDark text-3xl font-poppins font-extralight">
                    +
                  </span>
                  <span className="text-grayDark text-xs font-poppins font-normal">
                    Upload Picture
                  </span>

                  <input
                    id="file"
                    type="file"
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              )}
            </div>
            {/* Validation Error */}
            {fieldState.error && (
              <p className="text-rose-500 text-xs mt-1 pl-2">
                {fieldState.error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageFileInput;
