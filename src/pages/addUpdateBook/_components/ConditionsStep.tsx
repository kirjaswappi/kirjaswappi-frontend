import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';
import closeIcon from '../../../assets/close.svg';
import plusIcon from '../../../assets/plus.png';
import Button from '../../../components/shared/Button';
import ControlledInputField from '../../../components/shared/ControllerField';
import Image from '../../../components/shared/Image';
import InputLabel from '../../../components/shared/InputLabel';
import { setOpen } from '../../../redux/feature/open/openSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SwapType } from '../types/enum';
import { ISwappableBook } from '../types/interface';
import ConditionMessageBox from './ConditionMessageBox';
import ImageFileInput from './ImageControllerField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConditionsStep({ errors }: { errors: any }) {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.open);
  const { control, getValues, watch, setValue, trigger } = useFormContext();
  const swapType = watch('swapType');
  const swappableGenres = getValues('swappableGenres');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'swappableBooks',
  });

  const [openDropdown, setOpenDropdown] = useState<number | null>(null);

  useEffect(() => {
    if (fields.length === 0) {
      append({ title: '', author: '', coverPhoto: null, flag: false });
    }
  }, [fields, append]);

  const handleRemoveGenre = (genreValue: string) => {
    if (!genreValue) return;
    setValue(
      'swappableGenres',
      swappableGenres?.filter((swappableGenre: string) => swappableGenre !== genreValue),
    );
  };

  const addAnotherBook = async () => {
    const valid = await trigger();
    const values = getValues('swappableBooks');

    // Update the flags based on field validation
    values.forEach((_book: ISwappableBook, idx: number) => {
      const swappableBookTitle = watch(`swappableBooks.${idx}.title`);
      const swappableBookAuthor = watch(`swappableBooks.${idx}.author`);
      const swappableBookCoverPhoto = watch(`swappableBooks.${idx}.coverPhoto`);

      const isValidBook =
        !!swappableBookTitle && !!swappableBookAuthor && !!swappableBookCoverPhoto;
      setValue(`swappableBooks.${idx}.flag`, isValidBook);
    });

    if (valid) {
      append({ title: '', author: '', coverPhoto: null, flag: false });
    }
  };

  const handleEdit = (index: number) => {
    setValue(`swappableBooks.${index}.flag`, false);
    setOpenDropdown(null);
  };

  const handleDelete = (index: number) => {
    remove(index);
    setOpenDropdown(null);
  };

  const toggleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div>
      {/* Swap Type for sm devices - at the beginning */}
      <div className="block lg:hidden mb-6">
        <div className="mb-4">
          <InputLabel label="Swap Type" required />
        </div>
        <Controller
          name="swapType"
          control={control}
          defaultValue={swapType}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-4">
                <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value={SwapType.OPENTOOFFERS}
                      checked={field.value === SwapType.OPENTOOFFERS}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    Open To Offers
                  </label>
                </div>
                <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg ">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value={SwapType.BYBOOKS}
                      checked={field.value === SwapType.BYBOOKS}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    By Books
                  </label>
                </div>
                <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value={SwapType.BYGENRES}
                      checked={field.value === SwapType.BYGENRES}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    By Genres
                  </label>
                </div>
                <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                  <label className="flex items-center gap-2 w-full cursor-pointer">
                    <input
                      type="radio"
                      value={SwapType.GIVEAWAY}
                      checked={field.value === SwapType.GIVEAWAY}
                      onChange={field.onChange}
                      className="w-4 h-4"
                    />
                    Give Away
                  </label>
                </div>
              </div>
            );
          }}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pt-4">
        {/* Left Column Header - Hidden on sm */}
        <div className="hidden lg:block w-full lg:w-[320px] lg:flex-shrink-0">
          <div className="text-center lg:text-left lg:mb-2">
            <InputLabel label="Swap Type" required />
          </div>
        </div>

        {/* Right Column Header - Hidden on sm for book cover */}
        <div className="flex-1 w-full">
          {swapType === SwapType.BYBOOKS && (
            <div className="hidden lg:block text-center lg:text-left lg:mb-2">
              <InputLabel
                label={
                  fields.some((_, index) => watch(`swappableBooks.${index}.flag`))
                    ? 'Book Cover'
                    : 'Cover Photo'
                }
                required
              />
            </div>
          )}
          {swapType === SwapType.BYGENRES && (
            <div className="text-center lg:text-left lg:mb-2">
              <InputLabel label="Genre To Swap With" required />
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-2">
        {/* Left Column - Swap Type Options - Hidden on sm */}
        <div className="hidden lg:block w-full lg:w-[320px] lg:flex-shrink-0">
          <Controller
            name="swapType"
            control={control}
            defaultValue={swapType}
            render={({ field }) => {
              return (
                <div className="flex flex-col gap-4">
                  <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                    <label className="flex items-center gap-2 w-full cursor-pointer">
                      <input
                        type="radio"
                        value={SwapType.OPENTOOFFERS}
                        checked={field.value === SwapType.OPENTOOFFERS}
                        onChange={field.onChange}
                        className="w-4 h-4"
                      />
                      Open To Offers
                    </label>
                  </div>
                  <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg ">
                    <label className="flex items-center gap-2 w-full cursor-pointer">
                      <input
                        type="radio"
                        value={SwapType.BYBOOKS}
                        checked={field.value === SwapType.BYBOOKS}
                        onChange={field.onChange}
                        className="w-4 h-4"
                      />
                      By Books
                    </label>
                  </div>
                  <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                    <label className="flex items-center gap-2 w-full cursor-pointer">
                      <input
                        type="radio"
                        value={SwapType.BYGENRES}
                        checked={field.value === SwapType.BYGENRES}
                        onChange={field.onChange}
                        className="w-4 h-4"
                      />
                      By Genres
                    </label>
                  </div>
                  <div className="px-4 py-4 bg-gray-100 border border-[#E6E6E6] rounded-lg">
                    <label className="flex items-center gap-2 w-full cursor-pointer">
                      <input
                        type="radio"
                        value={SwapType.GIVEAWAY}
                        checked={field.value === SwapType.GIVEAWAY}
                        onChange={field.onChange}
                        className="w-4 h-4"
                      />
                      Give Away
                    </label>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Right Column - Dynamic Content */}
        <div className="flex-1 w-full">
          <hr className="w-full border-t border-platinumDark block lg:hidden my-4" />

          {swapType === SwapType.BYBOOKS && (
            <div className="w-full">
              {/* Grid container for books with flag: true */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:mt-0">
                {fields.map((swappableBook, index) => {
                  const flag = watch(`swappableBooks.${index}.flag`);
                  return flag ? (
                    <div
                      key={swappableBook.id}
                      className="bg-white p-4 lg:p-0 rounded-xl shadow-sm relative"
                    >
                      {/* Edit and Delete buttons */}
                      <div className="absolute top-2 right-2 z-10">
                        {/* Large screens - separate buttons */}
                        <div className="hidden lg:flex gap-2">
                          <button
                            type="button"
                            onClick={() => handleEdit(index)}
                            className="bg-white rounded-full p-1 transition-shadow"
                          >
                            <svg
                              className="w-4 h-4 text-blue-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(index)}
                            className="bg-white rounded-full p-1 shadow-md hover:shadow-lg transition-shadow"
                          >
                            <svg
                              className="w-4 h-4 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>

                        {/* Small screens - 3-dot menu */}
                        <div className="relative lg:hidden">
                          <button
                            type="button"
                            onClick={() => toggleDropdown(index)}
                            className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                            </svg>
                          </button>

                          {/* Dropdown menu */}
                          {openDropdown === index && (
                            <div className="absolute right-0 top-10 bg-white rounded-lg shadow-lg py-1 z-20 min-w-[120px]">
                              <button
                                type="button"
                                onClick={() => handleEdit(index)}
                                className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                  />
                                </svg>
                                Edit
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDelete(index)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 flex items-center gap-2"
                              >
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                  />
                                </svg>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Book content layout - side by side for sm, stacked for lg */}
                      <div className="flex lg:flex-col gap-3">
                        {/* Image container */}
                        <div className="w-20 h-24 lg:w-full lg:h-32 lg:mb-0 flex-shrink-0">
                          <Image
                            src={
                              watch(`swappableBooks.${index}.coverPhoto`) instanceof File
                                ? URL.createObjectURL(watch(`swappableBooks.${index}.coverPhoto`))
                                : watch(`swappableBooks.${index}.coverPhoto`)
                            }
                            alt="Cover"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        {/* Text content */}
                        <div className="flex-1 lg:w-full">
                          <h3 className="text-sm font-poppins font-medium line-clamp-2 mb-1">
                            {watch(`swappableBooks.${index}.title`)}
                          </h3>
                          <h3 className="text-xs font-poppins font-light">
                            by {watch(`swappableBooks.${index}.author`)}
                          </h3>
                        </div>
                      </div>
                    </div>
                  ) : null;
                })}
              </div>

              {/* Form fields for books without flag */}
              {fields.map((swappableBook, index) => {
                const flag = watch(`swappableBooks.${index}.flag`);
                return !flag ? (
                  <div key={swappableBook.id}>
                    <div className="pt-4 lg:pt-0">
                      <div className="flex items-center justify-between mb-2 lg:mb-0">
                        {index > 0 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm ml-auto"
                          >
                            <FaDeleteLeft />
                          </Button>
                        )}
                      </div>
                      {/* Hide image upload for sm devices */}
                      <div className="hidden lg:block lg:mb-4">
                        <ImageFileInput name={`swappableBooks.${index}.coverPhoto`} />
                      </div>
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4] lg:border-b-0 lg:pb-0">
                      <InputLabel label="Book Title" required />
                      <ControlledInputField
                        name={`swappableBooks.${index}.title`}
                        placeholder="Enter book title"
                        className="rounded-md"
                        showErrorMessage
                      />
                    </div>
                    <div className="mt-4 pb-4 border-b border-[#E4E4E4] lg:border-b-0 lg:pb-0">
                      <InputLabel label="Author Name" required />
                      <ControlledInputField
                        name={`swappableBooks.${index}.author`}
                        placeholder="Enter author name"
                        className="rounded-md"
                        showErrorMessage
                      />
                    </div>
                    {/* Show image upload for sm devices at the bottom */}
                    <div className="block lg:hidden mt-4 pb-4 border-b border-[#E4E4E4]">
                      <InputLabel label="Cover Photo" required />
                      <ImageFileInput name={`swappableBooks.${index}.coverPhoto`} />
                    </div>
                  </div>
                ) : null;
              })}

              <div className="mt-4 pb-4 border-t border-[#E4E4E4] lg:border-t-0 lg:pt-0">
                <Button
                  type="button"
                  onClick={addAnotherBook}
                  className="flex items-center justify-center gap-1 w-full border border-dashed border-grayDark py-3 text-sm font-poppins text-grayDark rounded-md h-[64px]"
                >
                  <Image src={plusIcon} alt="Add Another Book" />
                  Add Another Book
                </Button>
              </div>
            </div>
          )}

          {swapType === SwapType.BYGENRES && (
            <div className="w-full">
              <div className="flex items-center justify-between mb-4 lg:mb-0">
                <Button
                  type="button"
                  onClick={() => dispatch(setOpen(!open))}
                  className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline ml-auto"
                >
                  Add
                </Button>
              </div>
              <div className="lg:mt-4">
                {swappableGenres && swappableGenres.length > 0 ? (
                  <div className="flex flex-col gap-2 pb-4">
                    {swappableGenres.map((item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                      >
                        <h3 className="font-poppins text-sm font-light">{item}</h3>
                        <Button type="button" onClick={() => handleRemoveGenre(item)}>
                          <Image src={closeIcon} alt="close" className="h-2" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ConditionMessageBox swapType={swapType} />
                )}
                {errors && errors['swappableGenres'] && (
                  <div className="text-rose-500 text-xs mt-1 pl-2">
                    {errors['swappableGenres']?.message}
                  </div>
                )}
              </div>
            </div>
          )}

          {swapType === SwapType.OPENTOOFFERS && (
            <div>
              <ConditionMessageBox swapType={swapType} />
            </div>
          )}
          {swapType === SwapType.GIVEAWAY && (
            <div>
              <ConditionMessageBox swapType={swapType} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
