import { useEffect, useState } from "react";
import { Controller, FieldError, useFormContext } from "react-hook-form";
import closeIcon from "../../../assets/close.png";
import Image from "../../../components/shared/Image";
import { SUPPORTED_FORMATS } from "../../../utility/constant";
interface IImageFileInputProps {
  name: string;
  errors: Record<string, any>;
}
const ImageFileInput = ({ name, errors }: IImageFileInputProps) => {
  const { control, getValues, setValue, trigger } = useFormContext();
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
    const validImages = files.filter((file) =>
      SUPPORTED_FORMATS.includes(file.type)
    );

    const fileUrls = validImages.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...previews, ...fileUrls];
    setPreviews(updatedPreviews);

    const updatedFiles = [...field.value, ...validImages];
    field.onChange(updatedFiles);
  };

  const handleDelete = async (index: number, field: any) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = (field.value || []).filter(
      (_: any, i: number) => i !== index
    );
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });
    await trigger(name);
  };

  const findErrorPosition = (errorsObject: any): number[] => {
    if (!errorsObject || typeof errorsObject !== "object") return [];
    return Object.keys(errorsObject)
      .map((key) => (errorsObject[key]?.message ? parseInt(key, 10) : null))
      .filter((index): index is number => index !== null);
  };

  const getAllErrorMessages = (
  errorObject: Record<number, FieldError> | undefined
): string[] => {
  if (!errorObject || typeof errorObject !== 'object') return [];

  return Object.values(errorObject)
    .map((error) => error?.message)
    .filter((msg): msg is string => Boolean(msg));
};
  console.log(errors);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field, fieldState }) => {
        const errorArray = errors && errors?.[name] || [];
        const errorIndex = findErrorPosition(errors["bookCovers"]);
        const errorMessages = getAllErrorMessages(errorArray);
        console.log(errorMessages[0])
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
                  accept={SUPPORTED_FORMATS.join(",")}
                  className="hidden"
                  onChange={(e) => handleFileChange(e, field)}
                />
              </label>
            </div>
            <div className="grid grid-cols-5 gap-1 mt-4">
              {previews &&
                previews?.map((src, index) => {
                  return (
                    <div
                      key={index}
                      className={`w-[56px] h-[56px] border ${
                        errorIndex?.includes(index)
                          ? "border-2 border-rose-600"
                          : "border-[#B2B2B2]"
                      } rounded-lg relative group`}
                    >
                      <div
                        onClick={() => handleDelete(index, field)}
                        className="absolute w-5 h-5 flex items-center justify-center bg-smokyBlack text-white rounded-full -right-2 -top-2 cursor-pointer z-10"
                      >
                        <Image
                          src={closeIcon}
                          alt="Remove"
                          className="w-[7px] h-[7px]"
                        />
                      </div>
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  );
                })}
            </div>

            {/* Validation Error */}
            {errorMessages.length > 0 || errors['bookCovers']  && (
                <p className="text-rose-500 text-xs mt-1 pl-2">
                  {errorMessages[0] || errors['bookCovers']?.message}
                </p>
              )}
          </div>
        );
      }}
    />
  );
};

export default ImageFileInput;
