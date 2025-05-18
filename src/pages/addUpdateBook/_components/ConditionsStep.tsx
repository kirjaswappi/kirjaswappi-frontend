import { useEffect } from "react";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { FaDeleteLeft } from "react-icons/fa6";
import closeIcon from "../../../assets/close.svg";
import plusIcon from "../../../assets/plus.png";
import Button from "../../../components/shared/Button";
import ControlledInputField from "../../../components/shared/ControllerField";
import Image from "../../../components/shared/Image";
import InputLabel from "../../../components/shared/InputLabel";
import { setOpen } from "../../../redux/feature/open/openSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { SwapType } from "../types/enum";
import ConditionMessageBox from "./ConditionMessageBox";
import ImageFileInput from "./ImageControllerField";

export default function ConditionsStep({ errors }: { errors: any }) {
  const dispatch = useAppDispatch();
  const { open } = useAppSelector((state) => state.open);
  const { control, getValues, watch, setValue } = useFormContext();
  const conditionType = watch("conditionType");
  const genres = getValues("genres");
  const { fields, append, remove } = useFieldArray({ control, name: "books" });

  useEffect(() => {
    if (fields.length === 0) {
      append({ bookTitle: "", authorName: "", byBookCover: null });
    }
  }, [fields, append]);

  const handleRemoveGenre = (genreValue: string) => {
    if (!genreValue) return;
    setValue(
      "genres",
      genres?.filter((favGen: string) => favGen !== genreValue)
    );
  };

  return (
    <div>
      <div className="pt-4">
        <InputLabel label="Condition Type" required />
      </div>
      <div className="flex flex-col gap-2">
        <Controller
          name="conditionType"
          control={control}
          defaultValue={conditionType}
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
                    Open to Offer
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
                    By Book
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
                    By Genre
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
                    Giveaway
                  </label>
                </div>
              </div>
            );
          }}
        />
      </div>
      <span className="w-full h-[1px] bg-platinumDark block my-4"></span>
      {conditionType === SwapType.BYBOOKS && (
        <div>
          {fields.map((book, index) => (
            <div key={book.id}>
              <div className="pt-4">
                <div className="flex items-center justify-between">
                  <InputLabel label="Book Cover" required />
                  {index > 0 && (
                    <Button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-500 bg-rose-100 w-7 h-7 flex items-center justify-center rounded-sm"
                    >
                      <FaDeleteLeft />
                    </Button>
                  )}
                </div>
                <ImageFileInput name={`books.${index}.byBookCover`} />
              </div>
              <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                <InputLabel label="Book Title" required />
                <ControlledInputField
                  name={`books.${index}.bookTitle`}
                  placeholder="Enter book title"
                  className="rounded-md"
                  showErrorMessage
                />
              </div>
              <div className="mt-4 pb-4 border-b border-[#E4E4E4]">
                <InputLabel label="Author Name" required />
                <ControlledInputField
                  name={`books.${index}.authorName`}
                  placeholder="Enter author name"
                  className="rounded-md"
                  showErrorMessage
                />
              </div>
            </div>
          ))}
          <div className="mt-4 pb-4 border-t border-[#E4E4E4]">
            <Button
              type="button"
              onClick={() =>
                append({ bookTitle: "", authorName: "", byBookCover: null })
              }
              className="flex items-center justify-center gap-1 w-full border border-dashed border-grayDark py-3 text-sm font-poppins text-grayDark rounded-md"
            >
              <Image src={plusIcon} alt="Add Another Book" />
              Add Another Book
            </Button>
          </div>
        </div>
      )}
      {conditionType === SwapType.BYGENRES && (
        <div>
          <div className="flex items-center justify-between py-4">
            <InputLabel label="Genre" required />
            <Button
              type="button"
              onClick={() => dispatch(setOpen(!open))}
              className="text-[#3879E9] font-poppins font-medium text-sm leading-none underline"
            >
              Add
            </Button>
          </div>
          {genres && genres.length > 0 ? (
            <div className="flex flex-col gap-2 pb-4">
              {genres.map((favItem: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-4 bg-white border border-[#E6E6E6] rounded-lg"
                >
                  <h3 className="font-poppins text-sm font-light">{favItem}</h3>
                  <Button
                    type="button"
                    onClick={() => handleRemoveGenre(favItem)}
                  >
                    <Image src={closeIcon} alt="close" className="h-2" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <ConditionMessageBox conditionType={conditionType} />
          )}
          {errors && errors["genres"] && (
            <div className="text-rose-500 text-xs mt-1 pl-2">
              {errors["genres"]?.message}
            </div>
          )}
        </div>
      )}
      {conditionType === SwapType.OPENTOOFFERS && (
        <ConditionMessageBox conditionType={conditionType} />
      )}
      {conditionType === SwapType.GIVEAWAY && (
        <ConditionMessageBox conditionType={conditionType} />
      )}
    </div>
  );
}
