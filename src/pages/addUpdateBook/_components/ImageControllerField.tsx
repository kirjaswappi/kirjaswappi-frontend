import { useEffect, useState } from 'react';
import { Controller, useFormContext, ControllerRenderProps } from 'react-hook-form';
import closeIcon from '../../../assets/close.png';
import Image from '../../../components/shared/Image';
const ImageFileInput = ({ name }: { name: string }) => {
  const { control, watch, setValue } = useFormContext();
  const watchedValue = watch(name);
  const [preview, setPreview] = useState<string | null>(
    watchedValue instanceof File ? URL.createObjectURL(watchedValue) : watchedValue || null,
  );

  useEffect(() => {
    if (watchedValue instanceof File) {
      const fileUrl = URL.createObjectURL(watchedValue);
      setPreview(fileUrl);
    } else if (typeof watchedValue === 'string') {
      setPreview(watchedValue);
    } else if (watchedValue === null || watchedValue === undefined) {
      setPreview(null);
    }
  }, [watchedValue]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<Record<string, unknown>, string>,
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image')) {
        const fileUrl = URL.createObjectURL(file);
        setPreview(fileUrl);
      }
      field.onChange(file);
    }
  };

  const handleDelete = (field: ControllerRenderProps<Record<string, unknown>, string>) => {
    setPreview('');
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
            <div className="w-[126px] h-[150px] border-[1px] border-dashed border-grayDark rounded-lg cursor-pointer block mx-auto ">
              {preview ? (
                <div className="w-full h-full relative group">
                  <button
                    onClick={() => handleDelete(field)}
                    onKeyDown={(e) => e.key === 'Enter' && handleDelete(field)}
                    className="absolute  w-6 h-6 flex items-center justify-center bg-[#0D0D0D] rounded-full p-1 -right-2 -top-2"
                    aria-label="Delete image"
                    type="button"
                  >
                    <Image src={closeIcon} alt="File Preview" className="w-4 h-4" />
                  </button>
                  <img
                    src={preview}
                    alt="File Preview"
                    className="w-full h-full bg-contain object-cover rounded-lg"
                  />
                </div>
              ) : (
                <label htmlFor="file" className="flex flex-col items-center justify-center h-full">
                  <span className="text-grayDark text-3xl font-poppins font-extralight">+</span>
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
              <p className="text-rose-500 text-xs mt-1 pl-2">{fieldState.error.message}</p>
            )}
          </div>
        );
      }}
    />
  );
};

export default ImageFileInput;
