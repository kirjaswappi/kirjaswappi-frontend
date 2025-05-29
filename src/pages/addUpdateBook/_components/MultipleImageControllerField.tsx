import { useEffect, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import closeIcon from '../../../assets/close.png';
import Image from '../../../components/shared/Image';
import { SUPPORTED_FORMATS } from '../../../utility/constant';
interface IImageFileInputProps {
  name: string;
  errors: Record<string, FieldError>;
}
const MultipleImageFileInput = ({ name, errors }: IImageFileInputProps) => {
  const { control, watch, setValue, trigger } = useFormContext();
  const watchedValue = watch(name);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    if (Array.isArray(watchedValue)) {
      const urls = watchedValue.map((file) =>
        file instanceof File ? URL.createObjectURL(file) : file,
      );
      setPreviews(urls);
    }
  }, [watchedValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: { value: File[]; onChange: (files: File[]) => void },
  ) => {
    const files = Array.from(e.target.files || []);
    const validImages = files.filter((file) => SUPPORTED_FORMATS.includes(file.type));

    const fileUrls = validImages.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...previews, ...fileUrls];
    setPreviews(updatedPreviews);

    const updatedFiles = [...field.value, ...validImages];
    field.onChange(updatedFiles);
  };

  const handleDelete = async (
    index: number,
    field: { value: File[]; onChange: (files: File[]) => void },
  ) => {
    const updatedPreviews = previews.filter((_, i) => i !== index);
    const updatedFiles = (field.value || []).filter((_: File, i: number) => i !== index);
    setPreviews(updatedPreviews);
    setValue(name, updatedFiles, { shouldValidate: true });
    await trigger(name);
  };

  const findErrorPosition = (errorsObject: Record<string, FieldError | undefined>): number[] => {
    if (!errorsObject || typeof errorsObject !== 'object') return [];
    return Object.keys(errorsObject)
      .map((key) => (errorsObject[key]?.message ? parseInt(key, 10) : null))
      .filter((index): index is number => index !== null);
  };

  const getAllErrorMessages = (errorObject: Record<number, FieldError> | undefined): string[] => {
    if (!errorObject || typeof errorObject !== 'object') return [];

    return Object.values(errorObject)
      .map((error) => error?.message)
      .filter((msg): msg is string => Boolean(msg));
  };

  const parseFieldErrors = (
    fieldError: Record<string, FieldError> | FieldError | undefined,
  ): { messages: string[]; indexes: number[] } => {
    if (!fieldError) return { messages: [], indexes: [] };

    if (typeof fieldError === 'object' && !('message' in fieldError)) {
      return {
        messages: getAllErrorMessages(fieldError as Record<string, FieldError>),
        indexes:
          typeof fieldError === 'object' && !('message' in fieldError)
            ? findErrorPosition(fieldError as Record<string, FieldError>)
            : [],
      };
    }

    return {
      messages: typeof fieldError?.message === 'string' ? [fieldError.message] : [],
      indexes: [],
    };
  };
  const fieldError = errors?.[name];
  const { messages: errorMessages, indexes: errorIndex } = parseFieldErrors(fieldError);
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={[]}
      render={({ field }) => {
        return (
          <div>
            {/* Upload button for larger screens */}
            {previews.length === 0 && (
              <div className="hidden lg:block w-[126px] lg:w-[200px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer mx-auto">
                <label htmlFor="file" className="flex flex-col items-center justify-center h-full">
                  <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
                  <span className="text-grayDark text-xs font-poppins font-normal">
                    Upload Picture
                  </span>

                  <input
                    id="file"
                    type="file"
                    multiple
                    accept={SUPPORTED_FORMATS.join(',')}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              </div>
            )}

            {/* Large screen layout - 2x2 grid */}
            <div className="hidden lg:grid lg:grid-cols-2 gap-4 max-w-[280px] mt-4">
              {previews &&
                previews?.map((src, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`w-[126px] h-[150px] border ${
                        errorIndex.includes(index) ? 'border-2 border-rose-600' : 'border-[#B2B2B2]'
                      } rounded-lg relative group`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDelete(index, field)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleDelete(index, field);
                        }}
                        className="absolute w-5 h-5 flex items-center justify-center bg-smokyBlack text-white rounded-full -right-2 -top-2 cursor-pointer z-10"
                      >
                        <Image src={closeIcon} alt="Remove" className="w-[7px] h-[7px]" />
                      </div>
                      <img
                        src={src}
                        alt={`Preview ${index}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                  );
                })}

              {previews.length % 2 === 1 && previews.length < 6 && (
                <div className="w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer">
                  <label
                    htmlFor="file-lg"
                    className="flex flex-col items-center justify-center h-full"
                  >
                    <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
                    <span className="text-grayDark text-xs font-poppins font-normal">
                      Upload Picture
                    </span>

                    <input
                      id="file-lg"
                      type="file"
                      multiple
                      accept={SUPPORTED_FORMATS.join(',')}
                      className="hidden"
                      onChange={(e) => handleFileChange(e, field)}
                    />
                  </label>
                </div>
              )}
            </div>

            {/* Upload button below grid for even numbers on large screens */}
            {previews.length > 0 && previews.length % 2 === 0 && previews.length < 6 && (
              <div className="hidden lg:block w-[280px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer mx-auto mt-4">
                <label
                  htmlFor="file-bottom"
                  className="flex flex-col items-center justify-center h-full"
                >
                  <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
                  <span className="text-grayDark text-xs font-poppins font-normal">
                    Upload Picture
                  </span>

                  <input
                    id="file-bottom"
                    type="file"
                    multiple
                    accept={SUPPORTED_FORMATS.join(',')}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              </div>
            )}

            {/* Small screen layout - 5 column grid as before */}
            {previews.length < 6 && (
              <div className="lg:hidden w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer block mx-auto">
                <label htmlFor="file" className="flex flex-col items-center justify-center h-full">
                  <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
                  <span className="text-grayDark text-xs font-poppins font-normal">
                    Upload Picture
                  </span>

                  <input
                    id="file"
                    type="file"
                    multiple
                    accept={SUPPORTED_FORMATS.join(',')}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, field)}
                  />
                </label>
              </div>
            )}
            <div className="lg:hidden grid grid-cols-5 gap-1 mt-4">
              {previews &&
                previews?.map((src, index: number) => {
                  return (
                    <div
                      key={`mobile-${index}`}
                      className={`w-[56px] h-[56px] border ${
                        errorIndex.includes(index) ? 'border-2 border-rose-600' : 'border-[#B2B2B2]'
                      } rounded-lg relative group`}
                    >
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => handleDelete(index, field)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') handleDelete(index, field);
                        }}
                        className="absolute w-5 h-5 flex items-center justify-center bg-smokyBlack text-white rounded-full -right-2 -top-2 cursor-pointer z-10"
                      >
                        <Image src={closeIcon} alt="Remove" className="w-[7px] h-[7px]" />
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
            {errorMessages.length > 0 && (
              <p className="text-rose-500 text-xs mt-1 pl-2">{errorMessages[0]}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default MultipleImageFileInput;
