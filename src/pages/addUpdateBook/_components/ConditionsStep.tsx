import { useEffect, useState } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { FaDeleteLeft } from 'react-icons/fa6';
import { PiDotsThreeBold } from 'react-icons/pi';
import closeIcon from '../../../assets/close.svg';
import deleteIcon from '../../../assets/deleteIconRed.png';
import editIcon from '../../../assets/editBlack.png';
import plusIcon from '../../../assets/plus.png';
import Button from '../../../components/shared/Button';
import ControlledInputField from '../../../components/shared/ControllerField';
import DeleteBookModal from '../../../components/shared/DeleteBookModal';
import Image from '../../../components/shared/Image';
import InputLabel from '../../../components/shared/InputLabel';
import { useMouseClick } from '../../../hooks/useMouse';
import { setOpen } from '../../../redux/feature/open/openSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { SwapType } from '../types/enum';
import { ISwappableBook } from '../types/interface';
import ConditionMessageBox from './ConditionMessageBox';
import ImageFileInput from './ImageControllerField';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ConditionsStep({ errors }: { errors: any }) {
  const dispatch = useAppDispatch();
  const [swappableBookIndex, setSwappableBookIndex] = useState<number | null>(null);
  const { open } = useAppSelector((state) => state.open);
  const { control, getValues, watch, setValue, trigger } = useFormContext();
  const { reference, setClicked, clicked } = useMouseClick();
  const { clicked: popup, setClicked: setPopup } = useMouseClick();
  const swapType = watch('swapType');
  const swappableGenres = getValues('swappableGenres');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'swappableBooks',
  });

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

  // EDIT SWAPPABLE BOOK
  const editAnotherBook = (index: number) => {
    setValue(`swappableBooks.${index}.flag`, false);
  };

  // OPEN POPUP WHEN CLICK ON THE DELETE BUTTON
  const anotherBookPopupDeleteModal = () => {
    // DELETE BOOK POPUP
    setPopup(true);
  };
  // DELETE SWAPPABLE BOOK
  const deleteSwappableBookByIndex = (index: number) => {
    const values = getValues('swappableBooks');
    const filteredSwapBooks = values.filter((_book: ISwappableBook, idx: number) => index !== idx);
    setValue('swappableBooks', filteredSwapBooks);
    setPopup(false);
    setSwappableBookIndex(null);
  };
  console.log({ reference });
  return (
    <div>
      <div className="pt-4">
        <InputLabel label="Swap Type" required />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="swapType"
          control={control}
          defaultValue={swapType}
          render={({ field }) => {
            return (
              <div className="flex flex-col gap-4 mt-2">
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
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
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg ">
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
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
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
                <div className="px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg">
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
      <span className="w-full h-[1px] bg-platinumDark block my-4"></span>
      {popup && (
        <DeleteBookModal
          header="Delete Book"
          description="Are you sure you want to delete this book? This action cannot be undone."
          onCancel={() => setPopup(false)}
          onConfirm={anotherBookPopupDeleteModal}
        />
      )}
      {swapType === SwapType.BYBOOKS && (
        <div>
          {fields.map((swappableBook, index) => {
            const flag = watch(`swappableBooks.${index}.flag`);
            const coverPhoto = watch(`swappableBooks.${index}.coverPhoto`);
            const title = watch(`swappableBooks.${index}.title`);
            const author = watch(`swappableBooks.${index}.author`);

            // Memoize image URL to avoid flicker
            let coverPhotoUrl = '';
            if (coverPhoto instanceof File) {
              coverPhotoUrl = URL.createObjectURL(coverPhoto);
            } else if (coverPhoto) {
              coverPhotoUrl = coverPhoto;
            }

            return flag ? (
              <div
                id={`swappableBook-${swappableBook.id}`}
                key={swappableBook.id}
                className="bg-white p-4 rounded-xl flex gap-4 mt-3 shadow-sm"
              >
                <div className="w-3/12 h-20 max-h-20">
                  <Image
                    src={coverPhotoUrl || '/default-cover.png'}
                    alt="Cover"
                    className="w-20 h-20 object-cover rounded-md"
                  />
                </div>
                <div className="w-3/4 pr-7 relative">
                  <h3 className="text-sm font-poppins font-medium line-clamp-2">{title}</h3>
                  <h3 className="text-xs font-poppins font-light mt-2">by {author}</h3>
                  <div>
                    <PiDotsThreeBold
                      size={24}
                      className="absolute right-0 top-0 cursor-pointer"
                      onClick={() => {
                        setSwappableBookIndex(index);
                        setClicked((prev) => !prev);
                      }}
                    />
                  </div>
                  {swappableBookIndex === index && clicked && (
                    <div
                      ref={reference as React.RefObject<HTMLDivElement>}
                      className="absolute right-0 top-6 w-[138px] bg-white shadow-lg rounded-md z-10
                    "
                    >
                      <Button
                        onClick={() => editAnotherBook(index)}
                        onKeyDown={(e) => e.key === 'Enter' && editAnotherBook(index)}
                        className="flex items-center gap-2 p-2 border-b border-[#D3D3D3] w-full cursor-pointer"
                        type="button"
                      >
                        <Image src={editIcon} alt="editIcon" className="h-[18px]" />
                        <p className="font-poppins font-normal text-sm">Edit</p>
                      </Button>
                      <Button
                        onClick={() => deleteSwappableBookByIndex(index)}
                        className="flex items-center gap-2 p-2  w-full"
                        onKeyDown={(e) => e.key === 'Enter' && editAnotherBook(index)}
                        type="button"
                      >
                        <Image src={deleteIcon} alt="editIcon" className="h-[18px]" />
                        <p className="font-poppins font-normal text-sm text-[#EA244E] cursor-pointer">
                          Delete
                        </p>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div id={`swappableBook-${swappableBook.id}`} key={swappableBook.id}>
                <div className="pt-4">
                  <div className="flex items-center justify-between">
                    <InputLabel label="Cover Photo" required />
                    {index > 0 && (
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 w-7 h-7 flex items-center justify-center rounded-sm"
                      >
                        <FaDeleteLeft />
                      </Button>
                    )}
                  </div>
                  <ImageFileInput name={`swappableBooks.${index}.coverPhoto`} />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                  <InputLabel label="Book Title" required />
                  <ControlledInputField
                    name={`swappableBooks.${index}.title`}
                    placeholder="Enter book title"
                    className="rounded-md"
                    showErrorMessage
                  />
                </div>
                <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                  <InputLabel label="Author Name" required />
                  <ControlledInputField
                    name={`swappableBooks.${index}.author`}
                    placeholder="Enter author name"
                    className="rounded-md"
                    showErrorMessage
                  />
                </div>
              </div>
            );
          })}
          <div className="mt-4 pb-4 border-t border-[#E4E4E4]">
            <Button
              type="button"
              onClick={addAnotherBook}
              className="flex items-center justify-center gap-1 w-full border border-dashed border-grayDark py-3 text-sm font-poppins text-grayDark rounded-md"
            >
              <Image src={plusIcon} alt="Add Another Book" />
              Add Another Book
            </Button>
          </div>
        </div>
      )}
      {swapType === SwapType.BYGENRES && (
        <div>
          <div className="flex items-center justify-between py-4">
            <InputLabel label="Genre To Swap With" required />
            <Button
              type="button"
              onClick={() => dispatch(setOpen(!open))}
              className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
            >
              Add
            </Button>
          </div>
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
      )}
      {swapType === SwapType.OPENTOOFFERS && <ConditionMessageBox swapType={swapType} />}
      {swapType === SwapType.GIVEAWAY && <ConditionMessageBox swapType={swapType} />}
    </div>
  );
}
