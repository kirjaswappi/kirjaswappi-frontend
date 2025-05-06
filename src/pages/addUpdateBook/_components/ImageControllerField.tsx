import { useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import closeIcon from "../../../assets/close.png";
import Image from "../../../components/shared/Image";
interface IImageFileInputProps {
  name: string;
}
const ImageFileInput = ({ name }: IImageFileInputProps) => {
  const { control, getValues, setValue } = useFormContext();
  const initialValue = getValues(name);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(initialValue)) {
      const urls = initialValue.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file
      );
      setPreviews(urls);
    }
  }, [initialValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: any
  ) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => file.type.startsWith("image"));

    const fileUrls = validImages.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...(previews || []), ...fileUrls];

    setPreviews(updatedPreviews);
    const updatedFiles = [...(field.value || []), ...validImages];
    field.onChange(updatedFiles);
  };

  const handleDelete = (index: number, field: any) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = (field.value || []).filter(
      (_: any, i: number) => i !== index
    );

    setPreviews(updatedPreviews);
    setValue(name, updatedFiles);
  };

  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState }) => {
        return (
          <div>
            <div className="w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer block mx-auto ">
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
                  multiple
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </label>
            </div>
            <div className="grid grid-cols-5 gap-1 mt-4">
              {previews.map((src, index) => (
                <div
                  key={index}
                  className="w-[56px] h-[56px] border border-[#B2B2B2] border-gray-400 rounded-lg relative group"
                >
                  <div
                    onClick={() => handleDelete(index, field)}
                    className="absolute w-6 h-6 flex items-center justify-center bg-black text-white rounded-full -right-2 -top-2 cursor-pointer z-10"
                  >
                    <Image src={closeIcon} alt="Remove" className="w-3 h-3" />
                  </div>
                  <img
                    src={src}
                    alt={`Preview ${index}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ))}
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
